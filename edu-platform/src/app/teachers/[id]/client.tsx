'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageContainer } from '@/components/layout/app-shell';
import { Card, Button, Avatar, Badge, RatingBadge, Skeleton, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { t } from '@/lib/translations';
import { ROUTES, LESSON_MODE_COLORS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { mockTeacherProfiles, mockReviews } from '@/data/mock';

export default function TeacherProfileClient() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;

  const [teacher, setTeacher] = React.useState<typeof mockTeacherProfiles[0] | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTeacher = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const found = mockTeacherProfiles.find((t) => t.id === teacherId);
      setTeacher(found || null);
      setIsLoading(false);
    };
    loadTeacher();
  }, [teacherId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700" />
        <PageContainer className="py-4 -mt-16">
          <Card padding="lg">
            <div className="flex flex-col items-center text-center -mt-20 mb-6">
              <Skeleton className="w-28 h-28 rounded-full ring-4 ring-white dark:ring-gray-800" />
              <Skeleton className="h-6 w-40 mt-4" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-32 w-full" />
          </Card>
        </PageContainer>
      </div>
    );
  }

  if (!teacher) {
    return (
      <PageContainer className="py-8">
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

  const teacherReviews = mockReviews.filter((r) => r.teacher_user_id === teacher.user_id);
  
  const lessonModeLabel =
    teacher.lesson_mode === 'remote'
      ? t('teachers.lessonModes.online')
      : teacher.lesson_mode === 'in_person'
      ? t('teachers.lessonModes.inPerson')
      : t('teachers.lessonModes.both');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Hero Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      <PageContainer className="-mt-16 relative z-10">
        {/* Profile Card */}
        <Card padding="lg" className="mb-4">
          <div className="flex flex-col items-center text-center -mt-20 mb-4">
            <Avatar
              src={teacher.user?.avatar_url}
              alt={teacher.user?.full_name}
              fallback={teacher.user?.full_name}
              size="2xl"
              className="ring-4 ring-white dark:ring-gray-800 shadow-xl"
            />
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {teacher.user?.full_name}
                </h1>
                {teacher.is_verified && (
                  <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-gray-500 mt-1">{teacher.specialization}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 py-4 border-y border-gray-100 dark:border-gray-800 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-lg">{teacher.average_rating}</span>
              </div>
              <p className="text-xs text-gray-500">{teacher.total_reviews} {t('teachers.reviews')}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {teacher.years_of_experience}
              </p>
              <p className="text-xs text-gray-500">{t('teachers.yearsExperience')}</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-primary-600">
                {formatPrice(teacher.lesson_price)}
              </p>
              <p className="text-xs text-gray-500">{t('common.currency')}/{t('common.lesson')}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Badge className={LESSON_MODE_COLORS[teacher.lesson_mode]}>
              {lessonModeLabel}
            </Badge>
            {teacher.degree && (
              <Badge variant="secondary">
                {teacher.degree === 'phd' && 'دكتوراه'}
                {teacher.degree === 'master' && 'ماجستير'}
                {teacher.degree === 'bachelor' && 'بكالوريوس'}
                {teacher.degree === 'diploma' && 'دبلوم'}
              </Badge>
            )}
            {teacher.city && (
              <Badge variant="secondary">{teacher.city.name_ar}</Badge>
            )}
          </div>

          {/* Bio */}
          {teacher.bio && (
            <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
              {teacher.bio}
            </p>
          )}
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="subjects" className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="subjects" className="flex-1">{t('teachers.subjects')}</TabsTrigger>
            <TabsTrigger value="services" className="flex-1">{t('teachers.services')}</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">{t('teachers.reviews')}</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="mt-4">
            <Card padding="default">
              <h3 className="font-bold mb-3">{t('teachers.teachingSubjects')}</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects?.map((subject) => (
                  <Badge key={subject.id} variant="secondary" size="lg">
                    <span className="ml-1">{subject.icon}</span>
                    {subject.name_ar}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            <Card padding="default">
              <h3 className="font-bold mb-3">{t('teachers.availableServices')}</h3>
              <div className="space-y-3">
                {teacher.services?.map((service) => (
                  <div key={service.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{service.name_ar}</p>
                      <p className="text-sm text-gray-500">{service.description_ar}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card padding="default">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">{t('teachers.studentReviews')}</h3>
                <RatingBadge value={teacher.average_rating} count={teacher.total_reviews} />
              </div>
              
              {teacherReviews.length > 0 ? (
                <div className="space-y-4">
                  {teacherReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar
                          src={review.reviewer?.avatar_url}
                          alt={review.reviewer?.full_name}
                          fallback={review.reviewer?.full_name}
                          size="sm"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                            {review.reviewer?.full_name}
                          </p>
                          <div className="flex items-center gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">{t('teachers.noReviews')}</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Info */}
        {teacher.service_area_text && (
          <Card padding="default" className="mb-4">
            <h3 className="font-bold mb-2">{t('teachers.serviceArea')}</h3>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>{teacher.service_area_text}</p>
            </div>
          </Card>
        )}
      </PageContainer>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 safe-area-bottom">
        <div className="flex items-center gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{formatPrice(teacher.lesson_price)}</p>
            <p className="text-xs text-gray-500">{t('common.currency')}/{t('booking.lesson')}</p>
          </div>
          <Link href={ROUTES.BOOK_TEACHER(teacher.id)} className="flex-1">
            <Button className="w-full" size="lg">{t('teachers.bookNow')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
