'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ImagePlus, Star, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

/* ================================================================== */
/*  Types                                                             */
/* ================================================================== */

export type ReviewFormValues = {
  rating: number;
  title: string;
  comment: string;
  images: File[];
};

type WriteReviewFormProps = {
  /** Called when the form is submitted with validated data */
  onSubmit: (values: ReviewFormValues) => void | Promise<void>;
  /** Maximum images allowed (default 5) */
  maxImages?: number;
  /** Optional class name for the wrapper */
  className?: string;
};

/* ================================================================== */
/*  Interactive Star Rating                                           */
/* ================================================================== */

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
        {Array.from({ length: 5 }).map((_, i) => {
          const starVal = i + 1;
          return (
            <button
              key={starVal}
              type="button"
              onClick={() => onChange(starVal)}
              onMouseEnter={() => setHovered(starVal)}
              className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Rate ${starVal} star${starVal > 1 ? 's' : ''}`}
            >
              <Star
                className={`size-7 transition-colors ${
                  starVal <= display
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            </button>
          );
        })}
      </div>
      {display > 0 && <span className="text-sm font-medium text-amber-600">{labels[display]}</span>}
    </div>
  );
}

/* ================================================================== */
/*  Image Preview                                                     */
/* ================================================================== */

function ImagePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = URL.createObjectURL(file);

  return (
    <div className="group relative size-20 shrink-0 overflow-hidden rounded-xl border border-gray-200">
      <Image src={url} alt="Preview" fill className="object-cover" unoptimized />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Remove image"
      >
        <X className="size-3" />
      </button>
    </div>
  );
}

/* ================================================================== */
/*  Main Form                                                         */
/* ================================================================== */

export default function WriteReviewForm({
  onSubmit,
  maxImages = 5,
  className,
}: WriteReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ---- Validation ---- */
  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (rating === 0) errs.rating = 'Please select a rating';
    if (title.trim().length < 3) errs.title = 'Title must be at least 3 characters';
    if (comment.trim().length < 10) errs.comment = 'Review must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ---- Submit ---- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await onSubmit({ rating, title: title.trim(), comment: comment.trim(), images });
      // Reset on success
      setRating(0);
      setTitle('');
      setComment('');
      setImages([]);
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  /* ---- Image handling ---- */
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
    setImages((prev) => [...prev, ...newFiles].slice(0, maxImages));
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        {/* Rating */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Your Rating <span className="text-red-500">*</span>
          </Label>
          <StarRating value={rating} onChange={setRating} />
          {errors.rating && <p className="text-xs font-medium text-red-500">{errors.rating}</p>}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="review-title" className="text-sm font-semibold">
            Review Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="review-title"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10"
          />
          {errors.title && <p className="text-xs font-medium text-red-500">{errors.title}</p>}
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="review-comment" className="text-sm font-semibold">
            Your Review <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="review-comment"
            placeholder="Tell others about your experience — what did you love? What could be improved?"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="resize-none"
          />
          {errors.comment && <p className="text-xs font-medium text-red-500">{errors.comment}</p>}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Add Photos{' '}
            <span className="text-muted-foreground font-normal">(optional, max {maxImages})</span>
          </Label>

          <div className="flex flex-wrap items-center gap-2">
            {images.map((file, i) => (
              <ImagePreview key={`${file.name}-${i}`} file={file} onRemove={() => removeImage(i)} />
            ))}

            {images.length < maxImages && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex size-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-500"
              >
                <ImagePlus className="size-5" />
                <span className="text-[10px] font-medium">Upload</span>
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <Button type="submit" disabled={submitting} className="w-full font-semibold sm:w-auto">
          {submitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  );
}
