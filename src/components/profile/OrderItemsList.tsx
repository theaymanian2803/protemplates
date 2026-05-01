import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileArchive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderItemsListProps {
  orderId: string;
  orderStatus: string;
}

const OrderItemsList = ({ orderId, orderStatus }: OrderItemsListProps) => {
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ["order-items-with-files", orderId],
    queryFn: async () => {
      // Fetch order items
      const { data: orderItems, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (error) throw error;

      // Fetch download URLs from secure template_downloads table (RLS-gated)
      const templateIds = orderItems.map(item => item.template_id);
      const { data: downloads, error: dlError } = await supabase
        .from("template_downloads" as any)
        .select("template_id, source_file_url")
        .in("template_id", templateIds);

      const fileMap = new Map(
        (downloads as any[] ?? []).map((d: any) => [d.template_id, d.source_file_url])
      );

      return orderItems.map(item => ({
        ...item,
        source_file_url: fileMap.get(item.template_id) ?? null,
      }));
    },
  });

  const handleDownload = async (sourceFileUrl: string, templateTitle: string) => {
    setDownloadingId(sourceFileUrl);
    try {
      const { data, error } = await supabase.storage
        .from("template-files")
        .createSignedUrl(sourceFileUrl, 60); // 60 second expiry

      if (error) throw error;

      // Open signed URL to trigger download
      const link = document.createElement("a");
      link.href = data.signedUrl;
      link.download = `${templateTitle}.zip`;
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

  const canDownload = orderStatus === "completed";

  if (isLoading) {
    return (
      <div className="p-3 border-t space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="p-3 border-t text-sm text-muted-foreground">
        No items found for this order.
      </div>
    );
  }

  return (
    <div className="p-3 border-t space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-2 rounded-md bg-background"
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileArchive className="w-4 h-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.template_title}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {item.license_type} · ${Number(item.price).toFixed(2)}
              </p>
            </div>
          </div>
          {canDownload && item.source_file_url ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(item.source_file_url!, item.template_title)}
              disabled={downloadingId === item.source_file_url}
            >
              {downloadingId === item.source_file_url ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Download className="w-3 h-3" />
              )}
              <span className="ml-1">Download</span>
            </Button>
          ) : !canDownload ? (
            <span className="text-xs text-muted-foreground">
              Available after completion
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default OrderItemsList;
