'use client';

import { useEffect, useState, useMemo } from 'react';
import { useFilterStore } from '@/lib/store';
import { TeacherCard } from './TeacherCard';
import { CategoryPills } from './CategoryPills';
import { MobileFilterButton, MobileFilterModal } from './FilterModal';
import { mockTeachers, filterTeachers } from '@/lib/mockData';
import type { Teacher } from '@/types';
import { t } from '@/lib/translations';
import { Loader2, Search, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export function TeacherGrid() {
  const [loading, setLoading] = useState(true);
  const { filters, setFilter } = useFilterStore();
  const perPage = 20;

  // Filter teachers using mock data
  const filteredTeachers = useMemo(() => {
    return filterTeachers(mockTeachers, {
      search: filters.search,
      gender: filters.gender,
      qualification: filters.qualification,
      lessonLocation: filters.lessonLocation,
      nationality: filters.nationality,
      categoryId: filters.categoryId,
      sortBy: filters.sortBy,
    });
  }, [filters]);

  const total = filteredTeachers.length;
  const totalPages = Math.ceil(total / perPage);
  const currentPage = filters.page || 1;
  
  // Paginate
  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredTeachers.slice(start, start + perPage);
  }, [filteredTeachers, currentPage]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search_placeholder')}
            value={filters.search || ''}
            onChange={(e) => setFilter('search', e.target.value)}
            className="form-input w-full ps-12"
          />
        </div>

        {/* Results Count & Filter Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="w-5 h-5" />
            <span className="font-medium">{total}</span>
            <span>{t('teachers_available')}</span>
          </div>
          <MobileFilterButton />
        </div>
      </div>

      {/* Category Pills */}
      <CategoryPills />

      {/* Mobile Filter Modal */}
      <MobileFilterModal />

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{t('loading')}</p>
        </div>
      ) : paginatedTeachers.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('no_teachers_found')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('try_different_filters')}
          </p>
        </div>
      ) : (
        /* Teacher Cards Grid */
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setFilter('page', Math.max(1, (filters.page || 1) - 1))}
                disabled={(filters.page || 1) <= 1}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setFilter('page', page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        (filters.page || 1) === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-400">...</span>
                    <button
                      onClick={() => setFilter('page', totalPages)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        (filters.page || 1) === totalPages
                          ? 'bg-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setFilter('page', Math.min(totalPages, (filters.page || 1) + 1))}
                disabled={(filters.page || 1) >= totalPages}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
