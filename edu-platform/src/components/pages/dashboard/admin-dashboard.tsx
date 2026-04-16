'use client';

import * as React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layout';
import { ROUTES } from '@/lib/constants';
import { mockTeacherProfiles, mockBookings, mockUsers } from '@/data/mock';
import ThemeToggle from '@/components/ThemeToggle';

// Stats Card Component
function StatCard({ title, value, icon, change, color }: { 
  title: string; 
  value: string | number; 
  icon: string; 
  change?: string;
  color: string;
}) {
  return (
    <div 
      className="premium-card p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {change} من الشهر الماضي
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Quick Action Button
function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 hover:scale-105"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState('overview');

  // Calculate stats
  const totalTeachers = mockTeacherProfiles.length;
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalParents = mockUsers.filter(u => u.role === 'parent').length;
  const totalChildren = mockUsers.filter(u => u.role === 'child').length;
  const totalBookings = mockBookings.length;
  const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = mockBookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length;

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: '📊' },
    { id: 'teachers', label: 'المعلمين', icon: '👨‍🏫' },
    { id: 'students', label: 'الطلاب', icon: '🎓' },
    { id: 'bookings', label: 'الحجوزات', icon: '📅' },
    { id: 'reports', label: 'التقارير', icon: '📈' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <aside className="fixed top-0 right-0 h-screen w-64 border-l hidden lg:block" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="p-6">
          {/* Logo */}
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

          {/* Navigation */}
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-semibold' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              أ
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">المدير</p>
              <p className="text-xs text-gray-500">admin@lhlop.com</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 p-4 border-b backdrop-blur-xl" style={{ background: 'rgba(var(--card-rgb, 255, 255, 255), 0.9)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">لوحة التحكم</h1>
            <ThemeToggle />
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">مرحباً بك في لوحة التحكم 👋</h1>
            <p className="text-gray-500 dark:text-gray-400">إليك نظرة عامة على أداء المنصة</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="إجمالي المعلمين" 
              value={totalTeachers} 
              icon="👨‍🏫" 
              change="+12%"
              color="from-indigo-500 to-purple-600"
            />
            <StatCard 
              title="إجمالي الطلاب" 
              value={totalStudents + totalChildren} 
              icon="🎓" 
              change="+8%"
              color="from-blue-500 to-cyan-500"
            />
            <StatCard 
              title="أولياء الأمور" 
              value={totalParents} 
              icon="👨‍👩‍👧" 
              change="+15%"
              color="from-purple-500 to-pink-500"
            />
            <StatCard 
              title="إجمالي الحجوزات" 
              value={totalBookings} 
              icon="📅" 
              change="+25%"
              color="from-green-500 to-emerald-500"
            />
          </div>

          {/* Booking Status Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingBookings}</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-600 dark:text-blue-400">مؤكدة</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{confirmedBookings}</p>
            </div>
            <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400">مكتملة</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{completedBookings}</p>
            </div>
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">ملغية</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{cancelledBookings}</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-600 dark:text-purple-400">قيد المراجعة</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">0</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">إجراءات سريعة</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              <QuickAction icon="➕" label="إضافة معلم" />
              <QuickAction icon="👥" label="إدارة المستخدمين" />
              <QuickAction icon="📚" label="إدارة المواد" />
              <QuickAction icon="🏙️" label="إدارة المدن" />
              <QuickAction icon="📊" label="التقارير" />
              <QuickAction icon="⚙️" label="الإعدادات" />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Teachers */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">أفضل المعلمين</h2>
                <Link href={ROUTES.TEACHERS} className="text-sm text-indigo-600 hover:underline">
                  عرض الكل
                </Link>
              </div>
              <div className="space-y-4">
                {mockTeacherProfiles.slice(0, 5).map((teacher, index) => (
                  <div key={teacher.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {teacher.user?.full_name?.charAt(0) || '👤'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{teacher.user?.full_name || 'معلم'}</p>
                      <p className="text-xs text-gray-500">{teacher.specialization}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-yellow-500">⭐ {teacher.average_rating}</p>
                      <p className="text-xs text-gray-500">{teacher.total_reviews} تقييم</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">آخر الحجوزات</h2>
                <button className="text-sm text-indigo-600 hover:underline">
                  عرض الكل
                </button>
              </div>
              <div className="space-y-4">
                {mockBookings.slice(0, 5).map((booking) => {
                  const teacher = booking.teacher;
                  return (
                    <div key={booking.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                        📅
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{teacher?.user?.full_name || 'معلم'}</p>
                        <p className="text-xs text-gray-500">{booking.booking_date} - {booking.start_time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' :
                         booking.status === 'pending' ? 'قيد الانتظار' :
                         booking.status === 'completed' ? 'مكتمل' : 'ملغي'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Teacher Approvals */}
          <div className="mt-8">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">طلبات انضمام المعلمين</h2>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
                  2 بانتظار المراجعة
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: 'var(--border)' }}>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">المعلم</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">التخصص</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">المؤهل</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">تاريخ الطلب</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800" style={{ borderColor: 'var(--border)' }}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                            س
                          </div>
                          <div>
                            <p className="font-medium">سارة العتيبي</p>
                            <p className="text-xs text-gray-500">sara@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">اللغة الإنجليزية</td>
                      <td className="py-4 px-4">ماجستير</td>
                      <td className="py-4 px-4 text-gray-500">2024-01-15</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium transition-colors">
                            قبول
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium transition-colors">
                            رفض
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                            ع
                          </div>
                          <div>
                            <p className="font-medium">عبدالله الحربي</p>
                            <p className="text-xs text-gray-500">abdullah@email.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">الرياضيات</td>
                      <td className="py-4 px-4">بكالوريوس</td>
                      <td className="py-4 px-4 text-gray-500">2024-01-14</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium transition-colors">
                            قبول
                          </button>
                          <button className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium transition-colors">
                            رفض
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
