'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReviewCard from '@/components/modules/hotels/ReviewCard';
import WriteReviewForm, { type ReviewFormValues } from '@/components/shared/WriteReviewForm';
import type { HotelReview } from '@/lib/constants/hotel-details-data';

/* ================================================================== */
/*  Types                                                             */
/* ================================================================== */

type ReviewSectionProps = {
  initialReviews: HotelReview[];
  avgRating: string;
};

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */

export default function ReviewSection({ initialReviews, avgRating }: ReviewSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentAvg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : avgRating;

  const handleReviewSubmit = async (values: ReviewFormValues) => {
    // In a real app this would call an API. For now we add it locally.
    const newReview: HotelReview = {
      id: `rev-${Date.now()}`,
      author: 'You',
      avatar: 'YO',
      rating: values.rating,
      date: new Date().toISOString().split('T')[0],
      title: values.title,
      comment: values.comment,
      stayType: 'Guest',
    };

    setReviews((prev) => [newReview, ...prev]);
    setDialogOpen(false);
    toast.success('Review submitted successfully!');
  };

  return (
    <section className="mt-14">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Guest Reviews</h2>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-amber-400 px-2.5 py-1 text-sm font-bold text-white">
              <Star className="size-3.5 fill-current" /> {currentAvg}
            </div>
            <span className="text-muted-foreground text-sm">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Write Review Dialog Trigger */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-2 rounded-full font-semibold">
              Write a Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
            </DialogHeader>
            <WriteReviewForm onSubmit={handleReviewSubmit} className="mt-2" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Review Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
