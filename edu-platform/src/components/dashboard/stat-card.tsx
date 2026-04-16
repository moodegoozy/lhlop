'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: 'primary' | 'blue' | 'green' | 'amber' | 'purple' | 'red';
  trend?: {
    value: number;
    label?: string;
  };
  subtitle?: string;
  className?: string;
}

const iconColorStyles = {
  primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
};

export function StatCard({
  title,
  value,
  icon,
  iconColor = 'primary',
  trend,
  subtitle,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-white dark:bg-gray-900/50 rounded-2xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'p-4 md:p-5',
        'shadow-sm hover:shadow-md transition-all duration-300',
        'group',
        className
      )}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-gray-100/50 dark:from-gray-900/0 dark:via-gray-900/0 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          
          {(trend || subtitle) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full',
                    trend.value >= 0
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  )}
                >
                  {trend.value >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(trend.value)}%
                </span>
              )}
              {(trend?.label || subtitle) && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {trend?.label || subtitle}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            'transition-transform duration-300 group-hover:scale-110',
            iconColorStyles[iconColor]
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Compact stat card for mobile grids
export function StatCardCompact({
  title,
  value,
  icon,
  iconColor = 'primary',
  className,
}: Omit<StatCardProps, 'trend' | 'subtitle'>) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900/50 rounded-xl',
        'border border-gray-200/50 dark:border-gray-800/50',
        'p-3',
        'shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
            iconColorStyles[iconColor]
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

// Large featured stat card
export function StatCardLarge({
  title,
  value,
  icon,
  iconColor = 'primary',
  description,
  progress,
  className,
}: StatCardProps & { description?: string; progress?: number }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-br from-primary-500 to-primary-600',
        'rounded-2xl p-5 md:p-6',
        'shadow-lg shadow-primary-500/25',
        'text-white',
        className
      )}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-white/80">{title}</p>
            <p className="text-3xl md:text-4xl font-bold mt-1">{value}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-white/80">{description}</p>
        )}
        
        {progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/80 mb-1.5">
              <span>التقدم</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
