import { 
  ShoppingCart, 
  Briefcase, 
  Layout, 
  FileText, 
  Palette, 
  Smartphone,
  LucideIcon,
  Layers
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCategoriesSection } from "@/hooks/useSiteSettings";

const iconMap: Record<string, LucideIcon> = {
  "E-Commerce": ShoppingCart,
  "Business": Briefcase,
  "Landing Pages": Layout,
  "Portfolios": FileText,
  "Creative": Palette,
  "Mobile Apps": Smartphone,
};

const CategoriesSection = () => {
  const { data: settings } = useCategoriesSection();

  if (!settings) return null;

  return (
    <section id="categories" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">{settings.badge}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            {settings.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {settings.subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {settings.categories.map((category, index) => {
            const Icon = iconMap[category.title] || Layers;
            const colorClass = index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  to={`/templates?category=${encodeURIComponent(category.title)}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer block"
                >
                  <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-foreground">{category.title}</h3>
                    <span className="text-sm font-medium text-primary">{category.count}</span>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
