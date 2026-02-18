import { CmsContentSkeleton } from '@/components/shared/CmsContentRenderer';

type CmsPageLoadingProps = {
  /** Width of the title skeleton pill */
  titleWidth?: string;
};

/**
 * Shared loading skeleton for CMS pages with PageHero + content card.
 * Used by privacy-policy, terms-condition, cancellation-policy loading.tsx files.
 */
export default function CmsPageLoading({ titleWidth = 'w-48 sm:w-56' }: CmsPageLoadingProps) {
  return (
    <div className="bg-gray-50 pb-12 sm:pb-16">
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className={`h-9 animate-pulse rounded-lg bg-white/20 sm:h-11 ${titleWidth}`} />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Content card skeleton */}
      <section className="app-container -mt-8 sm:-mt-10">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-5 sm:p-8 lg:p-10">
          <CmsContentSkeleton />
        </div>
      </section>
    </div>
  );
}
