import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ParallaxBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[80px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[80px]"
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity }}
          className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Left content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              Everything You Need to{" "}
              <span className="gradient-text-primary">Ship Faster</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Our templates are more than just designs. They're complete, production-ready codebases built with modern technologies.
            </motion.p>
            <Link to="/templates">
              <Button variant="hero" size="lg" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right features */}
          <div className="space-y-5">
            {[
              { title: "Production-Ready Code", desc: "Clean, well-documented, and battle-tested components" },
              { title: "Responsive Design", desc: "Pixel-perfect on every device, from mobile to 4K" },
              { title: "SEO Optimized", desc: "Built-in best practices for search engine rankings" },
              { title: "Dark Mode Ready", desc: "Beautiful light and dark themes out of the box" },
              { title: "Regular Updates", desc: "New features and security patches delivered monthly" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxBanner;
