import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface PurchasedTemplate {
  template_id: string;
  template_title: string;
  license_type: string;
  price: number;
  purchased_at: string;
  order_id: string;
  order_status: string;
  source_file_url: string | null;
  has_review: boolean;
}

export const usePurchasedTemplates = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["purchased-templates", user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Get completed orders
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("id, status, created_at")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;
      if (!orders?.length) return [];

      const orderIds = orders.map((o) => o.id);

      // Get order items
      const { data: items, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds);

      if (itemsError) throw itemsError;

      // Get download URLs
      const templateIds = [...new Set((items || []).map((i) => i.template_id))];
      const { data: downloads } = await supabase
        .from("template_downloads" as any)
        .select("template_id, source_file_url")
        .in("template_id", templateIds);

      const fileMap = new Map(
        (downloads as any[] ?? []).map((d: any) => [d.template_id, d.source_file_url])
      );

      // Get user's reviews
      const { data: reviews } = await supabase
        .from("reviews")
        .select("template_id")
        .eq("user_id", user.id);

      const reviewedSet = new Set((reviews || []).map((r) => r.template_id));

      const orderMap = new Map(orders.map((o) => [o.id, o]));

      return (items || []).map((item) => ({
        template_id: item.template_id,
        template_title: item.template_title,
        license_type: item.license_type,
        price: item.price,
        purchased_at: orderMap.get(item.order_id)?.created_at || item.created_at,
        order_id: item.order_id,
        order_status: orderMap.get(item.order_id)?.status || "completed",
        source_file_url: fileMap.get(item.template_id) ?? null,
        has_review: reviewedSet.has(item.template_id),
      })) as PurchasedTemplate[];
    },
    enabled: !!user,
  });
};

export const useDashboardStats = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["dashboard-stats", user?.id],
    queryFn: async () => {
      if (!user) return { totalOrders: 0, totalSpent: 0, totalDownloads: 0, pendingReviews: 0 };

      const [ordersRes, itemsRes, reviewsRes] = await Promise.all([
        supabase
          .from("orders")
          .select("id, total_amount, status")
          .eq("user_id", user.id),
        supabase
          .from("order_items")
          .select("template_id, order_id")
          .in(
            "order_id",
            (await supabase.from("orders").select("id").eq("user_id", user.id).eq("status", "completed")).data?.map((o) => o.id) || []
          ),
        supabase
          .from("reviews")
          .select("template_id")
          .eq("user_id", user.id),
      ]);

      const completedOrders = (ordersRes.data || []).filter((o) => o.status === "completed");
      const totalSpent = completedOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
      const purchasedTemplateIds = new Set((itemsRes.data || []).map((i) => i.template_id));
      const reviewedIds = new Set((reviewsRes.data || []).map((r) => r.template_id));
      const pendingReviews = [...purchasedTemplateIds].filter((id) => !reviewedIds.has(id)).length;

      return {
        totalOrders: (ordersRes.data || []).length,
        totalSpent,
        totalDownloads: purchasedTemplateIds.size,
        pendingReviews,
      };
    },
    enabled: !!user,
  });
};
