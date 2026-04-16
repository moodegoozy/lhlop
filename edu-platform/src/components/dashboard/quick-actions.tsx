'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Calendar,
  MessageCircle,
  Video,
  CreditCard,
  Ticket,
  HelpCircle,
  Gift,
  Star,
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  color: 'primary' | 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'pink';
  badge?: string | number;
}

const defaultActions: QuickAction[] = [
  { id: 'book', label: 'حجز حصة', icon: Calendar, href: '/booking', color: 'primary' },
  { id: 'chat', label: 'المحادثات', icon: MessageCircle, href: '/student/chat', color: 'blue', badge: 3 },
  { id: 'schedule', label: 'جدولي', icon: Video, href: '/student/schedule', color: 'green' },
  { id: 'wallet', label: 'المحفظة', icon: CreditCard, href: '/student/wallet', color: 'amber' },
  { id: 'coupon', label: 'كوبون', icon: Ticket, href: '/student/coupon', color: 'purple' },
  { id: 'support', label: 'الدعم', icon: HelpCircle, href: '/student/support', color: 'red' },
  { id: 'referral', label: 'دعوة صديق', icon: Gift, href: '/student/affiliate', color: 'pink' },
  { id: 'favorites', label: 'المفضلة', icon: Star, href: '/student/favorites', color: 'amber' },
];

const colorStyles = {
  primary: {
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    icon: 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400',
    hover: 'hover:bg-primary-100 dark:hover:bg-primary-900/30',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
    hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/30',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    icon: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
    hover: 'hover:bg-green-100 dark:hover:bg-green-900/30',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    icon: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/30',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    icon: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400',
    hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/30',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    icon: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
    hover: 'hover:bg-red-100 dark:hover:bg-red-900/30',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    icon: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400',
    hover: 'hover:bg-pink-100 dark:hover:bg-pink-900/30',
  },
};

interface QuickActionsProps {
  actions?: QuickAction[];
  columns?: 4 | 5 | 6;
  className?: string;
}

export function QuickActions({
  actions = defaultActions,
  columns = 4,
  className,
}: QuickActionsProps) {
  const gridCols = {
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div className={cn('grid gap-3', gridCols[columns], className)}>
      {actions.map((action) => {
        const Icon = action.icon;
        const colors = colorStyles[action.color];

        return (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              'relative flex flex-col items-center gap-2 p-3 rounded-xl',
              'transition-all duration-200',
              colors.bg,
              colors.hover,
              'group'
            )}
          >
            {action.badge && (
              <span className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full">
                {action.badge}
              </span>
            )}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                'transition-transform duration-200 group-hover:scale-110',
                colors.icon
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

// Horizontal scrolling version for mobile
export function QuickActionsScroll({
  actions = defaultActions,
  className,
}: Omit<QuickActionsProps, 'columns'>) {
  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory',
        className
      )}
    >
      {actions.map((action) => {
        const Icon = action.icon;
        const colors = colorStyles[action.color];

        return (
          <Link
            key={action.id}
            href={action.href}
            className={cn(
              'relative flex flex-col items-center gap-2 p-3 rounded-xl',
              'w-20 shrink-0 snap-start',
              'transition-all duration-200',
              colors.bg,
              colors.hover,
              'group'
            )}
          >
            {action.badge && (
              <span className="absolute -top-1 -left-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full">
                {action.badge}
              </span>
            )}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                'transition-transform duration-200 group-hover:scale-110',
                colors.icon
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center line-clamp-1">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

// Large action cards
export function QuickActionCard({
  label,
  description,
  icon: Icon,
  href,
  color,
  className,
}: {
  label: string;
  description?: string;
  icon: React.ElementType;
  href: string;
  color: keyof typeof colorStyles;
  className?: string;
}) {
  const colors = colorStyles[color];

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-4 p-4 rounded-2xl',
        'bg-white dark:bg-gray-900/50',
        'border border-gray-200/50 dark:border-gray-800/50',
        'hover:shadow-md transition-all duration-200',
        'group',
        className
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
          'transition-transform duration-200 group-hover:scale-110',
          colors.icon
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-4 h-4 text-gray-400 rtl:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
