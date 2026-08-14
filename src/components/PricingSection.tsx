import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ALL_ACCESS_PRICE } from "@/hooks/useAllAccessPass";
import { motion } from "framer-motion";

const PricingSection = () => {
  const { setAllAccess } = useCart();
  const navigate = useNavigate();

  const indFeatures = ["Achat à l'unité", "Licences standard et étendue", "6 mois de support", "Mises à jour à vie", "Fichiers sources inclus"];
  const aaFeatures = ["Accès à TOUS les templates", "Tous les futurs templates inclus", "Licence standard pour tous", "Support prioritaire", "Mises à jour à vie", "Fichiers sources inclus"];
  const indCtaLink = "/templates";
  const aaPrice = ALL_ACCESS_PRICE;

  const handleBuyAllAccess = () => {
    setAllAccess(true);
    navigate("/checkout");
  };

  return (
    <section id="pricing" className="py-24 bg-muted/30 relative">
      <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[80px]" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-[60px]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Tarifs</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Tarifs simples et transparents
          </h2>
          <p className="text-lg text-muted-foreground">
            Achetez des templates individuellement ou obtenez tout avec un paiement unique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Templates individuels</h3>
              <p className="text-muted-foreground text-sm mb-4">Achetez seulement ce dont vous avez besoin</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-foreground">Variable</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">par template</p>
            </div>
            <ul className="space-y-4 mb-8">
              {indFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" size="lg" className="w-full" onClick={() => navigate(indCtaLink)}>
              Parcourir
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 rounded-2xl bg-card border border-primary shadow-glow-primary scale-105 transition-all duration-300"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              Meilleur rapport qualité-prix
            </div>
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Pass Tout Accès</h3>
              <p className="text-muted-foreground text-sm mb-4">Un paiement, tous les templates</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-5xl font-bold text-foreground">${aaPrice}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">paiement unique</p>
            </div>
            <ul className="space-y-4 mb-8">
              {aaFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <Button variant="hero" size="lg" className="w-full" onClick={handleBuyAllAccess}>
              Obtenir le Pass — ${aaPrice}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
