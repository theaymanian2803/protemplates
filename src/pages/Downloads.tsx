import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { usePurchasedTemplates } from "@/hooks/useDashboard";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Loader2, FileArchive, Search, Package, Star, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HostingWizard from "@/components/HostingWizard";

const Downloads = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: purchased, isLoading } = usePurchasedTemplates();
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [hostingOpen, setHostingOpen] = useState(false);
  const [hostingTitle, setHostingTitle] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const handleDownload = async (sourceFileUrl: string, title: string) => {
    setDownloadingId(sourceFileUrl);
    try {
      const { data, error } = await supabase.storage
        .from("template-files")
        .createSignedUrl(sourceFileUrl, 60);
      if (error) throw error;
      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = `${title}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message || "Could not generate download link",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const filtered = (purchased || []).filter((t) =>
    t.template_title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">My Downloads</h1>
            <p className="text-muted-foreground mt-1">Access all your purchased templates anytime</p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search purchased templates..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)}
            </div>
          ) : filtered.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Package className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {search ? "No matching templates" : "No purchased templates yet"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {search
                    ? "Try a different search term"
                    : "Browse our marketplace to find the perfect template"}
                </p>
                {!search && (
                  <Link to="/templates">
                    <Button>Browse Templates</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <Card key={`${item.order_id}-${item.template_id}`} className="border-border/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileArchive className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/template/${item.template_id}`}
                          className="text-sm font-semibold text-foreground hover:text-primary transition-colors truncate block"
                        >
                          {item.template_title}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {item.license_type}
                          </Badge>
                          <span>·</span>
                          <span>{new Date(item.purchased_at).toLocaleDateString()}</span>
                          <span>·</span>
                          <span>${Number(item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!item.has_review && (
                        <Link to={`/template/${item.template_id}`}>
                          <Button variant="ghost" size="sm" className="gap-1 text-accent">
                            <Star className="w-3 h-3" /> Review
                          </Button>
                        </Link>
                      )}
                      {item.source_file_url ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(item.source_file_url!, item.template_title)}
                            disabled={downloadingId === item.source_file_url}
                            className="gap-1"
                          >
                            {downloadingId === item.source_file_url ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Download className="w-3 h-3" />
                            )}
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={() => {
                              setHostingTitle(item.template_title);
                              setHostingOpen(true);
                            }}
                          >
                            <Rocket className="w-3 h-3" /> Host
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">No file available</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
      <HostingWizard open={hostingOpen} onOpenChange={setHostingOpen} templateTitle={hostingTitle} />
    </main>
  );
};

export default Downloads;
