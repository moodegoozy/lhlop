import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
        secondary:
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        success:
          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        warning:
          'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
        error:
          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        info:
          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        outline:
          'border border-current bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      dot,
      removable,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'error' && 'bg-red-500',
              variant === 'info' && 'bg-blue-500',
              variant === 'default' && 'bg-primary-500',
              variant === 'secondary' && 'bg-gray-500'
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="mr-0.5 -ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Remove"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
