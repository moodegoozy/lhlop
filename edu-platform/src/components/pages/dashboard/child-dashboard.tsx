'use client';

import * as React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { mockBookings, mockUsers, mockSubjects } from '@/data/mock';
import ThemeToggle from '@/components/ThemeToggle';

export function ChildDashboard() {
  const child = mockUsers.find(u => u.role === 'child');

  const achievements = [
    { id: 1, icon: '🏆', title: 'أول حصة', desc: 'أكملت أول حصة', earned: true },
    { id: 2, icon: '🌟', title: 'نجم الأسبوع', desc: 'حضور 100%', earned: true },
    { id: 3, icon: '📚', title: 'قارئ ماهر', desc: '10 حصص قراءة', earned: true },
    { id: 4, icon: '🎯', title: 'مثابر', desc: '20 حصة متتالية', earned: false },
    { id: 5, icon: '🚀', title: 'متفوق', desc: 'تقييم 5 نجوم', earned: false },
    { id: 6, icon: '💎', title: 'ماسي', desc: '50 حصة', earned: false },
  ];

  const funSubjects = [
    { name: 'رياضيات', emoji: '🔢', color: 'from-blue-400 to-indigo-500', progress: 75 },
    { name: 'إنجليزي', emoji: '🔤', color: 'from-green-400 to-emerald-500', progress: 60 },
    { name: 'علوم', emoji: '🔬', color: 'from-purple-400 to-pink-500', progress: 85 },
    { name: 'عربي', emoji: '📖', color: 'from-orange-400 to-red-500', progress: 70 },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fef3c7 0%, #fce7f3 50%, #e0e7ff 100%)' }}>
      {/* Fun Header */}
      <header className="sticky top-0 z-50 px-6 py-4" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={ROUTES.HOME}>
            <h1 className="text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #f472b6, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              لهلوب 🚀
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-xl">⭐</span>
              <span className="font-bold text-yellow-700">350</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div 
          className="rounded-[32px] p-8 mb-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f472b6 0%, #8b5cf6 50%, #3b82f6 100%)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-6xl opacity-30">🌟</div>
          <div className="absolute bottom-4 right-4 text-6xl opacity-30">🎨</div>
          <div className="absolute top-1/2 left-1/4 text-4xl opacity-20">✨</div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-5xl shadow-lg border-4 border-white/50">
              🧒
            </div>
            <div className="text-white text-center md:text-right">
              <h1 className="text-3xl font-bold mb-2">
                أهلاً {child?.full_name || 'يا بطل'}! 🎉
              </h1>
              <p className="text-white/90 text-lg">هيا نتعلم ونستمتع اليوم!</p>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">المستوى 5 - نجم صاعد ⭐</span>
              <span className="text-white/80 text-sm">350/500 نقطة</span>
            </div>
            <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Fun Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 shadow-lg text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-2xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-500">حصة مكتملة</p>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-lg text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">⏰</div>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-500">حصص قادمة</p>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-lg text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">🏆</div>
            <p className="text-2xl font-bold text-yellow-600">3</p>
            <p className="text-sm text-gray-500">إنجازات</p>
          </div>
          <div className="bg-white rounded-3xl p-5 shadow-lg text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-pink-600">350</p>
            <p className="text-sm text-gray-500">نقاطي</p>
          </div>
        </div>

        {/* Today's Lessons */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">📅</span> 
            حصصي اليوم
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-l from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-2xl shadow-lg">
                🔢
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">رياضيات</h3>
                <p className="text-sm text-gray-500">مع أ. محمد • 4:00 مساءً</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium">
                  🕐 بعد ساعتين
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-l from-green-50 to-emerald-50 border-2 border-green-200">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-2xl shadow-lg">
                🔤
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">إنجليزي</h3>
                <p className="text-sm text-gray-500">مع أ. سارة • 6:00 مساءً</p>
              </div>
              <div className="text-center">
                <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
                  ⏳ لاحقاً
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* My Subjects Progress */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">📖</span> 
            تقدمي في المواد
          </h2>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {funSubjects.map(subject => (
              <div key={subject.name} className="p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-xl shadow-md`}>
                    {subject.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.progress}% مكتمل</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🏆</span> 
            إنجازاتي
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map(ach => (
              <div 
                key={ach.id} 
                className={`text-center p-4 rounded-2xl transition-transform hover:scale-105 ${
                  ach.earned 
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300' 
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <div className={`text-4xl mb-2 ${!ach.earned && 'grayscale'}`}>{ach.icon}</div>
                <p className="font-bold text-sm">{ach.title}</p>
                <p className="text-xs text-gray-500 mt-1">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2">
            <span className="text-2xl">🎮</span>
            العب وتعلم
          </button>
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2">
            <span className="text-2xl">📹</span>
            شاهد دروسك
          </button>
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform flex items-center gap-2">
            <span className="text-2xl">✏️</span>
            واجباتي
          </button>
        </div>
      </main>
    </div>
  );
}
