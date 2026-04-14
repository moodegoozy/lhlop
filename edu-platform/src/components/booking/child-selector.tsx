'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, Avatar, Badge, Button } from '@/components/ui';
import { t } from '@/lib/translations';
import type { ChildProfile, User } from '@/types';

interface ChildSelectorProps {
  children: ChildProfile[];
  selectedChildId?: string;
  onSelect: (childId: string) => void;
  allowSelf?: boolean;
  selfUser?: User;
  className?: string;
}

export function BookingChildSelector({
  children,
  selectedChildId,
  onSelect,
  allowSelf = false,
  selfUser,
  className,
}: ChildSelectorProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {t('booking.selectStudent')}
      </p>

      {/* Self option for students/adults */}
      {allowSelf && selfUser && (
        <button
          type="button"
          onClick={() => onSelect('self')}
          className={cn(
            'w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 text-right',
            selectedChildId === 'self'
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700'
          )}
        >
          <Avatar
            src={selfUser.avatar_url}
            alt={selfUser.full_name}
            fallback={selfUser.full_name}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {selfUser.full_name}
            </p>
            <p className="text-sm text-gray-500">
              {t('booking.bookForSelf')}
            </p>
          </div>
          {selectedChildId === 'self' && (
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      )}

      {/* Children list */}
      {children.map((child) => (
        <button
          key={child.id}
          type="button"
          onClick={() => onSelect(child.id)}
          className={cn(
            'w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 text-right',
            selectedChildId === child.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700'
          )}
        >
          <Avatar
            src={child.child_user?.avatar_url}
            alt={child.full_name}
            fallback={child.full_name}
            size="lg"
            className="ring-2 ring-primary-100 dark:ring-primary-900"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {child.full_name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {child.grade_level && (
                <Badge variant="secondary" size="sm">
                  {child.grade_level}
                </Badge>
              )}
              {child.age && (
                <span className="text-xs text-gray-500">
                  {child.age} {t('common.years')}
                </span>
              )}
            </div>
          </div>
          {selectedChildId === child.id && (
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}

      {children.length === 0 && !allowSelf && (
        <Card padding="lg" className="text-center">
          <p className="text-gray-500 mb-4">
            {t('booking.noChildrenAdded')}
          </p>
          <Button variant="outline">
            {t('dashboard.addChild')}
          </Button>
        </Card>
      )}
    </div>
  );
}

// Compact inline child selector
export function InlineChildSelector({
  children,
  selectedChildId,
  onSelect,
  className,
}: {
  children: ChildProfile[];
  selectedChildId?: string;
  onSelect: (childId: string) => void;
  className?: string;
}) {
  if (children.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children.map((child) => (
        <button
          key={child.id}
          type="button"
          onClick={() => onSelect(child.id)}
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
            selectedChildId === child.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30'
          )}
        >
          <Avatar
            src={child.child_user?.avatar_url}
            alt={child.full_name}
            fallback={child.full_name}
            size="xs"
          />
          {child.full_name}
        </button>
      ))}
    </div>
  );
}
