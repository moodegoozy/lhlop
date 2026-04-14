'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    label?: string;
  };
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  iconBackground?: string;
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  icon,
  iconBackground = 'bg-primary-100 dark:bg-primary-900/30',
  description,
  className,
}: StatsCardProps) {
  // Normalize trend/change to a common format
  const normalizedChange = trend 
    ? { value: trend.value, type: trend.isPositive ? 'increase' as const : 'decrease' as const }
    : change;

  return (
    <Card className={cn('', className)} padding="default">
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
              iconBackground
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
            {value}
          </p>
          {normalizedChange && (
            <div className="flex items-center gap-1 mt-1">
              {normalizedChange.type === 'increase' && (
                <svg
                  className="h-4 w-4 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
              {normalizedChange.type === 'decrease' && (
                <svg
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              )}
              <span
                className={cn(
                  'text-xs font-medium',
                  normalizedChange.type === 'increase' && 'text-green-600',
                  normalizedChange.type === 'decrease' && 'text-red-600',
                  normalizedChange.type === 'neutral' && 'text-gray-500'
                )}
              >
                {normalizedChange.value > 0 ? '+' : ''}
                {normalizedChange.value}%
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// Grid of stats cards
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
        'grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}

// Quick stats for mobile
export function QuickStats({
  stats,
  className,
}: {
  stats: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-2 -mx-4 px-4', className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-[80px]"
        >
          <p
            className={cn(
              'text-lg font-bold',
              stat.color || 'text-gray-900 dark:text-gray-100'
            )}
          >
            {stat.value}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// Teacher dashboard stats
interface TeacherStatsProps {
  totalBookings: number;
  completedLessons: number;
  upcomingLessons: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

export function TeacherStatsCards({ stats }: { stats: TeacherStatsProps }) {
  return (
    <StatsGrid>
      <StatsCard
        title="إجمالي الحجوزات"
        value={stats.totalBookings}
        icon={
          <svg
            className="h-6 w-6 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        iconBackground="bg-primary-100 dark:bg-primary-900/30"
      />
      <StatsCard
        title="دروس مكتملة"
        value={stats.completedLessons}
        icon={
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        iconBackground="bg-green-100 dark:bg-green-900/30"
      />
      <StatsCard
        title="دروس قادمة"
        value={stats.upcomingLessons}
        icon={
          <svg
            className="h-6 w-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        iconBackground="bg-amber-100 dark:bg-amber-900/30"
      />
      <StatsCard
        title="إجمالي الأرباح"
        value={`${stats.totalEarnings} ر.س`}
        icon={
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        iconBackground="bg-blue-100 dark:bg-blue-900/30"
      />
    </StatsGrid>
  );
}

// Admin dashboard stats
interface AdminStatsProps {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  totalBookings: number;
  pendingApprovals: number;
  totalRevenue: number;
}

export function AdminStatsCards({ stats }: { stats: AdminStatsProps }) {
  return (
    <StatsGrid>
      <StatsCard
        title="إجمالي المستخدمين"
        value={stats.totalUsers}
        icon={
          <svg
            className="h-6 w-6 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        }
        iconBackground="bg-primary-100 dark:bg-primary-900/30"
      />
      <StatsCard
        title="المعلمون"
        value={stats.totalTeachers}
        icon={
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        }
        iconBackground="bg-green-100 dark:bg-green-900/30"
      />
      <StatsCard
        title="الحجوزات"
        value={stats.totalBookings}
        icon={
          <svg
            className="h-6 w-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        iconBackground="bg-amber-100 dark:bg-amber-900/30"
      />
      <StatsCard
        title="بانتظار الموافقة"
        value={stats.pendingApprovals}
        icon={
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        iconBackground="bg-red-100 dark:bg-red-900/30"
      />
    </StatsGrid>
  );
}
