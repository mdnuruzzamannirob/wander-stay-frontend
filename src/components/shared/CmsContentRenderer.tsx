'use client';

import { useEffect, useState } from 'react';

type CmsContentRendererProps = {
  /** Demo HTML content to render (will be replaced by API data later) */
  demoContent: string;
};

/**
 * Renders CMS HTML content with dangerouslySetInnerHTML.
 * In production, content will come from admin panel API.
 * For now simulates a loading delay with demo content.
 */
export default function CmsContentRenderer({ demoContent }: CmsContentRendererProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');

  useEffect(() => {
    // Simulate API call – replace with useGetCmsPageQuery() later
    const t = setTimeout(() => {
      setContent(demoContent);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, [demoContent]);

  if (isLoading) {
    return <CmsContentSkeleton />;
  }

  return (
    <div
      className="cms-content prose prose-gray prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-xl prose-h2:sm:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-lg prose-p:text-sm prose-p:leading-relaxed prose-p:text-gray-600 prose-p:sm:text-base prose-ul:text-sm prose-ul:text-gray-600 prose-ul:sm:text-base prose-ol:text-sm prose-ol:text-gray-600 prose-ol:sm:text-base prose-li:marker:text-gray-400 prose-strong:text-gray-900 prose-table:text-sm prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2.5 prose-td:px-4 prose-td:py-2.5 prose-table:border prose-th:border prose-td:border max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

/** Skeleton used while CMS content is loading */
export function CmsContentSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Heading block 1 */}
      <div className="space-y-3">
        <div className="h-6 w-48 rounded bg-gray-200 sm:h-7 sm:w-56" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-3/4 rounded bg-gray-100" />
        </div>
      </div>

      {/* Heading block 2 */}
      <div className="space-y-3">
        <div className="h-6 w-56 rounded bg-gray-200 sm:h-7 sm:w-64" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
        </div>
        {/* List items */}
        <div className="space-y-2 pl-4">
          <div className="h-4 w-4/5 rounded bg-gray-100" />
          <div className="h-4 w-3/5 rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
          <div className="h-4 w-3/4 rounded bg-gray-100" />
        </div>
      </div>

      {/* Heading block 3 */}
      <div className="space-y-3">
        <div className="h-6 w-44 rounded bg-gray-200 sm:h-7 sm:w-52" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
        </div>
      </div>

      {/* Heading block 4 */}
      <div className="space-y-3">
        <div className="h-6 w-52 rounded bg-gray-200 sm:h-7 sm:w-60" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-5/6 rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-3/4 rounded bg-gray-100" />
        </div>
        <div className="space-y-2 pl-4">
          <div className="h-4 w-4/5 rounded bg-gray-100" />
          <div className="h-4 w-3/5 rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
        </div>
      </div>

      {/* Heading block 5 */}
      <div className="space-y-3">
        <div className="h-6 w-40 rounded bg-gray-200 sm:h-7 sm:w-48" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
