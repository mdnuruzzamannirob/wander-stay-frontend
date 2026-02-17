import { cn } from '@/lib/utils/cn';

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-[10px] font-bold tracking-wider uppercase',
        className,
      )}
    >
      {children}
    </p>
  );
}
