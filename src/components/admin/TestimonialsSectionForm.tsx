import { useState, useEffect } from "react";
import { useTestimonialsSection, useUpdateTestimonialsSection, TestimonialsSectionSettings, DEFAULT_TESTIMONIALS } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Loader2, Star } from "lucide-react";

export const TestimonialsSectionForm = () => {
  const { data: settings, isLoading } = useTestimonialsSection();
  const updateMutation = useUpdateTestimonialsSection();
  const { toast } = useToast();
  const [form, setForm] = useState<TestimonialsSectionSettings | null>(null);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Testimonials section updated!" });
    } catch (error: any) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    }
  };

  if (isLoading || !form) {
    return <div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-32 w-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Section Header</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} /></div>
          <div><Label>Headline</Label><Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></div>
          <div><Label>Subheadline</Label><Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Testimonials</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setForm({ ...form, testimonials: [...form.testimonials, { name: "", role: "", avatar: "", text: "", rating: 5 }] })}>
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.testimonials.map((t, i) => (
            <div key={i} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-muted-foreground">Testimonial {i + 1}</span>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setForm({ ...form, testimonials: form.testimonials.filter((_, j) => j !== i) })}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div><Label>Name</Label><Input value={t.name} onChange={(e) => { const ts = [...form.testimonials]; ts[i] = { ...ts[i], name: e.target.value }; setForm({ ...form, testimonials: ts }); }} /></div>
                <div><Label>Role</Label><Input value={t.role} onChange={(e) => { const ts = [...form.testimonials]; ts[i] = { ...ts[i], role: e.target.value }; setForm({ ...form, testimonials: ts }); }} /></div>
                <div><Label>Avatar Initials</Label><Input value={t.avatar} onChange={(e) => { const ts = [...form.testimonials]; ts[i] = { ...ts[i], avatar: e.target.value }; setForm({ ...form, testimonials: ts }); }} /></div>
              </div>
              <div><Label>Quote</Label><Textarea value={t.text} onChange={(e) => { const ts = [...form.testimonials]; ts[i] = { ...ts[i], text: e.target.value }; setForm({ ...form, testimonials: ts }); }} /></div>
              <div className="flex items-center gap-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => { const ts = [...form.testimonials]; ts[i] = { ...ts[i], rating: star }; setForm({ ...form, testimonials: ts }); }}>
                      <Star className={`w-5 h-5 ${star <= t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={updateMutation.isPending}>
        {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Save Changes
      </Button>
    </div>
  );
};
