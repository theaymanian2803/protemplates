import { useState, useEffect } from "react";
import { useFeaturesSection, useUpdateFeaturesSection, FeaturesSectionSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const FeaturesSectionForm = () => {
  const { data: settings, isLoading } = useFeaturesSection();
  const updateMutation = useUpdateFeaturesSection();
  const { toast } = useToast();
  const [form, setForm] = useState<FeaturesSectionSettings | null>(null);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Features section updated!", description: "Changes are live." });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading || !form) {
    return <div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-20 w-full" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Section Header</CardTitle>
          <CardDescription>Badge, headline, and subtitle above the feature cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} /></div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Feature Cards</CardTitle>
          <CardDescription>Individual feature items displayed in a grid</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/50">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={f.title} onChange={(e) => { const features = [...form.features]; features[i] = { ...f, title: e.target.value }; setForm({ ...form, features }); }} />
                <Textarea placeholder="Description" value={f.description} rows={2} onChange={(e) => { const features = [...form.features]; features[i] = { ...f, description: e.target.value }; setForm({ ...form, features }); }} />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, features: [...form.features, { title: "", description: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Feature</Button>
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
