import { cn } from '@/lib/utils/cn';

type TitleSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export default function TitleSection({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: TitleSectionProps) {
  const alignClasses = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={cn('flex flex-col gap-3', alignClasses, className)}>
      {eyebrow ? (
        <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="text-muted-foreground max-w-3xl text-sm sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
