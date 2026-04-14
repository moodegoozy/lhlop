'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  Star,
  Video,
  MapPin,
  CheckCircle,
  Flame,
  Sparkles,
  Gift,
  Rocket,
  Heart,
  Gamepad2,
  Medal,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import type { Booking } from '@/types';

// Mock child stats - more fun and gamified
const mockChildStats = {
  stars_collected: 156,
  completed_lessons: 28,
  current_streak: 5,
  level: 7,
  xp: 2450,
  xp_to_next: 3000,
  badges_count: 8,
};

// Mock upcoming sessions
const mockUpcomingSessions: Booking[] = [
  {
    id: 'B001',
    teacher_user_id: 'U1',
    booked_by_user_id: 'P1',
    booked_for_type: 'child',
    booked_for_user_id: 'C1',
    subject_id: 'math',
    service_id: 'private_lesson',
    lesson_mode: 'remote',
    booking_date: '2024-01-20',
    start_time: '16:00',
    end_time: '17:00',
    duration_snapshot: 60,
    price_snapshot: 150,
    status: 'confirmed',
    notes: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    subject: {
      id: 'math',
      name_ar: 'الرياضيات',
      name_en: 'Mathematics',
      icon: '📐',
      is_active: true,
      sort_order: 1,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
  },
];

// Mock badges/achievements for kids
const mockBadges = [
  { id: '1', name: 'نجم الرياضيات', emoji: '⭐', color: 'bg-yellow-100', unlocked: true },
  { id: '2', name: 'قارئ ماهر', emoji: '📚', color: 'bg-blue-100', unlocked: true },
  { id: '3', name: 'مستكشف', emoji: '🔍', color: 'bg-green-100', unlocked: true },
  { id: '4', name: 'بطل الأسبوع', emoji: '🏆', color: 'bg-purple-100', unlocked: true },
  { id: '5', name: 'صاروخ التعلم', emoji: '🚀', color: 'bg-red-100', unlocked: false },
  { id: '6', name: 'عبقري', emoji: '🧠', color: 'bg-pink-100', unlocked: false },
];

// Mock subjects with fun icons
const mockSubjects = [
  { id: 'math', name: 'الرياضيات', emoji: '🔢', progress: 75, color: 'from-blue-400 to-blue-600' },
  { id: 'arabic', name: 'اللغة العربية', emoji: '📖', progress: 60, color: 'from-green-400 to-green-600' },
  { id: 'english', name: 'الإنجليزية', emoji: '🔤', progress: 45, color: 'from-purple-400 to-purple-600' },
  { id: 'science', name: 'العلوم', emoji: '🔬', progress: 80, color: 'from-orange-400 to-orange-600' },
];

export function ChildDashboard() {
  const { user } = useAuthStore();
  const progressPercentage = (mockChildStats.xp / mockChildStats.xp_to_next) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Fun Header */}
      <header className="bg-gradient-to-l from-violet-500 via-purple-500 to-indigo-500 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-10 text-4xl animate-bounce" style={{ animationDelay: '0s' }}>⭐</div>
          <div className="absolute top-8 right-20 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</div>
          <div className="absolute bottom-4 left-1/4 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 ring-4 ring-white/30">
                  <AvatarImage src={user?.avatar_url || undefined} />
                  <AvatarFallback className="bg-white/20 text-white text-xl">
                    {user?.full_name?.slice(0, 2) || '👋'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full px-2 py-0.5 text-xs font-bold">
                  Lv.{mockChildStats.level}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  أهلاً {user?.full_name || 'بطل'}! 🎉
                </h1>
                <p className="text-sm text-white/90 flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-300" />
                  {mockChildStats.current_streak} يوم متتالي! استمر! 💪
                </p>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 justify-end">
                <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                <span className="text-2xl font-bold">{mockChildStats.stars_collected}</span>
              </div>
              <p className="text-xs text-white/80">نجمة</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">المستوى {mockChildStats.level}</span>
              <span className="text-sm">{mockChildStats.xp} / {mockChildStats.xp_to_next} XP</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-l from-yellow-300 to-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-white/80 mt-1 text-center">
              {mockChildStats.xp_to_next - mockChildStats.xp} نقطة للمستوى التالي! 🚀
            </p>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        {/* Next Lesson Card - Big and Prominent for Kids */}
        {mockUpcomingSessions.length > 0 && (
          <Card className="bg-gradient-to-l from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5" />
                <span className="font-bold">الدرس القادم!</span>
              </div>
              {mockUpcomingSessions.slice(0, 1).map((session) => (
                <div key={session.id} className="flex items-center gap-4">
                  <div className="text-5xl">{session.subject?.icon || '📚'}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{session.subject?.name_ar}</h3>
                    <p className="text-white/90">مع {session.teacher?.user?.full_name}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                        <Clock className="h-4 w-4" />
                        {session.start_time}
                      </span>
                      {session.lesson_mode === 'remote' ? (
                        <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                          <Video className="h-4 w-4" />
                          أونلاين
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                          <MapPin className="h-4 w-4" />
                          حضوري
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-white/90 font-bold text-lg px-6"
                  >
                    🎮 ابدأ!
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Fun Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">⭐</div>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                {mockChildStats.stars_collected}
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">نجمة</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">✅</div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                {mockChildStats.completed_lessons}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">درس مكتمل</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">🔥</div>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                {mockChildStats.current_streak}
              </p>
              <p className="text-xs text-orange-600 dark:text-orange-400">أيام متتالية</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1">🏅</div>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {mockChildStats.badges_count}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">شارة</p>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-500" />
              تقدمي في المواد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {mockSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="text-3xl">{subject.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{subject.name}</span>
                      <span className="text-sm font-bold">{subject.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full bg-gradient-to-l', subject.color)}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges Collection */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              شاراتي 🏆
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {mockBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    'aspect-square rounded-2xl flex flex-col items-center justify-center p-2 transition-all',
                    badge.unlocked
                      ? `${badge.color} dark:bg-opacity-30 shadow-sm hover:scale-105`
                      : 'bg-gray-200 dark:bg-gray-800 opacity-50'
                  )}
                >
                  <div className={cn('text-3xl', !badge.unlocked && 'grayscale')}>
                    {badge.emoji}
                  </div>
                  <p className="text-xs font-medium text-center mt-1 line-clamp-1">
                    {badge.name}
                  </p>
                  {!badge.unlocked && (
                    <span className="text-xs text-gray-500">🔒</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fun Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="h-auto py-6 bg-gradient-to-l from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white flex flex-col gap-2"
          >
            <Rocket className="h-8 w-8" />
            <span className="text-lg font-bold">ابدأ درس جديد!</span>
          </Button>
          <Button 
            variant="outline"
            className="h-auto py-6 border-2 flex flex-col gap-2"
          >
            <Calendar className="h-8 w-8 text-blue-500" />
            <span className="text-lg font-bold">دروسي</span>
          </Button>
        </div>

        {/* Motivation Message */}
        <Card className="bg-gradient-to-l from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
              أنت رائع! استمر في التعلم!
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
              كل يوم تتعلم شيئاً جديداً تصبح أذكى! 🧠✨
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
