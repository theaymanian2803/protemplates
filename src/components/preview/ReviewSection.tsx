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
import {
  seededRandom,
  seededShuffle,
  getPlaceholderReviewCount,
} from "@/lib/seeded";

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

const placeholderNames = [
  'Youssef Ait Baha', 'Fatima Zahra Benali', 'Omar El Fassi', 'Salma Idrissi',
  'Amine Chakir', 'Nadia Tazi', 'Karim Bensouda', 'Laila Moussaoui',
  'Hamza Filali', 'Meryem Ait Ouakrim', 'Rachid Tlemcani', 'Houda Chaoui',
  'Mehdi Zeroual', 'Siham Benchekroun', 'Aicha Boukhari', 'Ilyas Benjelloun',
  'Kenza El Amrani', 'Tariq Ziani', 'Sofia Berrada', 'Anas Oulhaj',
  'Ghita El Mansouri', 'Yassine Bouziane', 'Ines Chraibi', 'Adil Sekkat',
]

const placeholderTexts = [
  'Beautifully designed, exactly what I needed for my business.',
  'Clean code and great documentation. Highly recommend!',
  'The template saved me weeks of work. Looks premium.',
  'Customer support was excellent. Very responsive team.',
  'Perfect fit for my project. Modern and well-structured.',
  'Love the attention to detail. Worth every penny.',
  'Easy to customize and deploy. Great experience overall.',
  'This template exceeded my expectations. Very polished.',
  'Fantastic quality. I will definitely buy more templates here.',
  'Smooth setup process and beautiful design out of the box.',
  'The layout adapts perfectly on every device I tested.',
  'Setup was straightforward and the code is super clean.',
  'My clients constantly compliment this design. Love it.',
  'The included documentation answered every question I had.',
  'Fast, modern, and incredibly easy to work with.',
  'I customized everything in under an hour. Impressive.',
  'A polished product from start to finish.',
  'Great value for the price. Highly professional.',
  'The design system is thoughtful and consistent.',
  'Performance is excellent, loads very fast.',
  'I love how flexible the components are.',
  'Very intuitive for someone with basic coding skills.',
  'The attention to mobile experience is outstanding.',
  'Elegant and functional, exactly what I wanted.',
  'Saved me so much time, worth every dirham.',
  'Support helped me quickly when I got stuck.',
  'Beautiful typography and spacing throughout.',
  'Built with best practices, everything is organized.',
  'My website looks ten times more professional now.',
  'Updates are frequent and the project is well maintained.',
]

function getPlaceholderReviews(templateId: string) {
  const count = getPlaceholderReviewCount(templateId)
  const names = seededShuffle(placeholderNames, `${templateId}-names`)
  const texts = seededShuffle(placeholderTexts, `${templateId}-texts`)
  return Array.from({ length: count }, (_, i) => {
    const rand = seededRandom(`${templateId}-review-${i}`)
    const roll = rand()
    const rating = roll > 0.55 ? 5 : roll > 0.25 ? 4.5 : 4
    const nameIdx = i % names.length
    const textIdx = i % texts.length
    const daysAgo = Math.floor(rand() * 60) + 1
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)
    return {
      id: `placeholder-${i}`,
      display_name: names[nameIdx],
      rating,
      comment: texts[textIdx],
      created_at: date.toISOString(),
      user_id: '',
      status: 'approved' as const,
    }
  })
}

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

  const placeholders = getPlaceholderReviews(templateId);
  const displayReviews = [...placeholders, ...reviews];

  const avgRating =
    displayReviews.length > 0
      ? displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length
      : 0;

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({ title: "Veuillez sélectionner une note", variant: "destructive" });
      return;
    }

    try {
      await submitReview.mutateAsync({ templateId, rating, comment });
      toast({ title: userReview ? "Avis mis à jour ! Il apparaîtra après approbation de l'administrateur." : "Avis soumis ! Il apparaîtra après approbation de l'administrateur." });
      setRating(0);
      setComment("");
      setIsEditing(false);
    } catch {
      toast({ title: "Erreur lors de l'envoi de l'avis", variant: "destructive" });
    }
  };

  const handleDelete = async (reviewId: string) => {
    try {
      await deleteReview.mutateAsync({ reviewId, templateId });
      toast({ title: "Avis supprimé" });
    } catch {
      toast({ title: "Erreur lors de la suppression de l'avis", variant: "destructive" });
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
          Avis
          {displayReviews.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({displayReviews.length})
            </span>
          )}
        </h3>
        {displayReviews.length > 0 && (
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
            {userReview ? "Modifier votre avis" : "Écrire un avis"}
          </h4>
          <StarRating rating={rating} onRate={setRating} interactive />
          <Textarea
            placeholder="Partagez votre expérience avec ce template..."
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
                ? "Envoi en cours..."
                : userReview
                ? "Modifier l'avis"
                : "Soumettre l'avis"}
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
                Annuler
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
                ? "Connectez-vous et achetez ce template pour laisser un avis."
                : !hasPurchased
                ? "Achetez ce template pour laisser un avis."
                : ""}
          </p>
        </div>
      )}

      {/* Show pending status for user's own review */}
      {userReview && !isEditing && userReview.status === "pending" && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-sm">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="text-yellow-600">
            Votre avis est en attente d'approbation par l'administrateur.
          </span>
        </div>
      )}

      {/* User's existing review with edit option */}
      {userReview && !isEditing && (
        <div className="glass-card p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">Votre avis</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={startEdit}>
                Modifier
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
        <p className="text-sm text-muted-foreground">Chargement des avis...</p>
      ) : (
        <div className="space-y-4">
          {displayReviews
            .filter((r) => !user || r.user_id !== user.id)
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
