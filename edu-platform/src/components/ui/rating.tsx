import * as React from 'react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'default' | 'lg';
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  readonly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

const StarIcon = ({
  filled,
  halfFilled,
  size,
}: {
  filled: boolean;
  halfFilled?: boolean;
  size: 'sm' | 'default' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <svg
      className={cn(sizeClasses[size])}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`half-${Math.random()}`}>
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={filled ? 'currentColor' : halfFilled ? 'url(#half)' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          filled
            ? 'text-amber-400'
            : 'text-gray-300 dark:text-gray-600'
        )}
      />
    </svg>
  );
};

export function Rating({
  value,
  max = 5,
  size = 'default',
  showValue = false,
  showCount = false,
  count,
  readonly = true,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const roundedValue = Math.round(displayValue * 2) / 2; // Round to nearest 0.5

  const handleClick = (index: number) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readonly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverValue(null);
    }
  };

  const textSizes = {
    sm: 'text-xs',
    default: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div
        className={cn('flex gap-0.5', !readonly && 'cursor-pointer')}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index + 1 <= Math.floor(roundedValue);
          const isHalfFilled =
            index + 0.5 === roundedValue && index + 1 > roundedValue;

          return (
            <span
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              className={cn(!readonly && 'transition-transform hover:scale-110')}
            >
              <StarIcon
                filled={isFilled}
                halfFilled={isHalfFilled}
                size={size}
              />
            </span>
          );
        })}
      </div>
      {showValue && (
        <span
          className={cn(
            'font-medium text-gray-700 dark:text-gray-300',
            textSizes[size]
          )}
        >
          {value.toFixed(1)}
        </span>
      )}
      {showCount && count !== undefined && (
        <span
          className={cn(
            'text-gray-500 dark:text-gray-400',
            textSizes[size]
          )}
        >
          ({count})
        </span>
      )}
    </div>
  );
}

// Compact rating display for cards
export function RatingBadge({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 dark:bg-amber-900/30',
        className
      )}
    >
      <svg
        className="h-3.5 w-3.5 text-amber-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-amber-600/70 dark:text-amber-500/70">
          ({count})
        </span>
      )}
    </div>
  );
}
