import { useState, useEffect } from "react";
import { useCategoriesSection, useUpdateCategoriesSection, CategoriesSectionSettings } from "@/hooks/useSiteSettings";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const CategoriesSectionForm = () => {
  const { data: settings, isLoading } = useCategoriesSection();
  const updateMutation = useUpdateCategoriesSection();
  const { toast } = useToast();
  const [form, setForm] = useState<CategoriesSectionSettings | null>(null);

  useEffect(() => {
    if (settings && !form) setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateMutation.mutateAsync(form);
      toast({ title: "Categories section updated!" });
    } catch (e: any) {
      toast({ title: "Error saving", description: e.message, variant: "destructive" });
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
          <div>
            <Label>Badge Text</Label>
            <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          </div>
          <div>
            <Label>Headline</Label>
            <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
          </div>
          <div>
            <Label>Subheadline</Label>
            <Input value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categories</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setForm({ ...form, categories: [...form.categories, { title: "", count: "", description: "" }] })}
            >
              <Plus className="w-4 h-4 mr-1" /> Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {form.categories.map((cat, i) => (
            <div key={i} className="p-4 border border-border rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Category {i + 1}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => setForm({ ...form, categories: form.categories.filter((_, j) => j !== i) })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={cat.title}
                    onChange={(e) => {
                      const categories = [...form.categories];
                      categories[i] = { ...categories[i], title: e.target.value };
                      setForm({ ...form, categories });
                    }}
                  />
                </div>
                <div>
                  <Label>Count</Label>
                  <Input
                    value={cat.count}
                    placeholder="e.g. 2,450+"
                    onChange={(e) => {
                      const categories = [...form.categories];
                      categories[i] = { ...categories[i], count: e.target.value };
                      setForm({ ...form, categories });
                    }}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={cat.description}
                    onChange={(e) => {
                      const categories = [...form.categories];
                      categories[i] = { ...categories[i], description: e.target.value };
                      setForm({ ...form, categories });
                    }}
                  />
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
