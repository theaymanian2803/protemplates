import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS')
    return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer '))
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey)
      return new Response(JSON.stringify({ error: 'Missing secrets' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const supabase = createClient(supabaseUrl, supabaseAnonKey, { global: { headers: { Authorization: authHeader } } })
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: claimsErr } = await supabase.auth.getClaims(token)
    if (claimsErr || !claims?.claims)
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const userId = claims.claims.sub
    const { itemId } = await req.json()
    if (!itemId)
      return new Response(JSON.stringify({ error: 'itemId is required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const admin = createClient(supabaseUrl, supabaseServiceKey)

    // Verify ownership: the order_item must belong to an order owned by this user
    const { data: item, error: itemErr } = await admin
      .from('order_items')
      .select('id, order_id')
      .eq('id', itemId)
      .maybeSingle()

    if (itemErr || !item)
      return new Response(JSON.stringify({ error: 'Order item not found' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const { data: order } = await admin
      .from('orders')
      .select('id, user_id')
      .eq('id', item.order_id)
      .maybeSingle()

    if (!order || order.user_id !== userId)
      return new Response(JSON.stringify({ error: 'You do not own this order item' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    // Delete the order item
    const { error: delErr } = await admin.from('order_items').delete().eq('id', itemId)
    if (delErr)
      return new Response(JSON.stringify({ error: `Delete failed: ${delErr.message}` }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})