'use client';

import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { PaymentMethod } from '@/types/checkout';

const METHODS: {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    value: 'credit-card',
    label: 'Credit Card',
    icon: <CreditCard className="size-5" />,
    description: 'Visa, Mastercard, American Express',
  },
  {
    value: 'debit-card',
    label: 'Debit Card',
    icon: <Landmark className="size-5" />,
    description: 'Direct bank debit card',
  },
  {
    value: 'paypal',
    label: 'PayPal',
    icon: <Wallet className="size-5" />,
    description: 'Pay with your PayPal account',
  },
];

type PaymentMethodSelectorProps = {
  value: PaymentMethod | undefined;
  onChange: (method: PaymentMethod) => void;
  error?: string;
};

export default function PaymentMethodSelector({
  value,
  onChange,
  error,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <fieldset>
        <legend className="sr-only">Payment method</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {METHODS.map((method) => {
            const isSelected = value === method.value;
            return (
              <button
                key={method.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onChange(method.value)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-center transition-all',
                  'hover:border-primary/30 hover:bg-primary/5 focus-visible:ring-ring outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-200 bg-white',
                )}
              >
                <div
                  className={cn(
                    'rounded-lg p-2.5 transition-colors',
                    isSelected ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500',
                  )}
                >
                  {method.icon}
                </div>
                <div>
                  <p className={cn('text-sm font-semibold', isSelected && 'text-primary')}>
                    {method.label}
                  </p>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">{method.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </fieldset>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
