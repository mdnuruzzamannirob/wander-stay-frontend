import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export default function GuestRow({ label, sub, val, setVal, min }: any) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-muted-foreground text-xs">{sub}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="hover:border-primary hover:text-primary rounded-full"
          onClick={() => setVal(Math.max(min, val - 1))}
        >
          <Minus className="size-4 shrink-0" />
        </Button>
        <span className="w-5 text-center text-sm font-bold text-slate-900">{val}</span>
        <Button
          variant="outline"
          size="icon"
          className="hover:border-primary hover:text-primary rounded-full"
          onClick={() => setVal(val + 1)}
        >
          <Plus className="size-4 shrink-0" />
        </Button>
      </div>
    </div>
  );
}
