import * as React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

const sizeStyles = {
  sm: 'h-4 w-4',
  default: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

export function Spinner({ size = 'default', className, ...props }: SpinnerProps) {
  return (
    <svg
      className={cn('animate-spin text-primary-600', sizeStyles[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Full page loading spinner
export function PageSpinner({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center gap-4',
        className
      )}
    >
      <Spinner size="xl" />
      {text && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}

// Inline loading with text
export function LoadingInline({
  text = 'جاري التحميل...',
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Spinner size="sm" />
      <span className="text-sm text-gray-600 dark:text-gray-400">{text}</span>
    </div>
  );
}

// Button loading state
export function ButtonSpinner({ className }: { className?: string }) {
  return <Spinner size="sm" className={cn('text-current', className)} />;
}
