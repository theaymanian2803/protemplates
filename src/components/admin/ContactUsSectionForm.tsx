import { useState, useEffect } from "react";
import { useContactUs, useUpdateContactUs, ContactUsSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ContactUsSectionForm = () => {
  const { data: settings, isLoading } = useContactUs();
  const updateMutation = useUpdateContactUs();
  const { toast } = useToast();
  const [form, setForm] = useState<ContactUsSettings | null>(null);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Contact page updated!", description: "Changes are live." });
    } catch (err: any) {
      toast({ title: "Error saving", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading || !form) {
    return <div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-20 w-full" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hero Section</CardTitle>
          <CardDescription>Badge, headline, and subtitle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.hero_badge} onChange={(e) => setForm({ ...form, hero_badge: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.hero_headline} onChange={(e) => setForm({ ...form, hero_headline: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Highlight Word</Label><Input value={form.hero_highlight} onChange={(e) => setForm({ ...form, hero_highlight: e.target.value })} /></div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Input value={form.hero_subheadline} onChange={(e) => setForm({ ...form, hero_subheadline: e.target.value })} /></div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Methods</CardTitle>
          <CardDescription>Cards shown above the form (email, phone, chat, address)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.contact_methods.map((m, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/50">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Title" value={m.title} onChange={(e) => { const methods = [...form.contact_methods]; methods[i] = { ...m, title: e.target.value }; setForm({ ...form, contact_methods: methods }); }} />
                  <Input placeholder="Description" value={m.description} onChange={(e) => { const methods = [...form.contact_methods]; methods[i] = { ...m, description: e.target.value }; setForm({ ...form, contact_methods: methods }); }} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Value (display text)" value={m.value} onChange={(e) => { const methods = [...form.contact_methods]; methods[i] = { ...m, value: e.target.value }; setForm({ ...form, contact_methods: methods }); }} />
                  <Input placeholder="Action (URL/link)" value={m.action} onChange={(e) => { const methods = [...form.contact_methods]; methods[i] = { ...m, action: e.target.value }; setForm({ ...form, contact_methods: methods }); }} />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={() => setForm({ ...form, contact_methods: form.contact_methods.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, contact_methods: [...form.contact_methods, { title: "", description: "", value: "", action: "#" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Method</Button>
        </CardContent>
      </Card>

      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Form Section</CardTitle>
          <CardDescription>Title and subtitle above the contact form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Form Title</Label><Input value={form.form_title} onChange={(e) => setForm({ ...form, form_title: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Form Subtitle</Label><Input value={form.form_subtitle} onChange={(e) => setForm({ ...form, form_subtitle: e.target.value })} /></div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Hours</CardTitle>
          <CardDescription>Sidebar business hours display</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.business_hours.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Day" value={h.day} onChange={(e) => { const bh = [...form.business_hours]; bh[i] = { ...h, day: e.target.value }; setForm({ ...form, business_hours: bh }); }} />
              <Input placeholder="Hours" value={h.hours} onChange={(e) => { const bh = [...form.business_hours]; bh[i] = { ...h, hours: e.target.value }; setForm({ ...form, business_hours: bh }); }} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setForm({ ...form, business_hours: form.business_hours.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, business_hours: [...form.business_hours, { day: "", hours: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Row</Button>
          <Separator />
          <div><Label className="text-xs text-muted-foreground">Live Chat Note</Label><Input value={form.live_chat_note} onChange={(e) => setForm({ ...form, live_chat_note: e.target.value })} /></div>
        </CardContent>
      </Card>

      {/* Response Times */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Response Times</CardTitle>
          <CardDescription>Expected response time sidebar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.response_times.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Channel" value={r.label} onChange={(e) => { const rt = [...form.response_times]; rt[i] = { ...r, label: e.target.value }; setForm({ ...form, response_times: rt }); }} />
              <Input placeholder="Time" value={r.time} onChange={(e) => { const rt = [...form.response_times]; rt[i] = { ...r, time: e.target.value }; setForm({ ...form, response_times: rt }); }} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setForm({ ...form, response_times: form.response_times.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, response_times: [...form.response_times, { label: "", time: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Row</Button>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Location & Map</CardTitle>
          <CardDescription>Map/location section at the bottom — enter coordinates to display an interactive map</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Section Title</Label><Input value={form.location_title} onChange={(e) => setForm({ ...form, location_title: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Section Subtitle</Label><Input value={form.location_subtitle} onChange={(e) => setForm({ ...form, location_subtitle: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Address Line 1</Label><Input value={form.location_address_line1} onChange={(e) => setForm({ ...form, location_address_line1: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Address Line 2</Label><Input value={form.location_address_line2} onChange={(e) => setForm({ ...form, location_address_line2: e.target.value })} /></div>
          </div>
          <Separator />
          <p className="text-xs text-muted-foreground">Enter GPS coordinates. Tip: find them on <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer" className="text-primary underline">latlong.net</a></p>
          <div className="grid grid-cols-3 gap-4">
            <div><Label className="text-xs text-muted-foreground">Latitude</Label><Input type="number" step="any" value={form.location_lat ?? 40.7128} onChange={(e) => setForm({ ...form, location_lat: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs text-muted-foreground">Longitude</Label><Input type="number" step="any" value={form.location_lng ?? -74.006} onChange={(e) => setForm({ ...form, location_lng: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label className="text-xs text-muted-foreground">Zoom (1-18)</Label><Input type="number" min={1} max={18} value={form.location_zoom ?? 15} onChange={(e) => setForm({ ...form, location_zoom: parseInt(e.target.value) || 15 })} /></div>
          </div>
          {form.location_lat && form.location_lng && (
            <div className="rounded-lg overflow-hidden border border-border/50 h-[200px]">
              <iframe
                title="Map preview"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${(form.location_lng ?? -74.006) - 0.01},${(form.location_lat ?? 40.7128) - 0.008},${(form.location_lng ?? -74.006) + 0.01},${(form.location_lat ?? 40.7128) + 0.008}&layer=mapnik&marker=${form.location_lat ?? 40.7128},${form.location_lng ?? -74.006}`}
              />
            </div>
          )}
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
