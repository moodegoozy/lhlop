'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/app-shell';
import { Card, Button, Badge, Skeleton } from '@/components/ui';
import { BookingConfirmationSummary } from '@/components/booking';
import { t } from '@/lib/translations';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/auth.store';
import { ROLE_DASHBOARD_ROUTES } from '@/lib/constants';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const bookingId = searchParams.get('id') || 'BK123456';

  // Mock booking data - in real app this would be fetched
  const mockBooking = {
    id: bookingId,
    teacher: {
      name: 'د. أحمد محمد',
      avatar: null,
    },
    subject: 'الرياضيات',
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    price: 150,
    status: 'pending',
  };

  const dashboardUrl = user ? ROLE_DASHBOARD_ROUTES[user.role] : ROUTES.HOME;

  return (
    <>
      {/* Confirmation Summary */}
      <BookingConfirmationSummary
        bookingId={mockBooking.id}
        teacher={mockBooking.teacher}
        subject={mockBooking.subject}
        date={mockBooking.date}
        time={mockBooking.time}
        price={mockBooking.price}
        status={mockBooking.status}
        className="mb-6"
      />

      {/* Next Steps */}
      <Card padding="default" className="mb-6">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t('booking.nextSteps')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 text-sm font-bold shrink-0">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t('booking.step1Title')}
              </p>
              <p className="text-sm text-gray-500">
                {t('booking.step1Description')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm font-bold shrink-0">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t('booking.step2Title')}
              </p>
              <p className="text-sm text-gray-500">
                {t('booking.step2Description')}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-sm font-bold shrink-0">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {t('booking.step3Title')}
              </p>
              <p className="text-sm text-gray-500">
                {t('booking.step3Description')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Link href={dashboardUrl} className="block">
          <Button className="w-full">
            {t('booking.goToDashboard')}
          </Button>
        </Link>
        <Link href={ROUTES.TEACHERS} className="block">
          <Button variant="outline" className="w-full">
            {t('booking.browseMoreTeachers')}
          </Button>
        </Link>
      </div>

      {/* Help Section */}
      <Card padding="default" className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-medium text-blue-800 dark:text-blue-200">
              {t('booking.needHelp')}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {t('booking.contactSupport')}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

function ConfirmationSkeleton() {
  return (
    <div className="space-y-6">
      <Card padding="lg" className="text-center">
        <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </Card>
      <Card padding="default">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </Card>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 flex items-center justify-center">
          <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {t('booking.confirmationTitle')}
          </h1>
        </div>
      </header>

      <PageContainer className="py-6">
        <Suspense fallback={<ConfirmationSkeleton />}>
          <ConfirmationContent />
        </Suspense>
      </PageContainer>
    </div>
  );
}
