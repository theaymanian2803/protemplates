import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ALL_ACCESS_PRICE = 300

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const paypalClientId = Deno.env.get('PAYPAL_CLIENT_ID')?.trim()
    const paypalSecret = Deno.env.get('PAYPAL_SECRET')?.trim()

    if (
      !supabaseUrl ||
      !supabaseAnonKey ||
      !supabaseServiceKey ||
      !paypalClientId ||
      !paypalSecret
    ) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token)

    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const userId = claimsData.claims.sub
    const userEmail = claimsData.claims.email
    const {
      paypalOrderId,
      items,
      isAllAccess,
      couponCode,
      isProHosting,
      templateTitle,
      proHostingNotes,
    } = await req.json()

    if (!paypalOrderId) {
      return new Response(JSON.stringify({ error: 'PayPal order ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    let serverTotal: number
    let verifiedItems: { id: string; title: string; license: string; price: number }[] = []

    if (isProHosting) {
      const { data: settingsData } = await supabaseAdmin
        .from('site_settings')
        .select('value')
        .eq('key', 'hosting_platforms')
        .single()
      serverTotal = settingsData?.value?.pro_service?.price || 20
    } else if (isAllAccess) {
      serverTotal = ALL_ACCESS_PRICE
    } else {
      if (!items || !Array.isArray(items) || items.length === 0) {
        return new Response(JSON.stringify({ error: 'Cart is empty' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const itemIds = items.map((item: any) => item.id)
      const { data: templates, error: tplError } = await supabaseAdmin
        .from('templates')
        .select('id, title, price, extended_price')
        .in('id', itemIds)

      if (tplError || !templates) {
        return new Response(JSON.stringify({ error: 'Failed to verify template prices' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const priceMap = new Map(templates.map((t: any) => [t.id, t]))
      serverTotal = 0

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
    }

    if (couponCode && !isProHosting) {
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
          const discount =
            coupon.discount_type === 'percentage'
              ? (serverTotal * coupon.discount_value) / 100
              : coupon.discount_value
          serverTotal = Math.max(0, serverTotal - discount)

          await supabaseAdmin
            .from('coupons')
            .update({ used_count: coupon.used_count + 1 })
            .eq('id', coupon.id)
        }
      }
    }

    const PAYPAL_API =
      Deno.env.get('PAYPAL_ENVIRONMENT')?.trim() === 'production'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'

    const authResponse = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${paypalClientId}:${paypalSecret}`)}`,
      },
      body: 'grant_type=client_credentials',
    })

    const authData = await authResponse.json()
    if (!authResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to authenticate with PayPal' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const accessToken = authData.access_token

    const verifyResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const verifyData = await verifyResponse.json()
    if (!verifyResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to verify PayPal order' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const paypalAmount = parseFloat(verifyData.purchase_units?.[0]?.amount?.value || '0')
    if (Math.abs(paypalAmount - serverTotal) > 0.01) {
      return new Response(JSON.stringify({ error: 'Payment amount mismatch.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const captureResponse = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const captureData = await captureResponse.json()
    if (!captureResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to capture PayPal payment' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        user_id: userId,
        user_email: userEmail,
        total_amount: serverTotal,
        status: 'completed',
      })
      .select()
      .single()

    if (orderError) {
      return new Response(JSON.stringify({ error: 'Failed to create order record' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (isProHosting) {
      const contactMessage = `Pro Hosting Service purchased.\n\nTemplate: ${templateTitle || 'Not specified'}\nUser Notes: ${proHostingNotes || 'None'}\nOrder ID: ${order.id}\nAmount Paid: $${serverTotal}`

      await supabaseAdmin.from('contacts').insert({
        name: userEmail,
        email: userEmail,
        subject: `Pro Hosting Request${templateTitle ? ` - ${templateTitle}` : ''}`,
        message: contactMessage,
        is_read: false,
      })

      await supabaseAdmin.from('notifications').insert({
        user_id: userId,
        type: 'pro_hosting',
        title: 'Pro Hosting Request Received',
        message: "We've received your pro hosting request and will contact you within 24 hours.",
        metadata: { order_id: order.id, template_title: templateTitle },
      })
    } else if (isAllAccess) {
      await supabaseAdmin.from('all_access_passes').insert({
        user_id: userId,
        order_id: order.id,
        price: serverTotal,
      })
    } else {
      const orderItems = verifiedItems.map((item) => ({
        order_id: order.id,
        template_id: item.id,
        template_title: item.title,
        license_type: item.license,
        price: item.price,
      }))

      const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems)
      if (itemsError) {
        return new Response(JSON.stringify({ error: 'Failed to create order items' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    return new Response(
      JSON.stringify({ success: true, orderId: order.id, paypalOrderId: captureData.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
