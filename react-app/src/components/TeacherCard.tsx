'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, MapPin, BadgeCheck } from 'lucide-react';
import type { Teacher } from '@/types';
import { t } from '@/lib/translations';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const initials = teacher.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="teacher-card group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        {teacher.profile_image ? (
          <Image
            src={teacher.profile_image}
            alt={teacher.name}
            fill
            className="teacher-avatar object-cover"
          />
        ) : (
          <div className="teacher-avatar-fallback">
            <span className="text-4xl">{initials}</span>
          </div>
        )}

        {/* Verified Badge */}
        {teacher.rating >= 4.5 && (
          <div className="absolute top-3 start-3">
            <span className="badge badge-success flex items-center gap-1">
              <BadgeCheck className="w-4 h-4" />
              {t('verified')}
            </span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 end-3">
          <span className="badge bg-yellow-400 text-yellow-900 flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            {teacher.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Name & Gender */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {teacher.name}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t(teacher.gender)}
          </span>
        </div>

        {/* Categories */}
        {teacher.categories && teacher.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {teacher.categories.slice(0, 3).map((cat) => (
              <span
                key={cat.id}
                className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
              >
                {cat.name}
              </span>
            ))}
            {teacher.categories.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                +{teacher.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {teacher.completed_hours} {t('hour')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>{teacher.experience_years}</span>
            <span>{t('years_experience')}</span>
          </div>
        </div>

        {/* Location */}
        {teacher.lesson_location && (
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{t(teacher.lesson_location)}</span>
          </div>
        )}

        {/* Price & Book Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            <span className="riyal-symbol">&#xE900;</span>
            <span className="mx-1">{teacher.hourly_rate}</span>
            <span className="text-sm font-normal text-gray-500">/{t('hour')}</span>
          </div>
          <Link
            href={`/teacher/${teacher.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            {t('book_now')}
          </Link>
        </div>
      </div>
    </div>
  );
}
