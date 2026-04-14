'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, Button, Badge, Avatar, Input } from '@/components/ui';
import { TimeSlotPicker, HorizontalDayPicker } from './time-slot-picker';
import { BookingChildSelector } from './child-selector';
import { BookingSummary } from './booking-summary';
import { t } from '@/lib/translations';
import { ROUTES } from '@/lib/constants';
import { useAuthStore } from '@/store/auth.store';
import { useBookingStore } from '@/store/booking.store';
import type { TeacherProfile, Subject, Service, User, ChildProfile } from '@/types';

interface BookingWizardProps {
  teacher: TeacherProfile & { user?: User; subjects?: Subject[]; services?: Service[] };
  className?: string;
}

type BookingStep = 'subject' | 'service' | 'time' | 'student' | 'mode' | 'notes' | 'confirm';

export function BookingWizard({ teacher, className }: BookingWizardProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { 
    setSelectedTeacher, 
    setSelectedSubject, 
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    setLessonMode,
    setStudentId,
    setNotes,
    selectedSubject,
    selectedService,
    selectedDate,
    selectedTime,
    lessonMode,
    studentId,
    notes,
    reset 
  } = useBookingStore();

  const [currentStep, setCurrentStep] = React.useState<BookingStep>('subject');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Mock children for parent users
  const mockChildren: ChildProfile[] = user?.role === 'parent' ? [
    {
      id: 'child_1',
      parent_user_id: user.id,
      child_user_id: 'user_child_1',
      full_name: 'يوسف عبدالله',
      age: 12,
      grade_level: 'الصف السادس',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'child_2',
      parent_user_id: user.id,
      child_user_id: 'user_child_2',
      full_name: 'سارة عبدالله',
      age: 10,
      grade_level: 'الصف الرابع',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] : [];

  // Initialize teacher in store
  React.useEffect(() => {
    setSelectedTeacher(teacher);
    return () => reset();
  }, [teacher, setSelectedTeacher, reset]);

  const steps: { key: BookingStep; label: string; completed: boolean }[] = [
    { key: 'subject', label: t('booking.selectSubject'), completed: !!selectedSubject },
    { key: 'service', label: t('booking.selectService'), completed: !!selectedService },
    { key: 'time', label: t('booking.selectTime'), completed: !!selectedDate && !!selectedTime },
    ...(user?.role === 'parent' ? [{ key: 'student' as BookingStep, label: t('booking.selectStudent'), completed: !!studentId }] : []),
    { key: 'mode', label: t('booking.selectMode'), completed: !!lessonMode },
    { key: 'notes', label: t('booking.addNotes'), completed: true }, // Notes are optional
    { key: 'confirm', label: t('booking.confirmBooking'), completed: false },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const canGoNext = steps[currentStepIndex]?.completed;
  const isLastStep = currentStep === 'confirm';

  const goToNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].key);
    }
  };

  const goToPrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].key);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // TODO: Real API call
      const bookingId = `BK${Date.now()}`;
      
      // Redirect to confirmation
      router.push(`/booking/confirmation?id=${bookingId}`);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock availability data
  const mockAvailability = [
    { day_of_week: 0, start_time: '16:00', end_time: '21:00' }, // Sunday
    { day_of_week: 1, start_time: '16:00', end_time: '21:00' }, // Monday
    { day_of_week: 2, start_time: '16:00', end_time: '21:00' }, // Tuesday
    { day_of_week: 3, start_time: '16:00', end_time: '21:00' }, // Wednesday
    { day_of_week: 4, start_time: '16:00', end_time: '21:00' }, // Thursday
    { day_of_week: 5, start_time: '10:00', end_time: '20:00' }, // Friday
    { day_of_week: 6, start_time: '10:00', end_time: '20:00' }, // Saturday
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 'subject':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              {t('booking.selectSubjectDescription')}
            </p>
            {teacher.subjects?.map((subject) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => setSelectedSubject(subject)}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-right',
                  selectedSubject?.id === subject.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
                )}
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {subject.name_ar}
                  </p>
                  <p className="text-sm text-gray-500">{subject.name_en}</p>
                </div>
                {selectedSubject?.id === subject.id && (
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      case 'service':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              {t('booking.selectServiceDescription')}
            </p>
            {teacher.services?.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-right',
                  selectedService?.id === service.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
                )}
              >
                <span className="text-2xl">{service.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {service.name_ar}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-1">{service.description_ar}</p>
                </div>
                {selectedService?.id === service.id && (
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      case 'time':
        return (
          <TimeSlotPicker
            teacherId={teacher.id}
            selectedDate={selectedDate ?? undefined}
            selectedTime={selectedTime ?? undefined}
            onSelect={(date, time) => {
              setSelectedDate(date);
              setSelectedTime(time);
            }}
            availability={mockAvailability}
            bookedSlots={[]}
            lessonDuration={teacher.lesson_duration}
          />
        );

      case 'student':
        return (
          <BookingChildSelector
            children={mockChildren}
            selectedChildId={studentId ?? undefined}
            onSelect={setStudentId}
            allowSelf={user?.role === 'student'}
            selfUser={user ?? undefined}
          />
        );

      case 'mode':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              {t('booking.selectModeDescription')}
            </p>
            
            {(teacher.lesson_mode === 'remote' || teacher.lesson_mode === 'both') && (
              <button
                type="button"
                onClick={() => setLessonMode('online')}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-right',
                  lessonMode === 'online'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {t('teachers.lessonModes.online')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('booking.onlineDescription')}
                  </p>
                </div>
                {lessonMode === 'online' && (
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )}

            {(teacher.lesson_mode === 'in_person' || teacher.lesson_mode === 'both') && (
              <button
                type="button"
                onClick={() => setLessonMode('in_person')}
                className={cn(
                  'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-right',
                  lessonMode === 'in_person'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {t('teachers.lessonModes.inPerson')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {teacher.service_area_text || t('booking.inPersonDescription')}
                  </p>
                </div>
                {lessonMode === 'in_person' && (
                  <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )}
          </div>
        );

      case 'notes':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {t('booking.notesDescription')}
            </p>
            <textarea
              value={notes || ''}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('booking.notesPlaceholder')}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-4">
            <BookingSummary
              teacher={teacher}
              subject={selectedSubject ?? undefined}
              service={selectedService ?? undefined}
              date={selectedDate ?? undefined}
              time={selectedTime ?? undefined}
              lessonMode={lessonMode ?? undefined}
              student={studentId ? mockChildren.find((c) => c.id === studentId) ?? (user ?? undefined) : (user ?? undefined)}
              studentType={studentId === 'self' ? 'self' : 'child'}
              notes={notes ?? undefined}
            />
            
            {!user && (
              <Card padding="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      {t('booking.loginRequired')}
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {t('booking.loginRequiredDescription')}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn('', className)}>
      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">
            {t('booking.step')} {currentStepIndex + 1} {t('booking.of')} {steps.length}
          </span>
          <span className="text-sm font-medium text-primary-600">
            {steps[currentStepIndex]?.label}
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-6">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {currentStepIndex > 0 && (
          <Button
            variant="outline"
            onClick={goToPrevious}
            className="flex-1"
          >
            {t('common.previous')}
          </Button>
        )}
        {isLastStep ? (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !user}
            className="flex-1"
          >
            {isSubmitting ? t('booking.processing') : user ? t('booking.confirmAndPay') : t('auth.login')}
          </Button>
        ) : (
          <Button
            onClick={goToNext}
            disabled={!canGoNext}
            className="flex-1"
          >
            {t('common.next')}
          </Button>
        )}
      </div>
    </div>
  );
}
