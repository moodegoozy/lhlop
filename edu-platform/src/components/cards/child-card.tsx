'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, Badge, Avatar, Button } from '@/components/ui';
import { t } from '@/lib/translations';
import type { ChildProfile } from '@/types';

interface ChildCardProps {
  child: ChildProfile;
  bookingsCount?: number;
  upcomingBookings?: number;
  onEdit?: () => void;
  onViewBookings?: () => void;
  onBookLesson?: () => void;
  className?: string;
}

export function ChildCard({
  child,
  bookingsCount = 0,
  upcomingBookings = 0,
  onEdit,
  onViewBookings,
  onBookLesson,
  className,
}: ChildCardProps) {
  const { child_user, grade_level, school_name, learning_goals, learning_notes } = child;

  return (
    <Card className={cn('', className)} padding="default">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar
          src={child_user?.avatar_url}
          alt={child_user?.full_name}
          fallback={child_user?.full_name}
          size="xl"
          className="ring-2 ring-primary-100 dark:ring-primary-900"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">
              {child_user?.full_name}
            </h3>
            {onEdit && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onEdit}
                aria-label="تعديل"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </Button>
            )}
          </div>
          {grade_level && (
            <Badge variant="secondary" size="sm" className="mt-1">
              {grade_level}
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        {school_name && (
          <div className="flex items-center gap-2 text-sm">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span className="text-gray-600 dark:text-gray-300">{school_name}</span>
          </div>
        )}
        {learning_goals && learning_goals.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {learning_goals.slice(0, 3).map((goal, index) => (
              <Badge key={index} variant="info" size="sm">
                {goal}
              </Badge>
            ))}
            {learning_goals.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{learning_goals.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-primary-600">{bookingsCount}</p>
          <p className="text-xs text-gray-500">{t('dashboard.totalBookings')}</p>
        </div>
        <div className="flex-1 text-center border-r border-gray-100 dark:border-gray-800">
          <p className="text-lg font-bold text-amber-600">{upcomingBookings}</p>
          <p className="text-xs text-gray-500">{t('dashboard.upcoming')}</p>
        </div>
      </div>

      {/* Notes */}
      {learning_notes && (
        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg mt-3 mb-4">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            <span className="font-medium">ملاحظات: </span>
            {learning_notes}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        {onBookLesson && (
          <Button className="flex-1" onClick={onBookLesson}>
            {t('booking.bookLesson')}
          </Button>
        )}
        {onViewBookings && (
          <Button variant="outline" className="flex-1" onClick={onViewBookings}>
            {t('dashboard.viewBookings')}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Compact child selector for booking flow
export function ChildSelector({
  children,
  selectedId,
  onSelect,
  className,
}: {
  children: Array<ChildProfile>;
  selectedId?: string;
  onSelect: (childId: string) => void;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {children.map((child) => (
        <div
          key={child.id}
          onClick={() => onSelect(child.id)}
          className={cn(
            'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
            selectedId === child.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700'
          )}
        >
          <Avatar
            src={child.child_user?.avatar_url}
            alt={child.child_user?.full_name}
            fallback={child.child_user?.full_name}
            size="default"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {child.child_user?.full_name}
            </p>
            {child.grade_level && (
              <p className="text-xs text-gray-500">{child.grade_level}</p>
            )}
          </div>
          {selectedId === child.id && (
            <svg
              className="h-5 w-5 text-primary-600 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// Mini child badge for display
export function ChildBadge({
  child,
  className,
}: {
  child: ChildProfile;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30',
        className
      )}
    >
      <Avatar
        src={child.child_user?.avatar_url}
        alt={child.child_user?.full_name}
        fallback={child.child_user?.full_name}
        size="xs"
      />
      <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
        {child.child_user?.full_name}
      </span>
    </div>
  );
}
