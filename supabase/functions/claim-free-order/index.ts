import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Missing Auth Header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Secrets' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token)

    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid Token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const userId = claimsData.claims.sub
    const userEmail = claimsData.claims.email
    const { items, couponCode } = await req.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Cart is empty' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const itemIds = items.map((item: any) => item.id)
    const { data: templates, error: tplError } = await supabaseAdmin
      .from('templates')
      .select('id, title, price, extended_price')
      .in('id', itemIds)

    if (tplError || !templates) {
      return new Response(
        JSON.stringify({ error: `Template Fetch Error: ${tplError?.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const priceMap = new Map(templates.map((t: any) => [t.id, t]))
    let serverTotal = 0
    const verifiedItems: { id: string; title: string; license: string; price: number }[] = []

    for (const item of items) {
      const tpl = priceMap.get(item.id)
      if (!tpl) {
        return new Response(JSON.stringify({ error: `Template not found: ${item.id}` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const price =
        item.license === 'extended' && tpl.extended_price ? tpl.extended_price : tpl.price
      serverTotal += price
      verifiedItems.push({
        id: tpl.id,
        title: tpl.title || 'Website Template',
        license: item.license || 'regular',
        price,
      })
    }

    // Apply coupon discount server-side (if any)
    let couponData: any = null
    let discount = 0
    if (couponCode) {
      const { data: coupon, error: couponError } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', couponCode)
        .eq('is_active', true)
        .single()

      if (!couponError && coupon) {
        const now = new Date()
        const notExpired = !coupon.expires_at || new Date(coupon.expires_at) > now
        const underMaxUses = !coupon.max_uses || coupon.used_count < coupon.max_uses
        const meetsMinimum = !coupon.min_order_amount || serverTotal >= coupon.min_order_amount

        if (notExpired && underMaxUses && meetsMinimum) {
          discount =
            coupon.discount_type === 'percentage'
              ? (serverTotal * coupon.discount_value) / 100
              : coupon.discount_value
          couponData = coupon
        }
      }
    }

    const totalAfterDiscount = Math.max(0, serverTotal - discount)

    // SECURITY: This endpoint only handles free orders.
    if (totalAfterDiscount > 0) {
      return new Response(
        JSON.stringify({
          error:
            'This endpoint only accepts free ($0.00) orders. Paid orders must go through PayPal.',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Idempotency: prevent re-claiming the same set of free templates repeatedly is
    // acceptable, but we still insert a fresh order record each legitimate claim.

    // Create the order as 'completed' with no PayPal reference
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        user_email: userEmail,
        total_amount: totalAfterDiscount,
        status: 'completed',
        paypal_order_id: null,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Orders Table Error:', orderError)
      return new Response(
        JSON.stringify({ error: `DB Error (Orders Table): ${orderError.message}` }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Increment coupon usage if a coupon was applied
    if (couponData && discount > 0) {
      await supabaseAdmin
        .from('coupons')
        .update({ used_count: couponData.used_count + 1 })
        .eq('id', couponData.id)
    }

    // Create order items so the templates show up in the user's downloads
    const orderItems = verifiedItems.map((item) => ({
      order_id: order.id,
      template_id: item.id,
      template_title: item.title,
      license_type: item.license,
      price: item.price,
    }))

    const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems)
    if (itemsError) {
      console.error('Order Items Table Error:', itemsError)
    }

    // Increment sales counter for each purchased template
    for (const v of verifiedItems) {
      const { error: salesError } = await supabaseAdmin.rpc('increment_template_sales', {
        template_uuid: v.id,
        step: 1,
      })
      if (salesError) console.error('Failed to increment sales:', salesError)
    }

    return new Response(
      JSON.stringify({ success: true, orderId: order.id, free: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Fatal Function Error:', error)
    return new Response(JSON.stringify({ error: `Server Crash: ${error.message}` }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})