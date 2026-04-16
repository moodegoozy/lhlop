'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  DashboardShell,
  PageTitle,
  ContentCard,
  StatsGrid,
  StatCard,
  StatCardLarge,
  LessonCard,
  LessonCardCompact,
  QuickActionsScroll,
} from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  Star,
  Video,
  CheckCircle,
  Flame,
  TrendingUp,
  ChevronLeft,
  Wallet,
  Plus,
  ArrowUpRight,
} from 'lucide-react';

// Mock data
const mockStats = {
  upcoming_lessons: 3,
  completed_lessons: 42,
  wallet_balance: 500,
  achievements_progress: 75,
  current_streak: 5,
  hours_learned: 63,
};

const mockUpcomingLessons = [
  {
    id: '1',
    teacherName: 'أ. محمد العلي',
    teacherAvatar: '',
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
    teacherAvatar: '',
    teacherRating: 4.8,
    subject: 'اللغة الإنجليزية',
    subjectIcon: '🇬🇧',
    date: '2024-01-21',
    startTime: '18:00',
    endTime: '19:00',
    mode: 'remote' as const,
    status: 'upcoming' as const,
  },
];

const mockRecentLessons = [
  {
    id: '3',
    teacherName: 'أ. فهد السعيد',
    subject: 'الفيزياء',
    subjectIcon: '⚛️',
    date: '2024-01-18',
    startTime: '14:00',
    endTime: '15:00',
    mode: 'remote' as const,
    status: 'completed' as const,
  },
  {
    id: '4',
    teacherName: 'أ. محمد العلي',
    subject: 'الرياضيات',
    subjectIcon: '📐',
    date: '2024-01-16',
    startTime: '16:00',
    endTime: '17:00',
    mode: 'in_person' as const,
    status: 'completed' as const,
  },
];

const mockAchievements = [
  { id: '1', title: 'متعلم نشط', icon: '🎯', progress: 80 },
  { id: '2', title: 'نجم الأسبوع', icon: '⭐', progress: 71 },
  { id: '3', title: 'محترف', icon: '🏆', progress: 84 },
];

const mockFavoriteTeachers = [
  { id: 'T1', name: 'محمد العلي', subject: 'الرياضيات', rating: 4.9, lessons: 15 },
  { id: 'T2', name: 'نورة الخالد', subject: 'الإنجليزية', rating: 4.8, lessons: 8 },
  { id: 'T3', name: 'فهد السعيد', subject: 'الفيزياء', rating: 4.7, lessons: 5 },
];

export function StudentDashboardContent() {
  return (
    <DashboardShell>
      {/* Welcome Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              مرحباً، أحمد! 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              استمر في التعلم! لديك {mockStats.current_streak} أيام متتالية 🔥
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/booking">
              <Button className="shadow-lg shadow-primary-500/25">
                <Plus className="w-4 h-4 ml-2" />
                حجز حصة جديدة
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile */}
      <div className="md:hidden mb-6">
        <QuickActionsScroll />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Featured Stat Card */}
        <StatCardLarge
          title="سلسلة التعلم"
          value={`${mockStats.current_streak} يوم`}
          icon={<Flame className="w-6 h-6" />}
          description={`${mockStats.hours_learned} ساعة تعلم إجمالية`}
          progress={mockStats.achievements_progress}
          className="md:col-span-1"
        />

        {/* Regular Stats */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            title="الحصص القادمة"
            value={mockStats.upcoming_lessons}
            icon={<Calendar className="w-5 h-5" />}
            iconColor="blue"
          />
          <StatCard
            title="الحصص المكتملة"
            value={mockStats.completed_lessons}
            icon={<CheckCircle className="w-5 h-5" />}
            iconColor="green"
            trend={{ value: 12, label: 'هذا الشهر' }}
          />
          <StatCard
            title="رصيد المحفظة"
            value={`${mockStats.wallet_balance} ر.س`}
            icon={<Wallet className="w-5 h-5" />}
            iconColor="amber"
            className="col-span-2 md:col-span-1"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Lessons - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Lessons */}
          <ContentCard
            title="الحصص القادمة"
            actions={
              <Link href="/student/lessons">
                <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400">
                  عرض الكل
                  <ChevronLeft className="w-4 h-4 mr-1 rtl:rotate-180" />
                </Button>
              </Link>
            }
          >
            {mockUpcomingLessons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockUpcomingLessons.map((lesson) => (
                  <LessonCard key={lesson.id} {...lesson} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  لا توجد حصص قادمة
                </p>
                <Link href="/booking">
                  <Button>احجز حصتك الأولى</Button>
                </Link>
              </div>
            )}
          </ContentCard>

          {/* Recent Lessons */}
          <ContentCard
            title="آخر الحصص"
            actions={
              <Link href="/student/lessons?tab=past">
                <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400">
                  السجل الكامل
                  <ChevronLeft className="w-4 h-4 mr-1 rtl:rotate-180" />
                </Button>
              </Link>
            }
          >
            <div className="space-y-3">
              {mockRecentLessons.map((lesson) => (
                <LessonCardCompact key={lesson.id} {...lesson} />
              ))}
            </div>
          </ContentCard>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Achievements Progress */}
          <ContentCard title="الإنجازات">
            <div className="space-y-4">
              {mockAchievements.map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {achievement.title}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                      {achievement.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-primary-500 to-primary-400 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/achievements" className="block mt-4">
              <Button variant="secondary" fullWidth size="sm">
                <Trophy className="w-4 h-4 ml-2" />
                عرض جميع الإنجازات
              </Button>
            </Link>
          </ContentCard>

          {/* Favorite Teachers */}
          <ContentCard title="المعلمون المفضلون">
            <div className="space-y-3">
              {mockFavoriteTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-semibold">
                      {teacher.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                      {teacher.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {teacher.subject} • {teacher.lessons} حصة
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {teacher.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/student/favorites" className="block mt-4">
              <Button variant="secondary" fullWidth size="sm">
                عرض الكل
              </Button>
            </Link>
          </ContentCard>

          {/* Referral Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-5 text-white">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="text-3xl mb-2">🎁</div>
              <h3 className="font-bold text-lg mb-1">ادعُ صديقًا</h3>
              <p className="text-sm text-white/80 mb-4">
                احصل على 50 ر.س لكل صديق يسجل ويحجز أول حصة
              </p>
              <Link href="/student/affiliate">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  شارك الآن
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
