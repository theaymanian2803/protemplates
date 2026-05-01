import { 
  Zap, Shield, Palette, Code2, HeadphonesIcon, RefreshCw, LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { useFeaturesSection } from "@/hooks/useSiteSettings";

const iconMap: Record<string, LucideIcon> = {
  "Lightning Fast": Zap,
  "Secure & Reliable": Shield,
  "Fully Customizable": Palette,
  "Clean Code": Code2,
  "Premium Support": HeadphonesIcon,
  "Regular Updates": RefreshCw,
};

const fallbackIcons = [Zap, Shield, Palette, Code2, HeadphonesIcon, RefreshCw];

const FeaturesSection = () => {
  const { data: s } = useFeaturesSection();

  const features = (s?.features || []).map((f, i) => ({
    ...f,
    icon: iconMap[f.title] || fallbackIcons[i % fallbackIcons.length],
  }));

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient-bg opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            {s?.badge || "Why Choose Us"}
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            {s?.headline || "Built for Success"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {s?.subheadline || "Every template comes packed with features designed to help you succeed online"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.08 }}
              className="group p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:shadow-glow-primary transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
