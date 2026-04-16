'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { DashboardShell, PageTitle, ContentCard } from '@/components/dashboard';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquare,
  Heart,
  MessageCircle,
  Share2,
  BookOpen,
  Trophy,
  HelpCircle,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  Eye,
  Clock,
  ChevronLeft,
  Send,
  X,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';

// Mock forum posts
const mockPosts = [
  {
    id: '1',
    author: {
      name: 'محمد الأحمد',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      badge: 'متعلم نشط',
    },
    category: 'question',
    title: 'كيف أستعد لاختبار الرياضيات؟',
    content: 'السلام عليكم، عندي اختبار رياضيات قريب وأبغى نصائح للاستعداد. تحديداً في المعادلات التفاضلية.',
    likes: 24,
    comments: 12,
    views: 156,
    createdAt: '2024-01-25T10:30:00',
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: 'سارة القحطاني',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      badge: 'خبير',
    },
    category: 'tip',
    title: 'نصيحة: طريقة فعالة لحفظ المفردات الإنجليزية',
    content: 'جربت طريقة البطاقات التعليمية مع التكرار المتباعد وفعلاً ساعدتني كثير. أنصح الكل يجربها!',
    likes: 89,
    comments: 34,
    views: 420,
    createdAt: '2024-01-24T15:20:00',
    isLiked: true,
  },
  {
    id: '3',
    author: {
      name: 'خالد العتيبي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
      badge: 'مشارك جديد',
    },
    category: 'discussion',
    title: 'ما أفضل وقت للدراسة؟',
    content: 'أنا أفضل الدراسة بعد الفجر، أحس ذهني صافي. وش أفضل وقت عندكم؟',
    likes: 45,
    comments: 67,
    views: 230,
    createdAt: '2024-01-24T08:00:00',
    isLiked: false,
  },
  {
    id: '4',
    author: {
      name: 'نورة الحربي',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
      badge: 'متميز',
    },
    category: 'achievement',
    title: 'الحمدلله جبت 98% في الكيمياء! 🎉',
    content: 'شكر خاص للأستاذ أحمد اللي ساعدني وما قصر. المنصة هذي غيرت مستواي الدراسي!',
    likes: 156,
    comments: 45,
    views: 890,
    createdAt: '2024-01-23T18:45:00',
    isLiked: true,
  },
];

const categoryConfig = {
  question: {
    label: 'سؤال',
    icon: HelpCircle,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  tip: {
    label: 'نصيحة',
    icon: Sparkles,
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  discussion: {
    label: 'نقاش',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  achievement: {
    label: 'إنجاز',
    icon: Trophy,
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
};

export default function ForumPage() {
  const [filter, setFilter] = React.useState<string>('all');
  const [showNewPost, setShowNewPost] = React.useState(false);
  const [posts, setPosts] = React.useState(mockPosts);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  return (
    <DashboardShell>
      <PageTitle
        title="مجتمع الطلاب"
        description="شارك، تعلم، وتواصل مع زملائك"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <ContentCard className="text-center">
          <MessageSquare className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">منشور</p>
        </ContentCard>
        <ContentCard className="text-center">
          <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {posts.reduce((sum, p) => sum + p.comments, 0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">تعليق</p>
        </ContentCard>
        <ContentCard className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {posts.reduce((sum, p) => sum + p.likes, 0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">إعجاب</p>
        </ContentCard>
        <ContentCard className="text-center">
          <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(posts.reduce((sum, p) => sum + p.views, 0) / 1000).toFixed(1)}K
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">مشاهدة</p>
        </ContentCard>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في المجتمع..."
            className="w-full pr-12 pl-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              filter === 'all'
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-300'
            )}
          >
            الكل
          </button>
          {Object.entries(categoryConfig).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2',
                filter === key
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary-300'
              )}
            >
              <value.icon className="w-4 h-4" />
              {value.label}
            </button>
          ))}
        </div>

        {/* New Post */}
        <button
          onClick={() => setShowNewPost(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-primary-500/25"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">منشور جديد</span>
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const category = categoryConfig[post.category as keyof typeof categoryConfig];
          return (
            <ContentCard key={post.id} className="hover:shadow-lg transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {post.author.name}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {post.author.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString('ar-SA', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
                <Badge className={category.color}>
                  <category.icon className="w-3 h-3 ml-1" />
                  {category.label}
                </Badge>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      'flex items-center gap-1.5 text-sm transition-colors',
                      post.isLiked
                        ? 'text-red-500'
                        : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                    )}
                  >
                    <Heart
                      className={cn('w-5 h-5', post.isLiked && 'fill-current')}
                    />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    {post.comments}
                  </button>
                  <span className="flex items-center gap-1.5 text-sm text-gray-400">
                    <Eye className="w-4 h-4" />
                    {post.views}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </ContentCard>
          );
        })}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowNewPost(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  منشور جديد
                </h3>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    التصنيف
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(categoryConfig).map(([key, value]) => (
                      <button
                        key={key}
                        className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                      >
                        <value.icon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {value.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    placeholder="اكتب عنوان المنشور..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    المحتوى
                  </label>
                  <textarea
                    rows={5}
                    placeholder="شارك أفكارك مع المجتمع..."
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* Attachments */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <ImageIcon className="w-4 h-4" />
                    إضافة صورة
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  إلغاء
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors">
                  <Send className="w-4 h-4" />
                  نشر
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
