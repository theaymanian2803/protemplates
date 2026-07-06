import Footer from '@/components/Footer'
import HostingWizard from '@/components/HostingWizard'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/hooks/use-toast'
import { useValidateCoupon } from '@/hooks/useCoupons'
import { supabase } from '@/integrations/supabase/client'
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Rocket,
  ShieldCheck,
  Tag,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

declare global {
  interface Window {
    paypal?: any
  }
}

const Checkout = () => {
  const { items, totalPrice, clearCart, isAllAccess } = useCart()
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    null
  )
  const validateCoupon = useValidateCoupon()
  const [hostingOpen, setHostingOpen] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const finalTotal = appliedCoupon ? Math.max(0, totalPrice - appliedCoupon.discount) : totalPrice
  const isFree = finalTotal <= 0 && !isAllAccess

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    try {
      const result = await validateCoupon.mutateAsync({ code: couponCode, orderTotal: totalPrice })
      setAppliedCoupon({ code: result.coupon.code, discount: result.discount })
      toast({ title: 'Code promo appliqué !', description: `Vous avez économisé $${result.discount}` })
    } catch (error: any) {
      toast({ title: 'Code promo invalide', description: error.message, variant: 'destructive' })
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  const handleClaimFreeOrder = async () => {
    if (isAllAccess || items.length === 0) return
    setIsClaiming(true)
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token

      const response = await supabase.functions.invoke('claim-free-order', {
        body: {
          items: items.map((i) => ({ id: i.id, license: i.license })),
          couponCode: appliedCoupon?.code,
        },
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      })

      if (response.error) {
        throw new Error(response.error.error || response.data?.error || 'Échec de la commande')
      }
      if (response.data?.error) {
        throw new Error(response.data.error)
      }

      setOrderId(response.data.orderId)
      setOrderComplete(true)
      clearCart()

      toast({
        title: 'Commande gratuite confirmée !',
        description: 'Vos templates sont désormais disponibles dans vos téléchargements.',
      })
    } catch (error: any) {
      console.error('Claim free order error:', error)
      toast({
        title: 'Erreur de commande',
        description: error.message || 'Échec de la validation de la commande. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsClaiming(false)
    }
  }

  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (loading) return

    if (!user) {
      toast({
        title: 'Connexion requise',
        description: 'Veuillez vous connecter pour continuer.',
        variant: 'destructive',
      })
      navigate('/auth?redirect=/checkout')
      return
    }

    if (items.length === 0 && !isAllAccess && !orderComplete) {
      navigate('/cart')
    }
  }, [user, loading, items, navigate, toast, orderComplete])

  const [paypalError, setPaypalError] = useState<string | null>(null)

  // Load PayPal SDK
  useEffect(() => {
    if (orderComplete || isFree) return

    const loadPayPalScript = async () => {
      const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

      // Check if client ID is missing or is the placeholder value
      if (
        !clientId ||
        clientId === 'YOUR_PAYPAL_SANDBOX_CLIENT_ID' ||
        clientId.startsWith('YOUR_')
      ) {
        console.error('PayPal Client ID not configured properly')
        setPaypalError(
          'PayPal n\'est pas configuré. Ajoutez votre ID client PayPal au fichier .env.'
        )
        return
      }

      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture`
      script.async = true
      script.onload = () => {
        setPaypalLoaded(true)
        setPaypalError(null)
      }
      script.onerror = () => {
        console.error('Failed to load PayPal SDK')
        setPaypalError('Échec du chargement de PayPal. Vérifiez votre ID client.')
        toast({
          title: 'Erreur de paiement',
          description: 'Échec du chargement du système de paiement.',
          variant: 'destructive',
        })
      }
      document.body.appendChild(script)

      return () => {
        const existingScript = document.querySelector(`script[src*="paypal.com/sdk"]`)
        if (existingScript) {
          document.body.removeChild(existingScript)
        }
      }
    }

    loadPayPalScript()
  }, [toast, orderComplete, isFree])

  // Render PayPal buttons
  useEffect(() => {
    if (!paypalLoaded || !window.paypal || orderComplete || isFree) return

    const container = document.getElementById('paypal-button-container')
    if (!container) return

    container.innerHTML = ''

    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: async () => {
          setIsLoading(true)
          try {
            const { data: sessionData } = await supabase.auth.getSession()
            const accessToken = sessionData?.session?.access_token

            const response = await supabase.functions.invoke('create-paypal-order', {
              body: {
                items: isAllAccess ? [] : items.map((i) => ({ id: i.id, license: i.license })),
                isAllAccess,
                couponCode: appliedCoupon?.code,
              },
              headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
            })

            // Polished Error Handling for Create Order
            if (response.error) {
              let errorMsg = response.error.message || 'Échec de la création de la commande'
              if (errorMsg.includes('non-2xx')) {
                errorMsg = 'Système de paiement indisponible. Veuillez réessayer plus tard.'
              }
              throw new Error(response.error.error || response.data?.error || errorMsg)
            }

            if (response.data?.error) {
              throw new Error(response.data.error)
            }

            return response.data.orderId
          } catch (error: any) {
            console.error('Create order error:', error)
            toast({
              title: 'Erreur de commande',
              description: error.message || 'Échec de la création de la commande. Veuillez réessayer.',
              variant: 'destructive',
            })
            throw error
          } finally {
            setIsLoading(false)
          }
        },
        onApprove: async (data: any) => {
          setIsLoading(true)
          try {
            const { data: sessionData } = await supabase.auth.getSession()
            const accessToken = sessionData?.session?.access_token

            const response = await supabase.functions.invoke('capture-paypal-order', {
              body: {
                paypalOrderId: data.orderID,
                items: isAllAccess ? [] : items.map((i) => ({ id: i.id, license: i.license })),
                isAllAccess,
                couponCode: appliedCoupon?.code,
              },
              headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
            })

            // Polished Error Handling for Capture/Declines
            if (response.error) {
              let errorMsg = response.error.message || 'Échec de la validation du paiement'
              if (errorMsg.includes('non-2xx')) {
                errorMsg =
                  'Votre banque ou carte a refusé le paiement. Vérifiez vos fonds ou essayez une autre carte.'
              }
              throw new Error(response.error.error || response.data?.error || errorMsg)
            }

            if (response.data?.error) {
              throw new Error(response.data.error)
            }

            setOrderId(response.data.orderId)
            setOrderComplete(true)
            clearCart()

            toast({
              title: 'Paiement réussi !',
              description: 'Votre commande a été passée avec succès.',
            })
          } catch (error: any) {
            console.error('Capture error:', error)
            toast({
              title: 'Erreur de paiement',
              description: error.message || 'Échec du traitement du paiement. Veuillez réessayer.',
              variant: 'destructive',
            })
          } finally {
            setIsLoading(false)
          }
        },
        onError: (err: any) => {
          console.error('PayPal error:', err)
          toast({
            title: 'Erreur de paiement',
            description: 'Une erreur est survenue avec PayPal. Veuillez réessayer.',
            variant: 'destructive',
          })
        },
        onCancel: () => {
          toast({
            title: 'Paiement annulé',
            description: 'Vous avez annulé le paiement.',
          })
        },
      })
      .render('#paypal-button-container')
  }, [paypalLoaded, items, finalTotal, clearCart, toast, orderComplete, appliedCoupon, isAllAccess, isFree])

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="glass-card p-8 rounded-2xl border border-border/50 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Merci pour votre achat !
              </h1>
              <p className="text-muted-foreground mb-6">
                Votre commande a été passée avec succès. Vous recevrez un e-mail de confirmation
                sous peu.
              </p>
              {orderId && (
                <p className="text-sm text-muted-foreground mb-8">
                  Order ID: <span className="font-mono text-foreground">{orderId}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/profile">
                  <Button variant="hero">Voir mes commandes</Button>
                </Link>
                <Button variant="outline" className="gap-2" onClick={() => setHostingOpen(true)}>
                  <Rocket className="w-4 h-4" /> Héberger
                </Button>
                <Link to="/templates">
                  <Button variant="ghost">Continuer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <HostingWizard open={hostingOpen} onOpenChange={setHostingOpen} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/cart"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Link>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Paiement
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Payment */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-border/50">
                <h2 className="font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Moyen de paiement
                </h2>

                <div className="mb-6">
                  <Label className="text-muted-foreground">E-mail</Label>
                  <Input value={user?.email || ''} disabled className="mt-1 bg-muted/50" />
                </div>

                {isFree ? (
                  <>
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 mb-4">
                      <p className="text-sm text-foreground font-medium mb-1">
                        Commande gratuite
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Ces templates sont gratuits. Cliquez ci-dessous pour les ajouter
                        instantanément à vos téléchargements.
                      </p>
                    </div>

                    {isClaiming && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Traitement...</span>
                      </div>
                    )}

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleClaimFreeOrder}
                      disabled={isClaiming || isLoading}>
                      {isClaiming ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Validation...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Obtenir gratuitement
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    {paypalError && (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 mb-4">
                        <p className="text-sm text-destructive font-medium mb-2">
                          Configuration requise
                        </p>
                        <p className="text-xs text-muted-foreground">{paypalError}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Get your Client ID from{' '}
                          <a
                            href="https://developer.paypal.com/dashboard/applications/sandbox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline">
                            PayPal Developer Dashboard
                          </a>
                        </p>
                      </div>
                    )}

                    {isLoading && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="ml-2 text-muted-foreground">Traitement...</span>
                      </div>
                    )}

                    <div
                      id="paypal-button-container"
                      className={isLoading || paypalError ? 'hidden' : ''}
                    />

                    {!paypalLoaded && !isLoading && !paypalError && (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Chargement des options de paiement...</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="glass-card p-6 rounded-2xl border border-border/50">
                {isFree ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="text-sm">
                      Aucun paiement requis. Vos templates seront disponibles immédiatement dans
                      vos téléchargements.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span className="text-sm">
                      Votre paiement est sécurisé par la protection des acheteurs PayPal
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="glass-card p-6 rounded-2xl border border-border/50 sticky top-24">
                <h2 className="font-semibold text-lg text-foreground mb-4">Récapitulatif de la commande</h2>

                <div className="space-y-4 mb-6">
                  {isAllAccess ? (
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm">Pass Tout Accès</h3>
                        <p className="text-xs text-muted-foreground">Accès à tous les templates</p>
                      </div>
                      <span className="font-semibold text-foreground">${totalPrice}</span>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm truncate">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground capitalize">
                            {item.license} Licence
                          </p>
                        </div>
                        <span className="font-semibold text-foreground">${item.price}</span>
                      </div>
                    ))
                  )}
                </div>

                <Separator className="my-4" />

                {/* Coupon Code */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Code promo</Label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-accent" />
                        <span className="font-mono text-sm font-medium text-foreground">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-sm text-accent">-${appliedCoupon.discount}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleRemoveCoupon}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Entrez votre code promo"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleApplyCoupon}
                        disabled={validateCoupon.isPending || !couponCode.trim()}>
                        {validateCoupon.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Appliquer'
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="text-foreground">${totalPrice}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-accent">Réduction</span>
                      <span className="text-accent">-${appliedCoupon.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxe</span>
                    <span className="text-foreground">$0.00</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-bold text-2xl text-primary">${finalTotal}</span>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  En effectuant cet achat, vous acceptez nos conditions d'utilisation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Checkout
