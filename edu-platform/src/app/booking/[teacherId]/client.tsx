'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/app-shell';
import { Card, Button, Avatar, Badge, RatingBadge, Skeleton } from '@/components/ui';
import { BookingWizard } from '@/components/booking';
import { t } from '@/lib/translations';
import { ROUTES } from '@/lib/constants';
import { mockTeacherProfiles } from '@/data/mock';

export default function BookingPageClient() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.teacherId as string;
  
  const [teacher, setTeacher] = React.useState<typeof mockTeacherProfiles[0] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTeacher = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const found = mockTeacherProfiles.find((t) => t.id === teacherId);
      setTeacher(found || null);
      setIsLoading(false);
    };
    loadTeacher();
  }, [teacherId]);

  if (isLoading) {
    return (
      <PageContainer className="py-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <Card padding="lg">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-64 w-full" />
        </Card>
      </PageContainer>
    );
  }

  if (!teacher) {
    return (
      <PageContainer className="py-4">
        <Card padding="lg" className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t('errors.teacherNotFound')}
          </h2>
          <p className="text-gray-500 mb-4">
            {t('errors.teacherNotFoundDescription')}
          </p>
          <Link href={ROUTES.TEACHERS}>
            <Button>{t('common.backToTeachers')}</Button>
          </Link>
        </Card>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            {t('booking.bookLesson')}
          </h1>
        </div>
      </header>

      <PageContainer className="py-4 pb-20">
        {/* Teacher Quick Info */}
        <Card padding="default" className="mb-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={teacher.user?.avatar_url}
              alt={teacher.user?.full_name}
              fallback={teacher.user?.full_name}
              size="xl"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">
                  {teacher.user?.full_name}
                </h2>
                {teacher.is_verified && (
                  <svg className="h-5 w-5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">{teacher.specialization}</p>
              <div className="flex items-center gap-3 mt-2">
                <RatingBadge value={teacher.average_rating} count={teacher.total_reviews} />
                <Badge variant="secondary" size="sm">
                  {teacher.lesson_price} {t('common.currency')}/{t('common.lesson')}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Wizard */}
        <BookingWizard teacher={teacher} />
      </PageContainer>
    </div>
  );
}
