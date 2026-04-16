'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * DashboardShell - A content wrapper for dashboard pages
 * The sidebar and navbar are handled by the student layout
 */
export function DashboardShell({ children, className }: DashboardShellProps) {
  return (
    <div
      className={cn(
        'p-4 md:p-6 lg:p-8 transition-colors duration-300',
        className
      )}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

// Page title component
export function PageTitle({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-6 md:mb-8', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm md:text-base text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

// Content card wrapper with premium styling
export function ContentCard({
  children,
  className,
  title,
  description,
  actions,
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-200/50 dark:border-gray-800/50',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        !noPadding && 'p-4 md:p-6',
        className
      )}
    >
      {(title || actions) && (
        <div className={cn('flex items-center justify-between', !noPadding && 'mb-4')}>
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

// Stats grid wrapper
export function StatsGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-4 gap-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// Empty state component
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
