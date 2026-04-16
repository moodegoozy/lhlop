'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Lock, Star, Award, Target, Flame, Zap, Medal, Crown, Sparkles } from 'lucide-react';

// Mock achievements
const mockAchievements = [
  {
    id: '1',
    title: 'البداية المشرقة',
    description: 'أكمل حصتك الأولى',
    icon: '🌟',
    category: 'learning',
    progress: 100,
    maxProgress: 100,
    unlocked: true,
    unlockedAt: '2024-01-10',
    reward: 'شارة البداية',
  },
  {
    id: '2',
    title: 'متعلم نشط',
    description: 'أكمل 10 حصص',
    icon: '🎯',
    category: 'learning',
    progress: 8,
    maxProgress: 10,
    unlocked: false,
    reward: '50 ر.س رصيد',
  },
  {
    id: '3',
    title: 'نجم الأسبوع',
    description: 'حافظ على 7 أيام متتالية من التعلم',
    icon: '⭐',
    category: 'engagement',
    progress: 5,
    maxProgress: 7,
    unlocked: false,
    reward: 'شارة النجم',
  },
  {
    id: '4',
    title: 'مستكشف المواد',
    description: 'تعلم 5 مواد مختلفة',
    icon: '🔍',
    category: 'learning',
    progress: 5,
    maxProgress: 5,
    unlocked: true,
    unlockedAt: '2024-01-15',
    reward: 'شارة المستكشف',
  },
  {
    id: '5',
    title: 'محترف',
    description: 'أكمل 50 حصة',
    icon: '🏆',
    category: 'learning',
    progress: 42,
    maxProgress: 50,
    unlocked: false,
    reward: '100 ر.س رصيد',
  },
  {
    id: '6',
    title: 'سفير المنصة',
    description: 'ادعُ 5 أصدقاء للانضمام',
    icon: '🤝',
    category: 'social',
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    reward: '200 ر.س رصيد',
  },
  {
    id: '7',
    title: 'المواظب',
    description: 'حافظ على 30 يوم متتالي',
    icon: '🔥',
    category: 'engagement',
    progress: 5,
    maxProgress: 30,
    unlocked: false,
    reward: 'شارة الذهبية',
  },
  {
    id: '8',
    title: 'المقيّم المتميز',
    description: 'قيّم 10 معلمين',
    icon: '⭐',
    category: 'social',
    progress: 4,
    maxProgress: 10,
    unlocked: false,
    reward: 'شارة المقيّم',
  },
];

const categoryLabels: Record<string, string> = {
  learning: 'التعلم',
  engagement: 'المواظبة',
  social: 'التواصل',
  special: 'خاصة',
};

const categoryColors: Record<string, string> = {
  learning: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  engagement: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  social: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  special: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function AchievementsPage() {
  const [filter, setFilter] = React.useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = mockAchievements.filter((a) => a.unlocked).length;
  const totalProgress = Math.round(
    (mockAchievements.reduce((sum, a) => sum + (a.unlocked ? 100 : (a.progress / a.maxProgress) * 100), 0) /
      mockAchievements.length)
  );

  const filteredAchievements = mockAchievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  return (
    <DashboardShell>
      <PageTitle
        title="الإنجازات"
        description="تتبع تقدمك واحصل على المكافآت"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ContentCard className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">الإنجازات المفتوحة</p>
              <p className="text-3xl font-bold mt-1">{unlockedCount}/{mockAchievements.length}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Trophy className="w-7 h-7" />
            </div>
          </div>
        </ContentCard>

        <ContentCard className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">التقدم الإجمالي</p>
              <p className="text-3xl font-bold mt-1">{totalProgress}%</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Target className="w-7 h-7" />
            </div>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </ContentCard>

        <ContentCard className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">سلسلة التعلم</p>
              <p className="text-3xl font-bold mt-1">5 أيام</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <Flame className="w-7 h-7" />
            </div>
          </div>
        </ContentCard>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'unlocked', 'locked'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              filter === f
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {f === 'all' && 'الكل'}
            {f === 'unlocked' && 'مفتوحة'}
            {f === 'locked' && 'مقفلة'}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <ContentCard
            key={achievement.id}
            className={cn(
              'relative overflow-hidden transition-all',
              !achievement.unlocked && 'opacity-75'
            )}
          >
            {/* Unlocked Glow */}
            {achievement.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
            )}

            <div className="relative">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={cn(
                    'text-4xl w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
                    achievement.unlocked
                      ? 'bg-amber-100 dark:bg-amber-900/30'
                      : 'bg-gray-100 dark:bg-gray-800 grayscale'
                  )}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    {achievement.unlocked && (
                      <Sparkles className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-gray-500 dark:text-gray-400">التقدم</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      achievement.unlocked
                        ? 'bg-gradient-to-l from-amber-400 to-amber-500'
                        : 'bg-gradient-to-l from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500'
                    )}
                    style={{
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={categoryColors[achievement.category]}>
                  {categoryLabels[achievement.category]}
                </Badge>
                
                <div className="flex items-center gap-2">
                  {achievement.unlocked ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <Award className="w-3 h-3 ml-1" />
                      {achievement.reward}
                    </Badge>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Lock className="w-3 h-3" />
                      {achievement.reward}
                    </span>
                  )}
                </div>
              </div>

              {/* Unlocked Date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
                  تم الفتح في {new Date(achievement.unlockedAt).toLocaleDateString('ar-SA')}
                </p>
              )}
            </div>
          </ContentCard>
        ))}
      </div>
    </DashboardShell>
  );
}
