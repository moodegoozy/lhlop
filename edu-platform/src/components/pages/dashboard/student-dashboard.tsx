'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { mockBookings, mockUsers, mockSubjects } from '@/data/mock';
import ThemeToggle from '@/components/ThemeToggle';

export function StudentDashboard() {
  const student = mockUsers.find(u => u.role === 'student');
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: '📊' },
    { id: 'lessons', label: 'حصصي', icon: '📚' },
    { id: 'teachers', label: 'معلميني', icon: '👨‍🏫' },
    { id: 'progress', label: 'تقدمي', icon: '📈' },
    { id: 'schedule', label: 'جدولي', icon: '📅' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
  ];

  const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

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
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold' 
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
              {student?.full_name?.charAt(0) || 'ط'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{student?.full_name || 'طالب'}</p>
              <p className="text-xs text-gray-500">طالب</p>
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
            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">مرحباً {student?.full_name || 'طالبنا المميز'} 🎓</h1>
              <p className="text-white/80">استمر في التعلم وحقق أهدافك!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white">
                <span className="text-2xl font-bold">85%</span>
                <p className="text-sm text-white/80">معدل الإنجاز</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl">
                📚
              </div>
              <div>
                <p className="text-sm text-gray-500">الحصص المكتملة</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-xl">
                ⏳
              </div>
              <div>
                <p className="text-sm text-gray-500">الحصص القادمة</p>
                <p className="text-2xl font-bold">{mockBookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <div>
                <p className="text-sm text-gray-500">معلميني</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl">
                🏆
              </div>
              <div>
                <p className="text-sm text-gray-500">النقاط</p>
                <p className="text-2xl font-bold">1,250</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Schedule */}
          <div className="lg:col-span-2 premium-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📅</span> جدول الأسبوع
            </h2>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-5 gap-3 min-w-[500px]">
                {weekDays.map((day, i) => (
                  <div key={day} className={`rounded-xl p-4 ${i === 1 ? 'bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-400' : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <p className="font-bold text-center mb-3">{day}</p>
                    {i === 1 && (
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800">
                          <p className="text-xs font-medium">رياضيات</p>
                          <p className="text-xs text-gray-500">4:00</p>
                        </div>
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-800">
                          <p className="text-xs font-medium">إنجليزي</p>
                          <p className="text-xs text-gray-500">6:00</p>
                        </div>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                        <p className="text-xs font-medium">فيزياء</p>
                        <p className="text-xs text-gray-500">5:00</p>
                      </div>
                    )}
                    {i !== 1 && i !== 3 && (
                      <p className="text-xs text-gray-400 text-center">لا حصص</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Subjects */}
          <div className="premium-card p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span>📖</span> موادي
            </h2>
            <div className="space-y-3">
              {mockSubjects.slice(0, 4).map((subject, i) => (
                <div key={subject.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    i === 0 ? 'from-blue-400 to-indigo-500' : 
                    i === 1 ? 'from-green-400 to-emerald-500' : 
                    i === 2 ? 'from-purple-400 to-pink-500' : 
                    'from-orange-400 to-red-500'
                  } flex items-center justify-center text-white text-lg`}>
                    {i === 0 ? '➕' : i === 1 ? '🔬' : i === 2 ? '📐' : '🌍'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{subject.name_ar}</p>
                    <p className="text-xs text-gray-500">3 حصص / أسبوع</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600">85%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="premium-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📈</span> تقدمي الدراسي
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--card)' }}>
                  <span className="text-3xl font-bold text-blue-600">85%</span>
                </div>
              </div>
              <p className="font-medium">معدل الإنجاز</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--card)' }}>
                  <span className="text-3xl font-bold text-green-600">92%</span>
                </div>
              </div>
              <p className="font-medium">نسبة الحضور</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--card)' }}>
                  <span className="text-3xl font-bold text-orange-600">4.5</span>
                </div>
              </div>
              <p className="font-medium">متوسط التقييم</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link href={ROUTES.TEACHERS}>
            <button className="btn-premium px-6 py-3 rounded-xl font-medium">
              🔍 ابحث عن معلم
            </button>
          </Link>
          <button className="btn-gold px-6 py-3 rounded-xl font-medium">
            📝 واجباتي
          </button>
          <button className="px-6 py-3 rounded-xl font-medium border-2 border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
            💬 رسائلي
          </button>
        </div>
      </main>
    </div>
  );
}
