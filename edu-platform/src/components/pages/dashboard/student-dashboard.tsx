'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatsCard } from '@/components/cards/stats-card';
import { 
  Calendar,
  BookOpen,
  Trophy,
  Clock,
  Star,
  Bell,
  Settings,
  Video,
  MapPin,
  CheckCircle,
  TrendingUp,
  Target,
  Flame,
  Award,
  ChevronLeft,
  Search,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import type { Booking } from '@/types';

// Mock stats
const mockStats = {
  completed_sessions: 42,
  hours_learned: 63,
  current_streak: 5,
  average_rating_given: 4.8,
  favorite_subject: 'الرياضيات',
  achievements_count: 12,
};

// Mock upcoming sessions
const mockUpcomingSessions: Booking[] = [
  {
    id: 'B001',
    teacher_user_id: 'T1',
    booked_by_user_id: 'S1',
    booked_for_type: 'self',
    booked_for_user_id: 'S1',
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

// Mock achievements
const mockAchievements = [
  { id: '1', title: 'متعلم نشط', description: 'أكملت 10 حصص', icon: '🎯', unlocked: true },
  { id: '2', title: 'نجم الأسبوع', description: 'حافظت على 7 أيام متتالية', icon: '⭐', unlocked: true },
  { id: '3', title: 'مستكشف', description: 'جربت 3 مواد مختلفة', icon: '🔍', unlocked: true },
  { id: '4', title: 'محترف', description: 'أكملت 50 حصة', icon: '🏆', unlocked: false },
];

// Mock favorite teachers
const mockFavoriteTeachers = [
  { id: 'T1', name: 'محمد العلي', subject: 'الرياضيات', rating: 4.9, sessions: 15 },
  { id: 'T2', name: 'نورة الخالد', subject: 'اللغة الإنجليزية', rating: 4.8, sessions: 8 },
];

export function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-l from-primary-600 to-primary-500 text-white">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-white/30">
                <AvatarImage src={user?.avatar_url || undefined} />
                <AvatarFallback className="bg-white/20 text-white">
                  {user?.full_name?.slice(0, 2) || 'ط'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">
                  مرحباً، {user?.full_name || 'طالب'}! 👋
                </h1>
                <p className="text-sm text-white/80">
                  استمر في التعلم! لديك {mockStats.current_streak} أيام متتالية 🔥
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Streak Banner */}
          <div className="mt-4 bg-white/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Flame className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">سلسلة التعلم</p>
                <p className="text-sm text-white/80">{mockStats.current_streak} يوم متتالي</p>
              </div>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold">{mockStats.hours_learned}</p>
              <p className="text-xs text-white/80">ساعة تعلم</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8 space-y-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.completed_sessions}</p>
                  <p className="text-xs text-gray-500">حصة مكتملة</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.hours_learned}</p>
                  <p className="text-xs text-gray-500">ساعة تعلم</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.average_rating_given}</p>
                  <p className="text-xs text-gray-500">متوسط تقييمك</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.achievements_count}</p>
                  <p className="text-xs text-gray-500">إنجاز</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Session */}
        {mockUpcomingSessions.length > 0 && (
          <Card className="bg-gradient-to-l from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                الحصة القادمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockUpcomingSessions.slice(0, 1).map((session) => (
                <div key={session.id} className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={session.teacher?.user?.avatar_url || undefined} />
                    <AvatarFallback>
                      {session.teacher?.user?.full_name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {session.subject?.name_ar || 'درس'}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        اليوم، {session.start_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {session.duration_snapshot} دقيقة
                      </span>
                      {session.lesson_mode === 'remote' ? (
                        <Badge variant="secondary" className="gap-1">
                          <Video className="h-3 w-3" />
                          عن بعد
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <MapPin className="h-3 w-3" />
                          حضوري
                        </Badge>
                      )}
                    </div>
                  </div>
                  {session.lesson_mode === 'remote' && (
                    <Button className="gap-2">
                      <Play className="h-4 w-4" />
                      انضم الآن
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Achievements */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                الإنجازات
              </CardTitle>
              <Button variant="link" size="sm">
                عرض الكل
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      'p-4 rounded-xl text-center transition-all',
                      achievement.unlocked
                        ? 'bg-gradient-to-b from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-100 dark:bg-gray-800 opacity-60'
                    )}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                    {achievement.unlocked && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        مفتوح ✓
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Teachers */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">معلموك المفضلون</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockFavoriteTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Avatar>
                    <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{teacher.name}</p>
                    <p className="text-xs text-gray-500">{teacher.subject}</p>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{teacher.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{teacher.sessions} حصة</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                <Search className="h-4 w-4 ml-2" />
                البحث عن معلمين
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Search className="h-6 w-6 text-primary-500" />
            <span>البحث عن معلم</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Calendar className="h-6 w-6 text-primary-500" />
            <span>حجوزاتي</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <BookOpen className="h-6 w-6 text-primary-500" />
            <span>سجل الدروس</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
            <Target className="h-6 w-6 text-primary-500" />
            <span>أهدافي</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
