import { useState, useEffect } from "react";
import { useAboutUs, useUpdateAboutUs, AboutUsSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const AboutUsSectionForm = () => {
  const { data: settings, isLoading } = useAboutUs();
  const updateMutation = useUpdateAboutUs();
  const { toast } = useToast();
  const [form, setForm] = useState<AboutUsSettings | null>(null);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings, form]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "About Us updated!", description: "Changes are live." });
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
          <CardDescription>Badge, headline, subtitle, and CTA buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.hero_badge} onChange={(e) => setForm({ ...form, hero_badge: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.hero_headline} onChange={(e) => setForm({ ...form, hero_headline: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Highlight Word</Label><Input value={form.hero_highlight} onChange={(e) => setForm({ ...form, hero_highlight: e.target.value })} /></div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Textarea value={form.hero_subheadline} onChange={(e) => setForm({ ...form, hero_subheadline: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Primary CTA Text</Label><Input value={form.hero_cta_primary_text} onChange={(e) => setForm({ ...form, hero_cta_primary_text: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Primary CTA Link</Label><Input value={form.hero_cta_primary_link} onChange={(e) => setForm({ ...form, hero_cta_primary_link: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Secondary CTA Text</Label><Input value={form.hero_cta_secondary_text} onChange={(e) => setForm({ ...form, hero_cta_secondary_text: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Secondary CTA Link</Label><Input value={form.hero_cta_secondary_link} onChange={(e) => setForm({ ...form, hero_cta_secondary_link: e.target.value })} /></div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stats</CardTitle>
          <CardDescription>Counter stats shown below the hero</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Value" value={s.value} onChange={(e) => { const stats = [...form.stats]; stats[i] = { ...s, value: e.target.value }; setForm({ ...form, stats }); }} className="w-28" />
              <Input placeholder="Label" value={s.label} onChange={(e) => { const stats = [...form.stats]; stats[i] = { ...s, label: e.target.value }; setForm({ ...form, stats }); }} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setForm({ ...form, stats: form.stats.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, stats: [...form.stats, { value: "", label: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Stat</Button>
        </CardContent>
      </Card>

      {/* Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mission Section</CardTitle>
          <CardDescription>Mission badge, headline, paragraphs, image, and awards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.mission_badge} onChange={(e) => setForm({ ...form, mission_badge: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Image URL</Label><Input value={form.mission_image_url} onChange={(e) => setForm({ ...form, mission_image_url: e.target.value })} /></div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.mission_headline} onChange={(e) => setForm({ ...form, mission_headline: e.target.value })} /></div>
          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Paragraphs</Label>
          {form.mission_paragraphs.map((p, i) => (
            <div key={i} className="flex items-start gap-2">
              <Textarea value={p} onChange={(e) => { const ps = [...form.mission_paragraphs]; ps[i] = e.target.value; setForm({ ...form, mission_paragraphs: ps }); }} rows={2} />
              <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={() => setForm({ ...form, mission_paragraphs: form.mission_paragraphs.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, mission_paragraphs: [...form.mission_paragraphs, ""] })} className="gap-1"><Plus className="w-3 h-3" /> Add Paragraph</Button>
          <Separator />
          <Label className="text-xs text-muted-foreground font-semibold">Awards</Label>
          {form.awards.map((a, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Title" value={a.title} onChange={(e) => { const awards = [...form.awards]; awards[i] = { ...a, title: e.target.value }; setForm({ ...form, awards }); }} />
              <Input placeholder="Subtitle" value={a.subtitle} onChange={(e) => { const awards = [...form.awards]; awards[i] = { ...a, subtitle: e.target.value }; setForm({ ...form, awards }); }} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setForm({ ...form, awards: form.awards.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, awards: [...form.awards, { title: "", subtitle: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Award</Button>
        </CardContent>
      </Card>

      {/* Values */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Core Values</CardTitle>
          <CardDescription>Values section heading and value cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.values_badge} onChange={(e) => setForm({ ...form, values_badge: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.values_headline} onChange={(e) => setForm({ ...form, values_headline: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Input value={form.values_subheadline} onChange={(e) => setForm({ ...form, values_subheadline: e.target.value })} /></div>
          <Separator />
          {form.values.map((v, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/50">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={v.title} onChange={(e) => { const values = [...form.values]; values[i] = { ...v, title: e.target.value }; setForm({ ...form, values }); }} />
                <Input placeholder="Description" value={v.description} onChange={(e) => { const values = [...form.values]; values[i] = { ...v, description: e.target.value }; setForm({ ...form, values }); }} />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={() => setForm({ ...form, values: form.values.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, values: [...form.values, { title: "", description: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Value</Button>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Members</CardTitle>
          <CardDescription>Team section heading and member cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.team_badge} onChange={(e) => setForm({ ...form, team_badge: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.team_headline} onChange={(e) => setForm({ ...form, team_headline: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Input value={form.team_subheadline} onChange={(e) => setForm({ ...form, team_subheadline: e.target.value })} /></div>
          <Separator />
          {form.team.map((m, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/50">
              <div className="flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Name" value={m.name} onChange={(e) => { const team = [...form.team]; team[i] = { ...m, name: e.target.value }; setForm({ ...form, team }); }} />
                  <Input placeholder="Role" value={m.role} onChange={(e) => { const team = [...form.team]; team[i] = { ...m, role: e.target.value }; setForm({ ...form, team }); }} />
                </div>
                <Input placeholder="Bio" value={m.bio} onChange={(e) => { const team = [...form.team]; team[i] = { ...m, bio: e.target.value }; setForm({ ...form, team }); }} />
                <Input placeholder="Image URL" value={m.image} onChange={(e) => { const team = [...form.team]; team[i] = { ...m, image: e.target.value }; setForm({ ...form, team }); }} />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 mt-1" onClick={() => setForm({ ...form, team: form.team.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, team: [...form.team, { name: "", role: "", bio: "", image: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Member</Button>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline / Milestones</CardTitle>
          <CardDescription>Journey timeline entries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Badge</Label><Input value={form.milestones_badge} onChange={(e) => setForm({ ...form, milestones_badge: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.milestones_headline} onChange={(e) => setForm({ ...form, milestones_headline: e.target.value })} /></div>
          </div>
          <Separator />
          {form.milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input placeholder="Year" value={m.year} onChange={(e) => { const milestones = [...form.milestones]; milestones[i] = { ...m, year: e.target.value }; setForm({ ...form, milestones }); }} className="w-24" />
              <Input placeholder="Title" value={m.title} onChange={(e) => { const milestones = [...form.milestones]; milestones[i] = { ...m, title: e.target.value }; setForm({ ...form, milestones }); }} className="w-40" />
              <Input placeholder="Event" value={m.event} onChange={(e) => { const milestones = [...form.milestones]; milestones[i] = { ...m, event: e.target.value }; setForm({ ...form, milestones }); }} />
              <Button variant="ghost" size="icon" className="shrink-0" onClick={() => setForm({ ...form, milestones: form.milestones.filter((_, j) => j !== i) })}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setForm({ ...form, milestones: [...form.milestones, { year: "", title: "", event: "" }] })} className="gap-1"><Plus className="w-3 h-3" /> Add Milestone</Button>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bottom CTA</CardTitle>
          <CardDescription>Call-to-action banner at the bottom of the page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label className="text-xs text-muted-foreground">Headline</Label><Input value={form.cta_headline} onChange={(e) => setForm({ ...form, cta_headline: e.target.value })} /></div>
          <div><Label className="text-xs text-muted-foreground">Subheadline</Label><Input value={form.cta_subheadline} onChange={(e) => setForm({ ...form, cta_subheadline: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Primary CTA Text</Label><Input value={form.cta_primary_text} onChange={(e) => setForm({ ...form, cta_primary_text: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Primary CTA Link</Label><Input value={form.cta_primary_link} onChange={(e) => setForm({ ...form, cta_primary_link: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Secondary CTA Text</Label><Input value={form.cta_secondary_text} onChange={(e) => setForm({ ...form, cta_secondary_text: e.target.value })} /></div>
            <div><Label className="text-xs text-muted-foreground">Secondary CTA Link</Label><Input value={form.cta_secondary_link} onChange={(e) => setForm({ ...form, cta_secondary_link: e.target.value })} /></div>
          </div>
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
