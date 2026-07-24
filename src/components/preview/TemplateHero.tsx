import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Eye, Download, Heart, Share2, ArrowLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Template } from "@/hooks/useTemplates";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { getDisplaySales } from "@/lib/seeded";
import YouTubeModal from "./YouTubeModal";

interface TemplateHeroProps {
  template: Template;
}

const TemplateHero = ({ template }: TemplateHeroProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const isInFavorites = isFavorite(template.id);
  const [videoOpen, setVideoOpen] = useState(false);
  const displaySales = getDisplaySales(template.id, template.sales);

  const handleFavoriteClick = async () => {
    if (!user) {
      toast.error("Veuillez vous connecter pour ajouter aux favoris");
      return;
    }
    await toggleFavorite(template.id);
    toast.success(isInFavorites ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papiers !");
    } catch {
      toast.error("Échec de la copie du lien");
    }
  };

  const handleLivePreview = () => {
    if (template.demo_url) {
      window.open(template.demo_url, "_blank");
    } else {
      toast.info("Aperçu en direct non disponible pour ce modèle");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Retour aux modèles
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link to={`/templates?category=${encodeURIComponent(template.category)}`} className="text-muted-foreground hover:text-primary transition-colors">{template.category}</Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">{template.title}</span>
      </div>

      {/* Main Preview Image */}
      <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-lg group">
        <img
          src={template.image_url}
          alt={`Aperçu de ${template.title}`}
          className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="hero" size="lg" className="gap-2" onClick={handleLivePreview}>
                <Eye className="w-5 h-5" />
                Aperçu en direct
              </Button>
              {template.youtube_id && (
                <Button variant="secondary" size="lg" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white" onClick={() => setVideoOpen(true)}>
                  <Play className="w-5 h-5" />
                  Voir l'aperçu
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="icon" 
                className={`rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 ${isInFavorites ? 'text-destructive' : 'text-white'}`}
                onClick={handleFavoriteClick}
              >
                <Heart className={`w-5 h-5 ${isInFavorites ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {displaySales > 1000 && (
            <Badge className="bg-primary text-primary-foreground">Meilleure vente</Badge>
          )}
          {template.featured && (
            <Badge className="bg-accent text-accent-foreground">En vedette</Badge>
          )}
        </div>
      </div>

      {/* Title and Stats */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {template.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {template.description || "Un modèle premium, entièrement responsive, au design époustouflant."}
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{template.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="w-4 h-4" />
            <span>{displaySales.toLocaleString()} téléchargements</span>
          </div>
        </div>
      </div>

      {template.youtube_id && (
        <YouTubeModal
          youtubeId={template.youtube_id}
          open={videoOpen}
          onOpenChange={setVideoOpen}
        />
      )}
    </div>
  );
};

export default TemplateHero;
