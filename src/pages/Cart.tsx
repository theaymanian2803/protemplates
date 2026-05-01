import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, updateLicense, totalPrice, clearCart } = useCart();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Browse our templates and add some items to your cart
              </p>
              <Link to="/#templates">
                <Button variant="hero" size="lg">
                  Browse Templates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card p-4 rounded-2xl border border-border/50 flex gap-4"
                  >
                    <Link to={`/template/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/template/${item.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => updateLicense(item.id, "regular")}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            item.license === "regular"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary"
                          }`}
                        >
                          Regular $59
                        </button>
                        <button
                          onClick={() => updateLicense(item.id, "extended")}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            item.license === "extended"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary"
                          }`}
                        >
                          Extended $299
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-primary">${item.price}</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
                  Clear Cart
                </Button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-2xl border border-border/50 sticky top-24">
                  <h2 className="font-semibold text-lg text-foreground mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                      <span className="text-foreground">${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-accent">-$0</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-2xl text-primary">${totalPrice}</span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button variant="hero" size="lg" className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default Cart;
