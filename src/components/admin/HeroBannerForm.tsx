import { useState, useEffect } from "react";
import { useHeroBanner, useUpdateHeroBanner, HeroBannerSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2, Eye, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const HeroBannerForm = () => {
  const { data: settings, isLoading } = useHeroBanner();
  const updateMutation = useUpdateHeroBanner();
  const { toast } = useToast();

  const [form, setForm] = useState<HeroBannerSettings | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (settings && !form) {
      setForm(settings);
    }
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Bannière héro mise à jour !", description: "Les modifications sont en ligne sur la page d'accueil." });
    } catch (err: any) {
      toast({ title: "Erreur lors de l'enregistrement", description: err.message, variant: "destructive" });
    }
  };

  const updateStat = (index: number, field: string, value: string) => {
    if (!form) return;
    const stats = [...form.stats];
    stats[index] = { ...stats[index], [field]: value };
    setForm({ ...form, stats });
  };

  const addStat = () => {
    if (!form) return;
    setForm({ ...form, stats: [...form.stats, { value: "", label: "", icon: "📊" }] });
  };

  const removeStat = (index: number) => {
    if (!form) return;
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  if (isLoading || !form) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Badge
          </CardTitle>
          <CardDescription>Le petit badge au-dessus du titre</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={form.badge_text}
            onChange={(e) => setForm({ ...form, badge_text: e.target.value })}
            placeholder="🔥 #1 Marketplace de modèles"
          />
        </CardContent>
      </Card>

      {/* Headlines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Titres</CardTitle>
          <CardDescription>Titre principal avec mots mis en avant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Préfixe ligne 1</Label>
              <Input
                value={form.headline_line1_prefix}
                onChange={(e) => setForm({ ...form, headline_line1_prefix: e.target.value })}
                placeholder="Construisez "
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Mot mis en avant ligne 1</Label>
              <Input
                value={form.headline_line1_highlight}
                onChange={(e) => setForm({ ...form, headline_line1_highlight: e.target.value })}
                placeholder="Magnifiques"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Préfixe ligne 2</Label>
              <Input
                value={form.headline_line2_prefix}
                onChange={(e) => setForm({ ...form, headline_line2_prefix: e.target.value })}
                placeholder="Sites web "
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Mot mis en avant ligne 2</Label>
              <Input
                value={form.headline_line2_highlight}
                onChange={(e) => setForm({ ...form, headline_line2_highlight: e.target.value })}
                placeholder="Instantanément"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subheadline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sous-titre</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={form.subheadline}
            onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* CTAs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Boutons d'appel à l'action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Texte du bouton principal</Label>
              <Input
                value={form.cta_primary_text}
                onChange={(e) => setForm({ ...form, cta_primary_text: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Lien du bouton principal</Label>
              <Input
                value={form.cta_primary_link}
                onChange={(e) => setForm({ ...form, cta_primary_link: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Texte du bouton secondaire</Label>
              <Input
                value={form.cta_secondary_text}
                onChange={(e) => setForm({ ...form, cta_secondary_text: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Lien du bouton secondaire</Label>
              <Input
                value={form.cta_secondary_link}
                onChange={(e) => setForm({ ...form, cta_secondary_link: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Video */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vidéo de démonstration</CardTitle>
          <CardDescription>ID YouTube pour le bouton « Voir la démo » (ex. dQw4w9WgXcQ)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={form.demo_video_id || ""}
            onChange={(e) => setForm({ ...form, demo_video_id: e.target.value })}
            placeholder="ID Vidéo YouTube"
          />
          {form.demo_video_id && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={`https://img.youtube.com/vi/${form.demo_video_id}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="w-full max-h-48 object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hero Image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Image héro</CardTitle>
          <CardDescription>Image d'arrière-plan derrière le texte héro avec un fondu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={form.hero_image_url || ""}
            onChange={(e) => setForm({ ...form, hero_image_url: e.target.value })}
            placeholder="https://example.com/hero-image.png"
          />
          {form.hero_image_url && (
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src={form.hero_image_url}
                alt="Hero preview"
                className="w-full max-h-48 object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ligne de statistiques</CardTitle>
          <CardDescription>Jusqu'à 4 statistiques affichées sous le CTA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {form.stats.map((stat, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-16">
                <Label className="text-xs text-muted-foreground">Icône</Label>
                <Input value={stat.icon} onChange={(e) => updateStat(i, "icon", e.target.value)} />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Valeur</Label>
                <Input value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Libellé</Label>
                <Input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeStat(i)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          {form.stats.length < 4 && (
            <Button variant="outline" size="sm" onClick={addStat} className="gap-1">
              <Plus className="w-3 h-3" /> Ajouter une statistique
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="text-base">Aperçu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3 p-6 bg-muted/30 rounded-xl">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-xs text-primary">
                {form.badge_text}
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {form.headline_line1_prefix}
                <span className="gradient-text-primary">{form.headline_line1_highlight}</span>
                <br />
                {form.headline_line2_prefix}
                <span className="gradient-text-accent">{form.headline_line2_highlight}</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">{form.subheadline}</p>
              <div className="flex justify-center gap-2">
                <span className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs">{form.cta_primary_text}</span>
                <span className="px-3 py-1 rounded border text-xs">{form.cta_secondary_text}</span>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {form.stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg">{s.icon}</div>
                    <div className="font-bold text-sm">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Enregistrer les modifications
        </Button>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="gap-2">
          <Eye className="w-4 h-4" />
          {showPreview ? "Masquer l'aperçu" : "Aperçu"}
        </Button>
      </div>
    </div>
  );
};
