'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { mockBookings, mockTeacherProfiles } from '@/data/mock';
import ThemeToggle from '@/components/ThemeToggle';

export function TeacherDashboard() {
  const teacher = mockTeacherProfiles[0];
  const myBookings = mockBookings.filter(b => b.teacher_user_id === teacher?.user_id);

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: '📊' },
    { id: 'bookings', label: 'حجوزاتي', icon: '📅' },
    { id: 'schedule', label: 'جدولي', icon: '🕐' },
    { id: 'reviews', label: 'التقييمات', icon: '⭐' },
    { id: 'earnings', label: 'الأرباح', icon: '💰' },
    { id: 'profile', label: 'ملفي', icon: '👤' },
  ];

  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-screen w-64 border-l hidden lg:block" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="p-6">
          <Link href={ROUTES.HOME}>
            <h1 
              className="text-2xl font-bold mb-8"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              لهلوب
            </h1>
          </Link>

          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 font-semibold' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
              {teacher?.user?.full_name?.charAt(0) || 'م'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{teacher?.user?.full_name || 'معلم'}</p>
              <p className="text-xs text-gray-500">معلم</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <main className="lg:mr-64 p-6 lg:p-8">
        {/* Welcome Section */}
        <div 
          className="rounded-3xl p-8 mb-8"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">مرحباً {teacher?.user?.full_name || 'معلم'} 👋</h1>
              <p className="text-white/80">لديك {myBookings.filter(b => b.status === 'pending').length} حجوزات بانتظار التأكيد</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">{teacher?.average_rating || 0}</p>
                <p className="text-sm text-white/80">تقييمك ⭐</p>
              </div>
              <div className="text-center px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <p className="text-3xl font-bold text-white">{teacher?.total_reviews || 0}</p>
                <p className="text-sm text-white/80">تقييم</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <p className="text-sm text-gray-500">الحجوزات</p>
                <p className="text-2xl font-bold">{myBookings.length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-xl">
                ✅
              </div>
              <div>
                <p className="text-sm text-gray-500">مكتملة</p>
                <p className="text-2xl font-bold">{myBookings.filter(b => b.status === 'completed').length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <p className="text-sm text-gray-500">الأرباح</p>
                <p className="text-2xl font-bold">{(teacher?.lesson_price || 0) * myBookings.filter(b => b.status === 'completed').length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xl">
                👥
              </div>
              <div>
                <p className="text-sm text-gray-500">الطلاب</p>
                <p className="text-2xl font-bold">{new Set(myBookings.map(b => b.booked_by_user_id)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="premium-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📅</span> حجوزات اليوم
            </h2>
            <div className="space-y-4">
              {myBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {booking.start_time?.split(':')[0] || '10'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">حصة {booking.subject?.name_ar || 'رياضيات'}</p>
                    <p className="text-sm text-gray-500">{booking.lesson_mode === 'remote' ? '💻 أونلاين' : '🏠 حضوري'}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'pending' ? 'بانتظار' : booking.status}
                  </span>
                </div>
              ))}
              {myBookings.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl block mb-2">📭</span>
                  لا توجد حجوزات لليوم
                </div>
              )}
            </div>
          </div>

          <div className="premium-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>⭐</span> آخر التقييمات
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                    أ
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">أحمد محمد</p>
                    <div className="flex text-yellow-400 text-sm">
                      {'⭐'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  معلم ممتاز وشرحه واضح جداً. استفدت كثيراً من الحصة. أنصح به بشدة.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
                    ن
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">نورة علي</p>
                    <div className="flex text-yellow-400 text-sm">
                      {'⭐'.repeat(4)}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  شرح مبسط ومفيد. الحصة كانت منظمة وواضحة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
