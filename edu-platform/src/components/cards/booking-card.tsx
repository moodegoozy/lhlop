'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatDate, formatTime, getRelativeTime } from '@/lib/utils';
import { Card, Badge, Avatar, Button } from '@/components/ui';
import { ROUTES, BOOKING_STATUS_COLORS } from '@/lib/constants';
import { t } from '@/lib/translations';
import type { Booking, BookingStatus, User, TeacherProfile, Subject, Service } from '@/types';

interface BookingCardProps {
  booking: Booking & {
    teacher?: TeacherProfile & { user?: User };
    student?: User;
    subject?: Subject;
    service?: Service;
  };
  viewAs: 'teacher' | 'student' | 'parent';
  onCancel?: () => void;
  onConfirm?: () => void;
  onComplete?: () => void;
  onReview?: () => void;
  className?: string;
}

const statusLabels: Record<BookingStatus, string> = {
  pending: 'قيد الانتظار',
  under_review: 'قيد المراجعة',
  confirmed: 'مؤكد',
  completed: 'مكتمل',
  cancelled: 'ملغي',
  no_show: 'لم يحضر',
};

export function BookingCard({
  booking,
  viewAs,
  onCancel,
  onConfirm,
  onComplete,
  onReview,
  className,
}: BookingCardProps) {
  const {
    id,
    teacher,
    booked_for_user,
    subject,
    service,
    booking_date,
    start_time,
    end_time,
    price_snapshot,
    status,
    lesson_mode,
    notes,
    created_at,
  } = booking;

  const statusColor = BOOKING_STATUS_COLORS[status];

  const isPending = status === 'pending';
  const isConfirmed = status === 'confirmed';
  const isCompleted = status === 'completed';
  const isCancelled = status === 'cancelled';

  // Determine which user to show based on viewAs
  const otherUser = viewAs === 'teacher' ? booked_for_user : teacher?.user;
  const otherUserLabel = viewAs === 'teacher' ? t('booking.student') : t('booking.teacher');

  // Check if booking is in the past
  const bookingDate = new Date(`${booking_date}T${start_time}`);
  const isPast = bookingDate < new Date();

  return (
    <Card className={cn('overflow-hidden', className)} padding="none">
      {/* Status Header */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ backgroundColor: `${statusColor}15` }}
      >
        <Badge
          style={{
            backgroundColor: `${statusColor}20`,
            color: statusColor,
          }}
          dot
        >
          {statusLabels[status]}
        </Badge>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {getRelativeTime(created_at)}
        </span>
      </div>

      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar
            src={otherUser?.avatar_url}
            alt={otherUser?.full_name}
            fallback={otherUser?.full_name}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {otherUserLabel}
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {otherUser?.full_name}
            </p>
          </div>
          {viewAs !== 'teacher' && teacher && (
            <Link href={ROUTES.TEACHER_PUBLIC_PROFILE(teacher.id)}>
              <Button variant="ghost" size="sm">
                {t('common.viewProfile')}
              </Button>
            </Link>
          )}
        </div>

        {/* Booking Details */}
        <div className="space-y-3 mb-4">
          {/* Date & Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {formatDate(booking_date, 'ar')}
              </p>
              <p className="text-sm text-gray-500">
                {formatTime(start_time)} - {formatTime(end_time)}
              </p>
            </div>
          </div>

          {/* Subject & Service */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {subject?.name_ar}
              </p>
              <p className="text-sm text-gray-500">
                {service?.name_ar}
              </p>
            </div>
          </div>

          {/* Lesson Mode */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600">
              {lesson_mode === 'remote' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {lesson_mode === 'remote' ? t('teachers.lessonModes.online') : t('teachers.lessonModes.inPerson')}
            </p>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">{t('booking.notes')}: </span>
              {notes}
            </p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-gray-500">{t('booking.totalPrice')}</span>
          <span className="text-xl font-bold text-primary-600">
            {price_snapshot} {t('common.currency')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          {/* Teacher actions */}
          {viewAs === 'teacher' && isPending && (
            <>
              <Button
                variant="default"
                className="flex-1"
                onClick={onConfirm}
              >
                {t('booking.confirm')}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                {t('booking.reject')}
              </Button>
            </>
          )}

          {viewAs === 'teacher' && isConfirmed && !isPast && (
            <Button
              variant="destructive"
              fullWidth
              onClick={onCancel}
            >
              {t('booking.cancel')}
            </Button>
          )}

          {viewAs === 'teacher' && isConfirmed && isPast && (
            <Button
              variant="success"
              fullWidth
              onClick={onComplete}
            >
              {t('booking.markComplete')}
            </Button>
          )}

          {/* Student/Parent actions */}
          {(viewAs === 'student' || viewAs === 'parent') && (
            <>
              {(isPending || isConfirmed) && !isPast && (
                <Button
                  variant="destructive"
                  fullWidth
                  onClick={onCancel}
                >
                  {t('booking.cancel')}
                </Button>
              )}

              {isCompleted && onReview && (
                <Button
                  variant="outline"
                  fullWidth
                  onClick={onReview}
                >
                  {t('booking.addReview')}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}

// Compact booking card for lists
export function BookingMiniCard({
  booking,
  className,
}: {
  booking: Booking & {
    teacher?: TeacherProfile & { user?: User };
    subject?: Subject;
  };
  className?: string;
}) {
  const statusColor = BOOKING_STATUS_COLORS[booking.status];

  return (
    <Card className={cn('', className)} padding="sm" interactive>
      <div className="flex items-center gap-3">
        <Avatar
          src={booking.teacher?.user?.avatar_url}
          alt={booking.teacher?.user?.full_name}
          fallback={booking.teacher?.user?.full_name}
          size="default"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
            {booking.teacher?.user?.full_name}
          </p>
          <p className="text-xs text-gray-500">
            {booking.subject?.name_ar} • {formatDate(booking.booking_date, 'ar')}
          </p>
        </div>
        <Badge
          style={{
            backgroundColor: `${statusColor}20`,
            color: statusColor,
          }}
          size="sm"
        >
          {statusLabels[booking.status]}
        </Badge>
      </div>
    </Card>
  );
}

// Upcoming booking reminder card
export function UpcomingBookingCard({
  booking,
  className,
}: {
  booking: Booking & {
    teacher?: TeacherProfile & { user?: User };
    subject?: Subject;
  };
  className?: string;
}) {
  const bookingDate = new Date(`${booking.booking_date}T${booking.start_time}`);
  const now = new Date();
  const diffMs = bookingDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const isToday = formatDate(booking.booking_date, 'ar') === formatDate(now.toISOString().split('T')[0], 'ar');
  const isSoon = diffMs > 0 && diffHours < 1;

  return (
    <Card
      className={cn(
        'border-2',
        isSoon
          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
          : 'border-primary-500 bg-primary-50 dark:bg-primary-900/20',
        className
      )}
      padding="default"
    >
      <div className="flex items-center gap-1 text-xs font-medium mb-2">
        {isSoon ? (
          <>
            <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-amber-700 dark:text-amber-400">
              يبدأ خلال {diffMins} دقيقة
            </span>
          </>
        ) : isToday ? (
          <>
            <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-primary-700 dark:text-primary-400">
              حجز اليوم
            </span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-primary-700 dark:text-primary-400">
              الحجز القادم
            </span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          src={booking.teacher?.user?.avatar_url}
          alt={booking.teacher?.user?.full_name}
          fallback={booking.teacher?.user?.full_name}
          size="lg"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {booking.teacher?.user?.full_name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {booking.subject?.name_ar}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {formatDate(booking.booking_date, 'ar')} • {formatTime(booking.start_time)}
          </p>
        </div>
      </div>

      {booking.lesson_mode === 'remote' && booking.status === 'confirmed' && (
        <Button className="w-full mt-3" size="sm">
          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          انضم للدرس
        </Button>
      )}
    </Card>
  );
}
