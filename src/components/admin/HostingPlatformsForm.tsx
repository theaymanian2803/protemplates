import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useHostingSettings, useUpdateHostingSettings, HostingSettings, HostingPlatform, HostingStep, ProHostingService, DEFAULT_HOSTING } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Loader2, GripVertical, Globe, Crown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const HostingPlatformsForm = () => {
  const { data: settings, isLoading } = useHostingSettings();
  const updateSettings = useUpdateHostingSettings();
  const { toast } = useToast();
  const [form, setForm] = useState<HostingSettings>(DEFAULT_HOSTING);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate(form, {
      onSuccess: () => toast({ title: "Hosting settings saved!" }),
      onError: (e) => toast({ title: "Error saving", description: e.message, variant: "destructive" }),
    });
  };

  const updatePlatform = (index: number, updates: Partial<HostingPlatform>) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, i) => (i === index ? { ...p, ...updates } : p)),
    }));
  };

  const updateStep = (platformIdx: number, stepIdx: number, updates: Partial<HostingStep>) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, pi) =>
        pi === platformIdx
          ? { ...p, steps: p.steps.map((s, si) => (si === stepIdx ? { ...s, ...updates } : s)) }
          : p
      ),
    }));
  };

  const addStep = (platformIdx: number) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, i) =>
        i === platformIdx
          ? { ...p, steps: [...p.steps, { title: "New Step", description: "", details: [""] }] }
          : p
      ),
    }));
  };

  const removeStep = (platformIdx: number, stepIdx: number) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, i) =>
        i === platformIdx ? { ...p, steps: p.steps.filter((_, si) => si !== stepIdx) } : p
      ),
    }));
  };

  const addPlatform = () => {
    const id = `platform_${Date.now()}`;
    setForm((prev) => ({
      ...prev,
      platforms: [
        ...prev.platforms,
        {
          id,
          name: "New Platform",
          tagline: "Description of this hosting platform",
          enabled: true,
          color: "bg-primary text-primary-foreground",
          steps: [{ title: "Step 1", description: "First step description", details: ["Detail 1"] }],
        },
      ],
    }));
  };

  const removePlatform = (index: number) => {
    setForm((prev) => ({ ...prev, platforms: prev.platforms.filter((_, i) => i !== index) }));
  };

  const updateDetail = (platformIdx: number, stepIdx: number, detailIdx: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, pi) =>
        pi === platformIdx
          ? {
              ...p,
              steps: p.steps.map((s, si) =>
                si === stepIdx ? { ...s, details: s.details.map((d, di) => (di === detailIdx ? value : d)) } : s
              ),
            }
          : p
      ),
    }));
  };

  const addDetail = (platformIdx: number, stepIdx: number) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, pi) =>
        pi === platformIdx
          ? { ...p, steps: p.steps.map((s, si) => (si === stepIdx ? { ...s, details: [...s.details, ""] } : s)) }
          : p
      ),
    }));
  };

  const removeDetail = (platformIdx: number, stepIdx: number, detailIdx: number) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p, pi) =>
        pi === platformIdx
          ? {
              ...p,
              steps: p.steps.map((s, si) =>
                si === stepIdx ? { ...s, details: s.details.filter((_, di) => di !== detailIdx) } : s
              ),
            }
          : p
      ),
    }));
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Hosting Platforms</h2>
          <p className="text-sm text-muted-foreground">Configure the hosting wizard shown to buyers after purchase</p>
        </div>
        <Button onClick={handleSave} disabled={updateSettings.isPending} className="gap-2">
          {updateSettings.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>

      {/* Pro Hosting Service */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent" />
            Hire a Pro Service
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              checked={form.pro_service.enabled}
              onCheckedChange={(v) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, enabled: v } }))}
            />
            <Label className="text-sm">Show "Hire a Pro" option in hosting wizard</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">Title</Label>
              <Input value={form.pro_service.title} onChange={(e) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, title: e.target.value } }))} />
            </div>
            <div>
              <Label className="text-xs">Price (USD)</Label>
              <Input type="number" value={form.pro_service.price} onChange={(e) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, price: Number(e.target.value) } }))} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs">Description</Label>
              <Textarea value={form.pro_service.description} onChange={(e) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, description: e.target.value } }))} rows={2} />
            </div>
            <div>
              <Label className="text-xs">CTA Button Text</Label>
              <Input value={form.pro_service.cta_text} onChange={(e) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, cta_text: e.target.value } }))} />
            </div>
            <div>
              <Label className="text-xs">Contact Link</Label>
              <Input value={form.pro_service.contact_link} onChange={(e) => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, contact_link: e.target.value } }))} placeholder="/contact" />
            </div>
          </div>

          {/* Features list */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Included Features</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs gap-1"
                onClick={() => setForm((prev) => ({ ...prev, pro_service: { ...prev.pro_service, features: [...prev.pro_service.features, ""] } }))}
              >
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {form.pro_service.features.map((feature, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-4 shrink-0">✓</span>
                  <Input
                    value={feature}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        pro_service: {
                          ...prev.pro_service,
                          features: prev.pro_service.features.map((f, i) => (i === fi ? e.target.value : f)),
                        },
                      }))
                    }
                    className="text-sm"
                  />
                  {form.pro_service.features.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          pro_service: {
                            ...prev.pro_service,
                            features: prev.pro_service.features.filter((_, i) => i !== fi),
                          },
                        }))
                      }
                    >
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Platforms */}
      <Accordion type="multiple" className="space-y-3">
        {form.platforms.map((platform, pi) => (
          <AccordionItem key={platform.id} value={platform.id} className="border border-border/50 rounded-xl overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-lg ${platform.color} flex items-center justify-center shrink-0`}>
                  <Globe className="w-4 h-4" />
                </div>
                <span className="font-semibold text-foreground">{platform.name}</span>
                {!platform.enabled && <Badge variant="secondary" className="text-xs">Disabled</Badge>}
                <Badge variant="outline" className="text-xs ml-auto mr-2">{platform.steps.length} steps</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {/* Platform settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Platform Name</Label>
                    <Input value={platform.name} onChange={(e) => updatePlatform(pi, { name: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs">Tagline</Label>
                    <Input value={platform.tagline} onChange={(e) => updatePlatform(pi, { tagline: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs">Color Class</Label>
                    <Input value={platform.color} onChange={(e) => updatePlatform(pi, { color: e.target.value })} placeholder="bg-primary text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-3 pt-5">
                    <Switch checked={platform.enabled} onCheckedChange={(v) => updatePlatform(pi, { enabled: v })} />
                    <Label className="text-sm">Enabled</Label>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold">Steps</Label>
                    <Button variant="outline" size="sm" onClick={() => addStep(pi)} className="gap-1">
                      <Plus className="w-3 h-3" /> Add Step
                    </Button>
                  </div>

                  {platform.steps.map((step, si) => (
                    <Card key={si} className="border-border/30">
                      <CardHeader className="py-3 px-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Step {si + 1}</CardTitle>
                          {platform.steps.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeStep(pi, si)}>
                              <Trash2 className="w-3 h-3 text-destructive" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-4 space-y-3">
                        <div>
                          <Label className="text-xs">Title</Label>
                          <Input value={step.title} onChange={(e) => updateStep(pi, si, { title: e.target.value })} />
                        </div>
                        <div>
                          <Label className="text-xs">Description</Label>
                          <Textarea value={step.description} onChange={(e) => updateStep(pi, si, { description: e.target.value })} rows={2} />
                        </div>
                        <div>
                          <Label className="text-xs">Command (optional)</Label>
                          <Input value={step.command || ""} onChange={(e) => updateStep(pi, si, { command: e.target.value || undefined })} placeholder="npm install && npm run build" className="font-mono text-xs" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Link URL (optional)</Label>
                            <Input value={step.link_url || ""} onChange={(e) => updateStep(pi, si, { link_url: e.target.value || undefined })} placeholder="https://..." />
                          </div>
                          <div>
                            <Label className="text-xs">Link Label</Label>
                            <Input value={step.link_label || ""} onChange={(e) => updateStep(pi, si, { link_label: e.target.value || undefined })} placeholder="Open Platform" />
                          </div>
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-xs">Step Details</Label>
                            <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={() => addDetail(pi, si)}>
                              <Plus className="w-3 h-3" /> Add
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {step.details.map((detail, di) => (
                              <div key={di} className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-4 shrink-0">{di + 1}.</span>
                                <Input value={detail} onChange={(e) => updateDetail(pi, si, di, e.target.value)} className="text-sm" />
                                {step.details.length > 1 && (
                                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeDetail(pi, si, di)}>
                                    <Trash2 className="w-3 h-3 text-destructive" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="destructive" size="sm" onClick={() => removePlatform(pi)} className="gap-1">
                  <Trash2 className="w-3 h-3" /> Remove Platform
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button variant="outline" onClick={addPlatform} className="w-full gap-2">
        <Plus className="w-4 h-4" /> Add New Platform
      </Button>
    </div>
  );
};
