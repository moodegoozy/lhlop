import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'rounded';
  animation?: 'pulse' | 'shimmer' | 'none';
}

function Skeleton({
  className,
  variant = 'default',
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: 'rounded',
    circular: 'rounded-full',
    rounded: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    shimmer:
      'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton components for common patterns
function SkeletonText({
  lines = 3,
  className,
  ...props
}: { lines?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-4/5' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({
  size = 'default',
  className,
  ...props
}: {
  size?: 'sm' | 'default' | 'lg' | 'xl';
} & React.HTMLAttributes<HTMLDivElement>) {
  const sizeStyles = {
    sm: 'h-8 w-8',
    default: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeStyles[size], className)}
      {...props}
    />
  );
}

function SkeletonCard({
  hasImage = true,
  className,
  ...props
}: {
  hasImage?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
      {...props}
    >
      {hasImage && <Skeleton className="mb-4 h-40 w-full rounded-lg" />}
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}

function SkeletonTeacherCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900',
        className
      )}
      {...props}
    >
      <div className="flex gap-4">
        <SkeletonAvatar size="xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <SkeletonText lines={2} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTeacherCard,
};
