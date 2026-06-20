import { useState, useEffect } from "react";
import { usePricingSection, useUpdatePricingSection, PricingSectionSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const PricingSectionForm = () => {
  const { data: settings, isLoading } = usePricingSection();
  const updateMutation = useUpdatePricingSection();
  const { toast } = useToast();

  const [form, setForm] = useState<PricingSectionSettings | null>(null);

  useEffect(() => {
    if (settings && !form) {
      setForm(settings);
    }
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Section tarifs mise à jour !", description: "Les modifications sont en ligne sur la page d'accueil." });
    } catch (err: any) {
      toast({ title: "Erreur lors de l'enregistrement", description: err.message, variant: "destructive" });
    }
  };

  const updateFeature = (key: "individual_features" | "allaccess_features", index: number, value: string) => {
    if (!form) return;
    const features = [...form[key]];
    features[index] = value;
    setForm({ ...form, [key]: features });
  };

  const addFeature = (key: "individual_features" | "allaccess_features") => {
    if (!form) return;
    setForm({ ...form, [key]: [...form[key], ""] });
  };

  const removeFeature = (key: "individual_features" | "allaccess_features", index: number) => {
    if (!form) return;
    setForm({ ...form, [key]: form[key].filter((_, i) => i !== index) });
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
      {/* Section Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">En-tête de section</CardTitle>
          <CardDescription>Badge, titre et sous-titre au-dessus des cartes de tarifs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Badge Text</Label>
            <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Titre</Label>
            <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Sous-titre</Label>
            <Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Individual Templates Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cartes de modèles individuels</CardTitle>
          <CardDescription>Paramètres de la carte de gauche</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input value={form.individual_title} onChange={(e) => setForm({ ...form, individual_title: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Subtitle</Label>
              <Input value={form.individual_subtitle} onChange={(e) => setForm({ ...form, individual_subtitle: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Libellé du prix</Label>
              <Input value={form.individual_price_label} onChange={(e) => setForm({ ...form, individual_price_label: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Note sur le prix</Label>
              <Input value={form.individual_price_note} onChange={(e) => setForm({ ...form, individual_price_note: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Texte du bouton</Label>
              <Input value={form.individual_cta_text} onChange={(e) => setForm({ ...form, individual_cta_text: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Lien du bouton</Label>
              <Input value={form.individual_cta_link} onChange={(e) => setForm({ ...form, individual_cta_link: e.target.value })} />
            </div>
          </div>

          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Fonctionnalités</Label>
          {form.individual_features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={f} onChange={(e) => updateFeature("individual_features", i, e.target.value)} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeFeature("individual_features", i)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addFeature("individual_features")} className="gap-1">
            <Plus className="w-3 h-3" /> Add Feature
          </Button>
        </CardContent>
      </Card>

      {/* All Access Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Carte Pass Tout Accès</CardTitle>
          <CardDescription>Paramètres de la carte de droite (prix défini dans le code)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Titre</Label>
              <Input value={form.allaccess_title} onChange={(e) => setForm({ ...form, allaccess_title: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Sous-titre</Label>
              <Input value={form.allaccess_subtitle} onChange={(e) => setForm({ ...form, allaccess_subtitle: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
            <Label className="text-xs text-muted-foreground">Texte du badge</Label>
              <Input value={form.allaccess_badge} onChange={(e) => setForm({ ...form, allaccess_badge: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Prix ($)</Label>
              <Input type="number" min={0} value={form.allaccess_price} onChange={(e) => setForm({ ...form, allaccess_price: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Note sur le prix</Label>
            <Input value={form.allaccess_price_note} onChange={(e) => setForm({ ...form, allaccess_price_note: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Texte du bouton</Label>
            <Input value={form.allaccess_cta_text} onChange={(e) => setForm({ ...form, allaccess_cta_text: e.target.value })} />
          </div>

          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Fonctionnalités</Label>
          {form.allaccess_features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={f} onChange={(e) => updateFeature("allaccess_features", i, e.target.value)} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeFeature("allaccess_features", i)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addFeature("allaccess_features")} className="gap-1">
            <Plus className="w-3 h-3" /> Ajouter une fonctionnalité
          </Button>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
};
