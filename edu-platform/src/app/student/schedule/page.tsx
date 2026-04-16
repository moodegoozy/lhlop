'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, LessonCardCompact } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Video,
  MapPin,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

// Mock calendar data
const mockLessonsByDate: Record<string, Array<{
  id: string;
  teacherName: string;
  subject: string;
  subjectIcon: string;
  startTime: string;
  endTime: string;
  mode: 'remote' | 'in_person';
  status: 'upcoming' | 'completed' | 'live';
}>> = {
  '2024-01-20': [
    {
      id: '1',
      teacherName: 'أ. محمد العلي',
      subject: 'الرياضيات',
      subjectIcon: '📐',
      startTime: '16:00',
      endTime: '17:00',
      mode: 'remote',
      status: 'upcoming',
    },
  ],
  '2024-01-21': [
    {
      id: '2',
      teacherName: 'أ. نورة الخالد',
      subject: 'اللغة الإنجليزية',
      subjectIcon: '🇬🇧',
      startTime: '18:00',
      endTime: '19:00',
      mode: 'remote',
      status: 'upcoming',
    },
  ],
  '2024-01-22': [
    {
      id: '3',
      teacherName: 'أ. فهد السعيد',
      subject: 'الفيزياء',
      subjectIcon: '⚛️',
      startTime: '14:00',
      endTime: '15:00',
      mode: 'in_person',
      status: 'upcoming',
    },
    {
      id: '4',
      teacherName: 'أ. سارة الحمد',
      subject: 'الكيمياء',
      subjectIcon: '🧪',
      startTime: '17:00',
      endTime: '18:00',
      mode: 'remote',
      status: 'upcoming',
    },
  ],
  '2024-01-18': [
    {
      id: '5',
      teacherName: 'أ. محمد العلي',
      subject: 'الرياضيات',
      subjectIcon: '📐',
      startTime: '16:00',
      endTime: '17:00',
      mode: 'remote',
      status: 'completed',
    },
  ],
};

const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 0, 20)); // January 2024
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date(2024, 0, 20));
  const [view, setView] = React.useState<'month' | 'week'>('month');

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // Generate calendar days
  const calendarDays: (Date | null)[] = [];
  
  // Add empty slots for days before first day of month
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  const formatDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };

  const selectedDateLessons = selectedDate
    ? mockLessonsByDate[formatDateKey(selectedDate)] || []
    : [];

  const monthName = currentDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' });

  return (
    <DashboardShell>
      <PageTitle
        title="الجدول الدراسي"
        description="عرض وإدارة جدول حصصك"
        actions={
          <Link href="/booking">
            <Button>
              <Plus className="w-4 h-4 ml-2" />
              حجز حصة
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <ContentCard className="lg:col-span-2" noPadding>
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={goToPrevMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white min-w-[150px] text-center">
                {monthName}
              </h2>
              <Button variant="ghost" size="icon-sm" onClick={goToNextMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={goToToday}>
                اليوم
              </Button>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setView('month')}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors',
                    view === 'month'
                      ? 'bg-white dark:bg-gray-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  شهر
                </button>
                <button
                  onClick={() => setView('week')}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-colors',
                    view === 'week'
                      ? 'bg-white dark:bg-gray-700 shadow-sm font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  أسبوع
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Days of week header */}
            <div className="grid grid-cols-7 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateKey = formatDateKey(date);
                const lessons = mockLessonsByDate[dateKey] || [];
                const hasLessons = lessons.length > 0;
                const isSelected = selectedDate && formatDateKey(selectedDate) === dateKey;
                const isToday = formatDateKey(new Date()) === dateKey;
                const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      'aspect-square p-1 rounded-xl transition-all duration-200',
                      'flex flex-col items-center justify-center gap-1',
                      'hover:bg-gray-100 dark:hover:bg-gray-800',
                      isSelected && 'bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500',
                      isToday && !isSelected && 'bg-primary-100 dark:bg-primary-900/30',
                      isPast && 'opacity-50'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isSelected
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {date.getDate()}
                    </span>
                    {hasLessons && (
                      <div className="flex gap-0.5">
                        {lessons.slice(0, 3).map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              lessons[i].status === 'completed'
                                ? 'bg-gray-400'
                                : 'bg-primary-500'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              <span>حصة قادمة</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              <span>حصة مكتملة</span>
            </div>
          </div>
        </ContentCard>

        {/* Selected Date Details */}
        <ContentCard
          title={
            selectedDate
              ? selectedDate.toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })
              : 'اختر يوماً'
          }
        >
          {selectedDate ? (
            selectedDateLessons.length > 0 ? (
              <div className="space-y-3">
                {selectedDateLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={cn(
                      'p-3 rounded-xl border transition-colors',
                      lesson.status === 'completed'
                        ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-800'
                        : 'bg-primary-50 dark:bg-primary-900/10 border-primary-200 dark:border-primary-800/50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{lesson.subjectIcon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {lesson.subject}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {lesson.teacherName}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {lesson.startTime} - {lesson.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            {lesson.mode === 'remote' ? (
                              <>
                                <Video className="w-3.5 h-3.5" />
                                أونلاين
                              </>
                            ) : (
                              <>
                                <MapPin className="w-3.5 h-3.5" />
                                حضوري
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          lesson.status === 'completed'
                            ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        )}
                      >
                        {lesson.status === 'completed' ? 'مكتملة' : 'قادمة'}
                      </Badge>
                    </div>
                    {lesson.status !== 'completed' && (
                      <Button size="sm" className="w-full mt-3">
                        <Video className="w-4 h-4 ml-2" />
                        انضم للحصة
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  لا توجد حصص في هذا اليوم
                </p>
                <Link href="/booking">
                  <Button size="sm">احجز حصة</Button>
                </Link>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              اختر يوماً من التقويم لعرض الحصص
            </div>
          )}
        </ContentCard>
      </div>
    </DashboardShell>
  );
}
