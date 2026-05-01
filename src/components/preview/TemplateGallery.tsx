import { useState } from "react";
import { cn } from "@/lib/utils";
import { Template } from "@/hooks/useTemplates";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateGalleryProps {
  template: Template;
}

const TemplateGallery = ({ template }: TemplateGalleryProps) => {
  const allImages = [
    { id: 0, src: template.image_url, label: "Main Preview" },
    ...(template.gallery_images || []).map((src, index) => ({
      id: index + 1,
      src,
      label: `Screenshot ${index + 1}`,
    })),
  ];

  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const navigateLightbox = (dir: number) => {
    setLightboxIndex((prev) => (prev + dir + allImages.length) % allImages.length);
  };

  if (allImages.length === 1) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Template Preview
          </h2>
        </div>
        <div
          className="rounded-xl overflow-hidden border border-border/50 shadow-md cursor-pointer group relative"
          onClick={() => openLightbox(0)}
        >
          <img
            src={template.image_url}
            alt={template.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <Lightbox
          images={allImages}
          index={lightboxIndex}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigateLightbox}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Template Screenshots
        </h2>
        <button
          onClick={() => openLightbox(allImages.findIndex((i) => i.id === activeImage.id))}
          className="text-sm text-primary hover:underline flex items-center gap-1.5"
        >
          <Maximize2 className="w-4 h-4" />
          View Fullscreen
        </button>
      </div>

      {/* Main Image */}
      <div
        className="rounded-xl overflow-hidden border border-border/50 shadow-md cursor-pointer group relative"
        onClick={() => openLightbox(allImages.findIndex((i) => i.id === activeImage.id))}
      >
        <img
          src={activeImage.src}
          alt={activeImage.label}
          className="w-full h-[400px] object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {allImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setActiveImage(image)}
            onDoubleClick={() => openLightbox(index)}
            className={cn(
              "relative rounded-lg overflow-hidden border-2 transition-all duration-200",
              activeImage.id === image.id
                ? "border-primary shadow-glow-green"
                : "border-transparent hover:border-primary/50"
            )}
          >
            <img
              src={image.src}
              alt={image.label}
              className="w-full h-16 md:h-20 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-xs text-white font-medium">{image.label}</span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={allImages}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={navigateLightbox}
      />
    </div>
  );
};

// Lightbox component
interface LightboxProps {
  images: { id: number; src: string; label: string }[];
  index: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}

const Lightbox = ({ images, index, open, onClose, onNavigate }: LightboxProps) => {
  if (images.length === 0) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/70 text-sm">
            {index + 1} / {images.length}
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image */}
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            src={images[index].src}
            alt={images[index].label}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={(e) => { e.stopPropagation(); onNavigate(i - index); }}
                  className={cn(
                    "w-16 h-12 rounded-md overflow-hidden border-2 transition-all shrink-0",
                    i === index ? "border-primary opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplateGallery;
