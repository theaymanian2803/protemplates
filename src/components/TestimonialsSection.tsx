import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useTestimonialsSection } from "@/hooks/useSiteSettings";

const colorClasses = [
  "bg-primary/10 text-primary",
  "bg-accent/10 text-accent",
];

const TestimonialsSection = () => {
  const { data: settings } = useTestimonialsSection();

  const badge = settings?.badge || "Testimonials";
  const headline = settings?.headline || "Loved by 50,000+ Creators";
  const subheadline = settings?.subheadline || "See why professionals trust us for their most important projects";
  const testimonials = settings?.testimonials || [];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient-bg opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{badge}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-muted-foreground">{subheadline}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-muted/40" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${colorClasses[index % 2]} flex items-center justify-center text-sm font-bold`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
