'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { MobileBottomNav } from './mobile-bottom-nav';

interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showBottomNav?: boolean;
  className?: string;
  contentClassName?: string;
}

export function AppShell({
  children,
  header,
  footer,
  showBottomNav = true,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950',
        className
      )}
      dir="rtl"
    >
      {/* Header */}
      {header}

      {/* Main Content */}
      <main
        className={cn(
          'flex-1',
          showBottomNav && 'pb-20 md:pb-0', // Add padding for bottom nav on mobile
          contentClassName
        )}
      >
        {children}
      </main>

      {/* Footer - Hidden on mobile when bottom nav is shown */}
      {footer && (
        <div className={cn(showBottomNav && 'hidden md:block')}>{footer}</div>
      )}

      {/* Mobile Bottom Navigation */}
      {showBottomNav && <MobileBottomNav />}
    </div>
  );
}

// Page container with max-width and padding
export function PageContainer({
  children,
  className,
  noPadding = false,
  maxWidth = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  maxWidth?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
}) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    default: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        !noPadding && 'px-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// Section with title
export function Section({
  title,
  description,
  action,
  children,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('py-4', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-3 px-4">
          <div>
            {title && (
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

// Horizontal scroll container for cards
export function HorizontalScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory',
        className
      )}
    >
      {React.Children.map(children, (child) => (
        <div className="flex-shrink-0 snap-start">{child}</div>
      ))}
    </div>
  );
}

// Grid for cards
export function CardGrid({
  children,
  columns = 'auto',
  gap = 'default',
  className,
}: {
  children: React.ReactNode;
  columns?: 'auto' | 1 | 2 | 3 | 4;
  gap?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const columnClasses = {
    auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-2',
    default: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div
      className={cn('grid', columnClasses[columns], gapClasses[gap], className)}
    >
      {children}
    </div>
  );
}

// Sticky bottom action bar
export function StickyBottomBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'fixed bottom-16 md:bottom-0 inset-x-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 safe-area-bottom',
        className
      )}
    >
      {children}
    </div>
  );
}

// Pull to refresh indicator (for future use)
export function PullToRefresh({
  isRefreshing,
  onRefresh,
  children,
}: {
  isRefreshing: boolean;
  onRefresh: () => void;
  children: React.ReactNode;
}) {
  // TODO: Implement pull to refresh logic
  return <div>{children}</div>;
}
