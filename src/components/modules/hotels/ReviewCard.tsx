import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { HotelReview } from '@/lib/constants/hotel-details-data';

type ReviewCardProps = {
  review: HotelReview;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-colors hover:border-gray-200">
      {/* Author Row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 ring-2 ring-gray-100">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {review.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{review.author}</p>
            <p className="text-muted-foreground text-xs">{formattedDate}</p>
          </div>
        </div>

        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary rounded-full text-[10px] font-semibold"
        >
          {review.stayType}
        </Badge>
      </div>

      {/* Rating + Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${
                i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-muted-foreground text-xs">{review.rating}.0</span>
      </div>

      {/* Content */}
      <div>
        <h5 className="mb-1.5 text-sm font-bold">{review.title}</h5>
        <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
}
