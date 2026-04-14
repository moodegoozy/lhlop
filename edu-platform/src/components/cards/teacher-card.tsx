'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card, Badge, Avatar, RatingBadge, Button } from '@/components/ui';
import { ROUTES, LESSON_MODE_COLORS } from '@/lib/constants';
import { t } from '@/lib/translations';
import type { TeacherProfile, Subject, Service, User } from '@/types';

interface TeacherCardProps {
  teacher: TeacherProfile & {
    user?: User;
    subjects?: Subject[];
    services?: Service[];
  };
  variant?: 'default' | 'compact' | 'horizontal';
  showBookButton?: boolean;
  className?: string;
}

export function TeacherCard({
  teacher,
  variant = 'default',
  showBookButton = true,
  className,
}: TeacherCardProps) {
  const {
    user,
    subjects,
    services,
    bio,
    lesson_price,
    average_rating,
    total_reviews,
    years_of_experience,
    lesson_mode,
    is_verified,
  } = teacher;

  const lessonModeLabel =
    lesson_mode === 'remote'
      ? t('teachers.lessonModes.online')
      : lesson_mode === 'in_person'
      ? t('teachers.lessonModes.inPerson')
      : t('teachers.lessonModes.both');

  const lessonModeColor = LESSON_MODE_COLORS[lesson_mode];

  if (variant === 'compact') {
    return (
      <Card
        className={cn('group', className)}
        interactive
        padding="sm"
      >
        <Link
          href={ROUTES.TEACHER_PUBLIC_PROFILE(teacher.id)}
          className="flex items-center gap-3"
        >
          <Avatar
            src={user?.avatar_url}
            alt={user?.full_name}
            fallback={user?.full_name}
            size="lg"
            status={teacher.is_verified ? 'online' : undefined}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600">
              {user?.full_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {subjects?.slice(0, 2).map((s) => s.name_ar).join('، ')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <RatingBadge value={average_rating} count={total_reviews} />
              <span className="text-sm font-semibold text-primary-600">
                {lesson_price} {t('common.currency')}
              </span>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Card
        className={cn('group', className)}
        interactive
        padding="default"
      >
        <div className="flex gap-4">
          {/* Teacher Avatar */}
          <Link
            href={ROUTES.TEACHER_PUBLIC_PROFILE(teacher.id)}
            className="shrink-0"
          >
            <Avatar
              src={user?.avatar_url}
              alt={user?.full_name}
              fallback={user?.full_name}
              size="xl"
              className="ring-2 ring-white dark:ring-gray-800 shadow-md"
            />
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Top row: Name, Rating, Verified */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <Link href={ROUTES.TEACHER_PUBLIC_PROFILE(teacher.id)}>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition-colors">
                    {user?.full_name}
                    {is_verified && (
                      <svg
                        className="inline-block h-5 w-5 mr-1 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {years_of_experience} {t('teachers.yearsExperience')}
                </p>
              </div>
              <RatingBadge value={average_rating} count={total_reviews} />
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {subjects?.slice(0, 3).map((subject) => (
                <Badge key={subject.id} variant="secondary" size="sm">
                  {subject.name_ar}
                </Badge>
              ))}
              {subjects && subjects.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{subjects.length - 3}
                </Badge>
              )}
            </div>

            {/* Bio */}
            {bio && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {bio}
              </p>
            )}

            {/* Bottom row: Price, Mode, Book Button */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {lesson_price} {t('common.currency')}
                  <span className="text-xs font-normal text-gray-500 mr-1">
                    /{t('common.lesson')}
                  </span>
                </span>
                <Badge
                  style={{
                    backgroundColor: `${lessonModeColor}20`,
                    color: lessonModeColor,
                  }}
                  size="sm"
                >
                  {lessonModeLabel}
                </Badge>
              </div>
              {showBookButton && (
                <Link href={ROUTES.BOOK_TEACHER(teacher.id)}>
                  <Button size="sm">{t('teachers.book')}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default: Vertical card (mobile-first)
  return (
    <Card
      className={cn('group overflow-hidden', className)}
      interactive
      padding="none"
    >
      <Link href={ROUTES.TEACHER_PUBLIC_PROFILE(teacher.id)}>
        {/* Top Section with gradient background */}
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white">
          {/* Verified badge */}
          {is_verified && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/20 text-white border-0">
                <svg
                  className="h-3.5 w-3.5 ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('teachers.verified')}
              </Badge>
            </div>
          )}

          {/* Avatar */}
          <div className="flex justify-center">
            <Avatar
              src={user?.avatar_url}
              alt={user?.full_name}
              fallback={user?.full_name}
              size="2xl"
              className="ring-4 ring-white/30 shadow-xl"
            />
          </div>

          {/* Name */}
          <h3 className="text-center text-xl font-bold mt-3 group-hover:underline">
            {user?.full_name}
          </h3>

          {/* Rating */}
          <div className="flex justify-center mt-2">
            <RatingBadge value={average_rating} count={total_reviews} />
          </div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {subjects?.slice(0, 3).map((subject) => (
            <Badge key={subject.id} variant="default" size="sm">
              {subject.name_ar}
            </Badge>
          ))}
          {subjects && subjects.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{subjects.length - 3}
            </Badge>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
            {bio}
          </p>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>{years_of_experience} {t('teachers.yearsExperience')}</span>
          <Badge
            style={{
              backgroundColor: `${lessonModeColor}20`,
              color: lessonModeColor,
            }}
            size="sm"
          >
            {lessonModeLabel}
          </Badge>
        </div>

        {/* Price and Book */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {lesson_price}
            </span>
            <span className="text-sm text-gray-500 mr-1">
              {t('common.currency')}/{t('common.lesson')}
            </span>
          </div>
          {showBookButton && (
            <Link href={ROUTES.BOOK_TEACHER(teacher.id)}>
              <Button>{t('teachers.book')}</Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

// Mini teacher card for lists/selections
export function TeacherMiniCard({
  teacher,
  selected,
  onSelect,
  className,
}: {
  teacher: TeacherProfile & { user?: User };
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
        selected
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700',
        className
      )}
    >
      <Avatar
        src={teacher.user?.avatar_url}
        alt={teacher.user?.full_name}
        fallback={teacher.user?.full_name}
        size="default"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {teacher.user?.full_name}
        </p>
        <div className="flex items-center gap-2">
          <RatingBadge value={teacher.average_rating} />
          <span className="text-sm text-primary-600">
            {teacher.lesson_price} {t('common.currency')}
          </span>
        </div>
      </div>
      {selected && (
        <svg
          className="h-5 w-5 text-primary-600 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
    </div>
  );
}
