import { useState } from "react";
import { Star, Trash2, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  useReviews,
  useUserReview,
  useHasPurchased,
  useSubmitReview,
  useDeleteReview,
} from "@/hooks/useReviews";

interface ReviewSectionProps {
  templateId: string;
}

const StarRating = ({
  rating,
  onRate,
  interactive = false,
  size = "w-5 h-5",
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: string;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => onRate?.(star)}
        >
          <Star
            className={`${size} transition-colors ${
              star <= (hover || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewSection = ({ templateId }: ReviewSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: reviews = [], isLoading } = useReviews(templateId);
  const { data: userReview } = useUserReview(templateId);
  const { data: hasPurchased } = useHasPurchased(templateId);
  const submitReview = useSubmitReview();
  const deleteReview = useDeleteReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }

    try {
      await submitReview.mutateAsync({ templateId, rating, comment });
      toast({ title: userReview ? "Review updated! It will appear after admin approval." : "Review submitted! It will appear after admin approval." });
      setRating(0);
      setComment("");
      setIsEditing(false);
    } catch {
      toast({ title: "Error submitting review", variant: "destructive" });
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview.mutateAsync({ reviewId, templateId });
      toast({ title: "Review deleted" });
    } catch {
      toast({ title: "Error deleting review", variant: "destructive" });
    }
  };

  const startEdit = () => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment || "");
    }
    setIsEditing(true);
  };

  const canReview = user && hasPurchased && (!userReview || isEditing);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Reviews
          {reviews.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({reviews.length})
            </span>
          )}
        </h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} />
            <span className="text-sm font-semibold text-foreground">
              {avgRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      {canReview && (
        <div className="glass-card p-5 rounded-2xl border border-border/50 space-y-4">
          <h4 className="font-semibold text-foreground text-sm">
            {userReview ? "Update your review" : "Write a review"}
          </h4>
          <StarRating rating={rating} onRate={setRating} interactive />
          <Textarea
            placeholder="Share your experience with this template..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={1000}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={submitReview.isPending}
            >
              {submitReview.isPending
                ? "Submitting..."
                : userReview
                ? "Update Review"
                : "Submit Review"}
            </Button>
            {isEditing && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setRating(0);
                  setComment("");
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Prompt to purchase or sign in */}
      {!canReview && !userReview && (
        <div className="glass-card p-5 rounded-2xl border border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            {!user
              ? "Sign in and purchase this template to leave a review."
              : !hasPurchased
              ? "Purchase this template to leave a review."
              : ""}
          </p>
        </div>
      )}

      {/* Show pending status for user's own review */}
      {userReview && !isEditing && userReview.status === "pending" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="text-yellow-600 dark:text-yellow-400">
            Your review is pending admin approval.
          </span>
        </div>
      )}

      {/* User's existing review with edit option */}
      {userReview && !isEditing && (
        <div className="glass-card p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Your review</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={startEdit}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive"
                onClick={() => handleDelete(userReview.id)}
                disabled={deleteReview.isPending}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          <StarRating rating={userReview.rating} />
          {userReview.comment && (
            <p className="text-sm text-foreground">{userReview.comment}</p>
          )}
        </div>
      )}

      {/* Reviews list */}
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews
            .filter((r) => r.user_id !== user?.id)
            .map((review) => (
              <div
                key={review.id}
                className="glass-card p-4 rounded-xl border border-border/50 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {(review.display_name || "A").charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {review.display_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <StarRating rating={review.rating} size="w-3.5 h-3.5" />
                  </div>
                </div>
                {review.comment && (
                  <p className="text-sm text-muted-foreground pl-11">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
