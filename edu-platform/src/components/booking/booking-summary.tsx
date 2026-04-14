'use client';

import * as React from 'react';
import { cn, formatDate, formatTime, formatPrice } from '@/lib/utils';
import { Card, Avatar, Badge, Button } from '@/components/ui';
import { t } from '@/lib/translations';
import type { TeacherProfile, Subject, Service, ChildProfile, User } from '@/types';

interface BookingSummaryProps {
  teacher: TeacherProfile & { user?: User };
  subject?: Subject;
  service?: Service;
  date?: string;
  time?: string;
  lessonMode?: 'online' | 'in_person';
  student?: ChildProfile | User;
  studentType?: 'self' | 'child';
  notes?: string;
  className?: string;
}

export function BookingSummary({
  teacher,
  subject,
  service,
  date,
  time,
  lessonMode,
  student,
  studentType,
  notes,
  className,
}: BookingSummaryProps) {
  const endTime = React.useMemo(() => {
    if (!time || !teacher.lesson_duration) return '';
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + teacher.lesson_duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMins = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  }, [time, teacher.lesson_duration]);

  return (
    <Card className={cn('', className)} padding="default">
      <h3 className="font-bold text-lg mb-4">{t('booking.summary')}</h3>

      {/* Teacher Info */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
        <Avatar
          src={teacher.user?.avatar_url}
          alt={teacher.user?.full_name}
          fallback={teacher.user?.full_name}
          size="lg"
        />
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {teacher.user?.full_name}
          </p>
          <p className="text-sm text-gray-500">
            {teacher.specialization}
          </p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="space-y-3">
        {/* Subject & Service */}
        {(subject || service) && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              {subject && (
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {subject.name_ar}
                </p>
              )}
              {service && (
                <p className="text-sm text-gray-500">
                  {service.name_ar}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Date & Time */}
        {date && time && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {formatDate(date, 'ar')}
              </p>
              <p className="text-sm text-gray-500">
                {formatTime(time)} - {formatTime(endTime)} ({teacher.lesson_duration} {t('booking.minutes')})
              </p>
            </div>
          </div>
        )}

        {/* Lesson Mode */}
        {lessonMode && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              {lessonMode === 'online' ? (
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {lessonMode === 'online' ? t('teachers.lessonModes.online') : t('teachers.lessonModes.inPerson')}
            </p>
          </div>
        )}

        {/* Student */}
        {student && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {studentType === 'self' ? t('booking.bookingForSelf') : t('booking.bookingForChild')}
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {'full_name' in student ? student.full_name : (student as User).full_name}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{t('booking.notes')}: </span>
              {notes}
            </p>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('booking.lessonPrice')}</span>
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(teacher.lesson_price)} {t('common.currency')}
          </span>
        </div>
      </div>
    </Card>
  );
}

// Compact summary for confirmation
export function BookingConfirmationSummary({
  bookingId,
  teacher,
  subject,
  date,
  time,
  price,
  status,
  className,
}: {
  bookingId: string;
  teacher: { name: string; avatar?: string | null };
  subject: string;
  date: string;
  time: string;
  price: number;
  status: string;
  className?: string;
}) {
  return (
    <Card className={cn('text-center', className)} padding="lg">
      {/* Success Icon */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {t('booking.confirmationTitle')}
      </h2>
      <p className="text-gray-500 mb-6">
        {t('booking.confirmationMessage')}
      </p>

      {/* Booking ID */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-500 mb-1">{t('booking.bookingId')}</p>
        <p className="font-mono font-bold text-gray-900 dark:text-gray-100">
          {bookingId}
        </p>
      </div>

      {/* Quick Info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('booking.teacher')}</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{teacher.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('booking.subject')}</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{subject}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">{t('booking.dateTime')}</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {formatDate(date, 'ar')} • {time}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <span className="text-gray-500">{t('booking.totalPrice')}</span>
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(price)} {t('common.currency')}
          </span>
        </div>
      </div>

      {/* Status Badge */}
      <Badge variant="warning" className="mt-4">
        {t('booking.statusPending')}
      </Badge>
    </Card>
  );
}
