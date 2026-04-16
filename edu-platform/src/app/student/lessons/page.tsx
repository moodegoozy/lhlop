'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard, LessonCard, EmptyState } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Video, Clock, Download, Search, Filter, Play } from 'lucide-react';
import Link from 'next/link';

// Mock lessons data
const mockUpcomingLessons = [
  {
    id: '1',
    teacherName: 'أ. محمد العلي',
    teacherRating: 4.9,
    subject: 'الرياضيات',
    subjectIcon: '📐',
    date: '2024-01-20',
    startTime: '16:00',
    endTime: '17:00',
    mode: 'remote' as const,
    status: 'upcoming' as const,
  },
  {
    id: '2',
    teacherName: 'أ. نورة الخالد',
    teacherRating: 4.8,
    subject: 'اللغة الإنجليزية',
    subjectIcon: '🇬🇧',
    date: '2024-01-21',
    startTime: '18:00',
    endTime: '19:00',
    mode: 'remote' as const,
    status: 'upcoming' as const,
  },
  {
    id: '3',
    teacherName: 'أ. فهد السعيد',
    teacherRating: 4.7,
    subject: 'الفيزياء',
    subjectIcon: '⚛️',
    date: '2024-01-22',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'in_person' as const,
    status: 'upcoming' as const,
  },
];

const mockPastLessons = [
  {
    id: '4',
    teacherName: 'أ. محمد العلي',
    teacherRating: 4.9,
    subject: 'الرياضيات',
    subjectIcon: '📐',
    date: '2024-01-18',
    startTime: '16:00',
    endTime: '17:00',
    mode: 'remote' as const,
    status: 'completed' as const,
    recordingUrl: '/recordings/1',
  },
  {
    id: '5',
    teacherName: 'أ. نورة الخالد',
    teacherRating: 4.8,
    subject: 'اللغة الإنجليزية',
    subjectIcon: '🇬🇧',
    date: '2024-01-16',
    startTime: '18:00',
    endTime: '19:00',
    mode: 'remote' as const,
    status: 'completed' as const,
    recordingUrl: '/recordings/2',
  },
  {
    id: '6',
    teacherName: 'أ. فهد السعيد',
    teacherRating: 4.7,
    subject: 'الفيزياء',
    subjectIcon: '⚛️',
    date: '2024-01-14',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'remote' as const,
    status: 'completed' as const,
  },
  {
    id: '7',
    teacherName: 'أ. سارة الحمد',
    teacherRating: 4.6,
    subject: 'الكيمياء',
    subjectIcon: '🧪',
    date: '2024-01-12',
    startTime: '10:00',
    endTime: '11:00',
    mode: 'in_person' as const,
    status: 'completed' as const,
  },
];

const mockCancelledLessons = [
  {
    id: '8',
    teacherName: 'أ. عبدالله الفهد',
    subject: 'الأحياء',
    subjectIcon: '🧬',
    date: '2024-01-15',
    startTime: '12:00',
    endTime: '13:00',
    mode: 'remote' as const,
    status: 'cancelled' as const,
  },
];

export default function LessonsPage() {
  const [activeTab, setActiveTab] = React.useState('upcoming');
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <DashboardShell>
      <PageTitle
        title="حصصي"
        description="إدارة حصصك القادمة والسابقة"
        actions={
          <Link href="/booking">
            <Button>
              <Calendar className="w-4 h-4 ml-2" />
              حجز حصة جديدة
            </Button>
          </Link>
        }
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن حصة أو معلم..."
            className={cn(
              'w-full h-11 pr-10 pl-4 rounded-xl',
              'bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800',
              'text-sm text-gray-900 dark:text-white placeholder:text-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
              'transition-all duration-200'
            )}
          />
        </div>
        <Button variant="secondary" className="shrink-0">
          <Filter className="w-4 h-4 ml-2" />
          تصفية
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="upcoming"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-lg py-2.5"
          >
            <Calendar className="w-4 h-4 ml-2" />
            القادمة ({mockUpcomingLessons.length})
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-lg py-2.5"
          >
            <Clock className="w-4 h-4 ml-2" />
            السابقة ({mockPastLessons.length})
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm rounded-lg py-2.5"
          >
            الملغاة ({mockCancelledLessons.length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Lessons */}
        <TabsContent value="upcoming" className="mt-0">
          {mockUpcomingLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockUpcomingLessons.map((lesson) => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Calendar className="w-8 h-8 text-gray-400" />}
              title="لا توجد حصص قادمة"
              description="احجز حصتك القادمة الآن مع أفضل المعلمين"
              action={
                <Link href="/booking">
                  <Button>احجز حصة الآن</Button>
                </Link>
              }
            />
          )}
        </TabsContent>

        {/* Past Lessons */}
        <TabsContent value="past" className="mt-0">
          {mockPastLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPastLessons.map((lesson) => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Clock className="w-8 h-8 text-gray-400" />}
              title="لا توجد حصص سابقة"
              description="ستظهر هنا الحصص التي أكملتها"
            />
          )}
        </TabsContent>

        {/* Cancelled Lessons */}
        <TabsContent value="cancelled" className="mt-0">
          {mockCancelledLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCancelledLessons.map((lesson) => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Calendar className="w-8 h-8 text-gray-400" />}
              title="لا توجد حصص ملغاة"
              description="الحصص الملغاة ستظهر هنا"
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Recordings Section */}
      {activeTab === 'past' && mockPastLessons.some((l) => l.recordingUrl) && (
        <ContentCard title="التسجيلات المتاحة" className="mt-8">
          <div className="space-y-3">
            {mockPastLessons
              .filter((l) => l.recordingUrl)
              .map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {lesson.subject} - {lesson.teacherName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(lesson.date).toLocaleDateString('ar-SA')} • {lesson.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      <Play className="w-4 h-4 ml-1" />
                      مشاهدة
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </ContentCard>
      )}
    </DashboardShell>
  );
}
