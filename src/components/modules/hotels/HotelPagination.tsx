import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HotelPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function HotelPagination({
  currentPage,
  totalPages,
  onPageChange,
}: HotelPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm">
      <p className="text-xs font-medium text-slate-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2 rounded-full bg-slate-50 px-2 py-1">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <ChevronLeft className="size-4" />
          Prev
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const active = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                active ? 'bg-primary text-white' : 'text-slate-600 hover:bg-white'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
