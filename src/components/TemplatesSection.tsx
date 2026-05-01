import { Button } from "@/components/ui/button";
import TemplateCard from "./TemplateCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTemplates } from "@/hooks/useTemplates";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const TemplatesSection = () => {
  const { data: templates, isLoading } = useTemplates({ limit: 6 });

  return (
    <section id="templates" className="py-24 bg-muted/30 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 blur-[80px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Trending Templates
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Discover our best-selling templates, handpicked by our design experts
            </p>
          </div>
          <Link to="/templates">
            <Button variant="outline" size="lg" className="mt-6 md:mt-0 group">
              View All Templates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-2xl overflow-hidden bg-card border border-border">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            templates?.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TemplateCard 
                  id={template.id}
                  image={template.image_url}
                  title={template.title}
                  category={template.category}
                  price={Number(template.price)}
                  rating={Number(template.rating)}
                  sales={template.sales}
                  featured={template.featured}
                  youtubeId={template.youtube_id}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
