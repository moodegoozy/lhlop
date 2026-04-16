'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { mockBookings, mockUsers } from '@/data/mock';
import ThemeToggle from '@/components/ThemeToggle';

export function ParentDashboard() {
  const parent = mockUsers.find(u => u.role === 'parent');
  const children = mockUsers.filter(u => u.role === 'child');
  const [activeTab, setActiveTab] = React.useState('overview');

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: '📊' },
    { id: 'children', label: 'أبنائي', icon: '👶' },
    { id: 'bookings', label: 'الحجوزات', icon: '📅' },
    { id: 'teachers', label: 'المعلمين', icon: '👨‍🏫' },
    { id: 'payments', label: 'المدفوعات', icon: '💳' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
  ];

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
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 font-semibold' 
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
              {parent?.full_name?.charAt(0) || 'و'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{parent?.full_name || 'ولي أمر'}</p>
              <p className="text-xs text-gray-500">ولي أمر</p>
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
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">مرحباً {parent?.full_name || 'ولي الأمر'} 👋</h1>
              <p className="text-white/80">تابع تقدم أبنائك التعليمي</p>
            </div>
            <Link href={ROUTES.TEACHERS}>
              <button className="btn-gold px-6 py-3 rounded-xl font-semibold">
                احجز حصة جديدة ✨
              </button>
            </Link>
          </div>
        </div>

        {/* Children Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>👶</span> أبنائي
            </h2>
            <button className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
              + إضافة طفل
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child, index) => (
              <div key={child.id} className="premium-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-blue-500 to-cyan-500' : 
                    index % 3 === 1 ? 'from-pink-500 to-rose-500' : 
                    'from-green-500 to-emerald-500'
                  } flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {child.full_name?.charAt(0) || '👶'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{child.full_name}</h3>
                    <p className="text-sm text-gray-500">الصف السادس</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الحصص المكتملة</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الحصص القادمة</span>
                    <span className="font-bold text-purple-600">3</span>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <Link href={ROUTES.TEACHERS}>
                      <button className="w-full py-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                        احجز حصة
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add Child Card */}
            <div className="premium-card p-6 border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl mb-4">
                ➕
              </div>
              <h3 className="font-bold text-lg mb-1">إضافة طفل</h3>
              <p className="text-sm text-gray-500">أضف حساب لطفلك</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <p className="text-sm text-gray-500">إجمالي الحجوزات</p>
                <p className="text-2xl font-bold">{mockBookings.length}</p>
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
                <p className="text-2xl font-bold">{mockBookings.filter(b => b.status === 'completed').length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl">
                ⏳
              </div>
              <div>
                <p className="text-sm text-gray-500">قادمة</p>
                <p className="text-2xl font-bold">{mockBookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
          </div>
          <div className="premium-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xl">
                💰
              </div>
              <div>
                <p className="text-sm text-gray-500">المدفوعات</p>
                <p className="text-2xl font-bold">2,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="premium-card p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📅</span> الحجوزات القادمة
          </h2>
          <div className="space-y-4">
            {mockBookings.filter(b => b.status === 'confirmed').slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                  {booking.booking_date?.split('-')[2] || '15'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">حصة {booking.subject?.name_ar || 'رياضيات'}</p>
                  <p className="text-sm text-gray-500">{booking.booking_date} - {booking.start_time}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  مؤكد
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
