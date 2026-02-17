'use client';

import { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

type DualRangeSliderProps = {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  step?: number;
  className?: string;
};

export default function DualRangeSlider({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  step = 1,
  className,
}: DualRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const span = max - min;

  const minPercent = ((minValue - min) / span) * 100;
  const maxPercent = ((maxValue - min) / span) * 100;

  const clamp = useCallback((value: number) => Math.min(max, Math.max(min, value)), [min, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = clamp(Number(e.target.value));
    if (val <= maxValue - step) onMinChange(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = clamp(Number(e.target.value));
    if (val >= minValue + step) onMaxChange(val);
  };

  // Keep values in sync if bounds change
  useEffect(() => {
    if (minValue < min) onMinChange(min);
    if (maxValue > max) onMaxChange(max);
  }, [min, max, minValue, maxValue, onMinChange, onMaxChange]);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Value labels */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>

      {/* Track */}
      <div className="relative h-6" ref={trackRef}>
        {/* Background track */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        {/* Active range */}
        <div
          className="bg-primary absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className="dual-range-thumb pointer-events-none absolute inset-0 z-10 h-full w-full appearance-none bg-transparent"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className="dual-range-thumb pointer-events-none absolute inset-0 z-20 h-full w-full appearance-none bg-transparent"
        />
      </div>

      {/* Bound labels */}
      <div className="text-muted-foreground flex items-center justify-between text-[10px] font-medium">
        <span>Min: ${min}</span>
        <span>Max: ${max}</span>
      </div>
    </div>
  );
}
