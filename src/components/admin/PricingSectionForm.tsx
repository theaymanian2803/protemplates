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
      toast({ title: "Pricing section updated!", description: "Changes are live on the homepage." });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
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
          <CardTitle className="text-base">Section Header</CardTitle>
          <CardDescription>Badge, headline, and subheadline above the pricing cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Badge Text</Label>
            <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Headline</Label>
            <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Subheadline</Label>
            <Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Individual Templates Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Individual Templates Card</CardTitle>
          <CardDescription>Left pricing card settings</CardDescription>
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
              <Label className="text-xs text-muted-foreground">Price Label</Label>
              <Input value={form.individual_price_label} onChange={(e) => setForm({ ...form, individual_price_label: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price Note</Label>
              <Input value={form.individual_price_note} onChange={(e) => setForm({ ...form, individual_price_note: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Button Text</Label>
              <Input value={form.individual_cta_text} onChange={(e) => setForm({ ...form, individual_cta_text: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Button Link</Label>
              <Input value={form.individual_cta_link} onChange={(e) => setForm({ ...form, individual_cta_link: e.target.value })} />
            </div>
          </div>

          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Features</Label>
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
          <CardTitle className="text-base">All Access Pass Card</CardTitle>
          <CardDescription>Right pricing card settings (price is set in code)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Title</Label>
              <Input value={form.allaccess_title} onChange={(e) => setForm({ ...form, allaccess_title: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Subtitle</Label>
              <Input value={form.allaccess_subtitle} onChange={(e) => setForm({ ...form, allaccess_subtitle: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Badge Text</Label>
              <Input value={form.allaccess_badge} onChange={(e) => setForm({ ...form, allaccess_badge: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Price ($)</Label>
              <Input type="number" min={0} value={form.allaccess_price} onChange={(e) => setForm({ ...form, allaccess_price: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Price Note</Label>
            <Input value={form.allaccess_price_note} onChange={(e) => setForm({ ...form, allaccess_price_note: e.target.value })} />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Button Text</Label>
            <Input value={form.allaccess_cta_text} onChange={(e) => setForm({ ...form, allaccess_cta_text: e.target.value })} />
          </div>

          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Features</Label>
          {form.allaccess_features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={f} onChange={(e) => updateFeature("allaccess_features", i, e.target.value)} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => removeFeature("allaccess_features", i)}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addFeature("allaccess_features")} className="gap-1">
            <Plus className="w-3 h-3" /> Add Feature
          </Button>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
};
