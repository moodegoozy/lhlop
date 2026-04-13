'use client';

import { Search } from 'lucide-react';
import { t } from '@/lib/translations';

export function HeroSection() {
  const stats = [
    { value: '+200', label: t('stats_teachers') },
    { value: '+5,000', label: t('stats_hours') },
    { value: '98%', label: t('stats_satisfaction') },
    { value: '+1,500', label: t('stats_students') },
  ];

  const quickSubjects = t('quick_subjects').split('|');

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-bg -z-10" />

      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">
            المنصة الأولى للتعليم الخصوصي في المملكة
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            {t('hero_title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              {t('hero_highlight')}
            </span>{' '}
            {t('hero_subtitle')}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t('hero_description')}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="flex-1 relative">
                <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full py-4 ps-12 pe-4 text-gray-900 dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0"
                />
              </div>
              <button className="m-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                {t('search_teachers')}
              </button>
            </div>
          </div>

          {/* Quick Subject Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {quickSubjects.map((subject) => (
              <span
                key={subject}
                className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200/50 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {subject}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/30"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
