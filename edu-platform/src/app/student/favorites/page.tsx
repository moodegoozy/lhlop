'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Star, 
  BookOpen, 
  Clock, 
  ChevronLeft,
  MapPin,
  MessageCircle,
  Calendar,
  Trash2
} from 'lucide-react';

// Mock favorite teachers
const mockFavoriteTeachers = [
  {
    id: '1',
    name: 'أ. محمد الأحمد',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    subjects: ['الرياضيات', 'الفيزياء'],
    rating: 4.9,
    reviewsCount: 128,
    hourlyRate: 120,
    city: 'الرياض',
    lessonsCompleted: 15,
    isOnline: true,
    experience: '8 سنوات',
  },
  {
    id: '2',
    name: 'أ. سارة القحطاني',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2',
    subjects: ['اللغة الإنجليزية'],
    rating: 4.8,
    reviewsCount: 95,
    hourlyRate: 100,
    city: 'جدة',
    lessonsCompleted: 8,
    isOnline: false,
    experience: '5 سنوات',
  },
  {
    id: '3',
    name: 'أ. خالد العتيبي',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3',
    subjects: ['الكيمياء', 'الأحياء'],
    rating: 4.7,
    reviewsCount: 67,
    hourlyRate: 110,
    city: 'الدمام',
    lessonsCompleted: 12,
    isOnline: true,
    experience: '6 سنوات',
  },
  {
    id: '4',
    name: 'أ. نورة الحربي',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher4',
    subjects: ['اللغة العربية', 'التربية الإسلامية'],
    rating: 5.0,
    reviewsCount: 156,
    hourlyRate: 90,
    city: 'الرياض',
    lessonsCompleted: 20,
    isOnline: true,
    experience: '10 سنوات',
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = React.useState(mockFavoriteTeachers);

  const handleRemove = (teacherId: string) => {
    setFavorites((prev) => prev.filter((t) => t.id !== teacherId));
  };

  return (
    <DashboardShell>
      <PageTitle
        title="المعلمون المفضلون"
        description="قائمة المعلمين الذين أضفتهم للمفضلة"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ContentCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{favorites.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">معلم مفضل</p>
        </ContentCard>

        <ContentCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {favorites.reduce((sum, t) => sum + t.lessonsCompleted, 0)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">حصة مكتملة</p>
        </ContentCard>

        <ContentCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Star className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(favorites.reduce((sum, t) => sum + t.rating, 0) / favorites.length).toFixed(1)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">متوسط التقييم</p>
        </ContentCard>

        <ContentCard className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {favorites.filter((t) => t.isOnline).length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">متصل الآن</p>
        </ContentCard>
      </div>

      {/* Teachers Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((teacher) => (
            <ContentCard
              key={teacher.id}
              className="hover:shadow-lg transition-all group"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <Avatar className="w-20 h-20 border-2 border-gray-100 dark:border-gray-700">
                    <AvatarImage src={teacher.avatar} />
                    <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {teacher.isOnline && (
                    <span className="absolute bottom-1 left-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {teacher.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5" />
                        {teacher.city}
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        {teacher.experience}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(teacher.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {teacher.subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {teacher.rating}
                      </span>
                      <span className="text-gray-400">({teacher.reviewsCount})</span>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {teacher.lessonsCompleted} حصة معك
                    </div>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-lg font-bold text-primary-500">
                      {teacher.hourlyRate} ر.س
                      <span className="text-xs font-normal text-gray-400 mr-1">/ساعة</span>
                    </p>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors">
                        <Calendar className="w-4 h-4" />
                        حجز
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      ) : (
        <ContentCard className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            لا يوجد معلمون مفضلون
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            أضف معلمين للمفضلة للوصول إليهم بسرعة
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors">
            تصفح المعلمين
            <ChevronLeft className="w-4 h-4" />
          </button>
        </ContentCard>
      )}
    </DashboardShell>
  );
}
