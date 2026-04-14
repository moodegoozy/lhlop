'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  AppShell,
  PageHeader,
  PageContainer,
  CardGrid,
} from '@/components/layout';
import { TeacherCard, TeacherMiniCard } from '@/components/cards';
import { TeacherFilters, TeacherFilterChips } from '@/components/filters';
import {
  NoTeachersFound,
  SkeletonTeacherCard,
  Button,
  Badge,
} from '@/components/ui';
import { useFiltersStore, filterTeachers } from '@/store';
import { t } from '@/lib/translations';
import { mockTeacherProfiles } from '@/data/mock';

export function TeachersPage() {
  const { filters, hasActiveFilters, clearFilters } = useFiltersStore();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter teachers
  const filteredTeachers = filterTeachers(mockTeacherProfiles, filters);
  const hasFilters = hasActiveFilters();

  return (
    <AppShell
      header={
        <PageHeader
          title={t('nav.teachers')}
          showBack
          showSearch
        />
      }
    >
      {/* Filters Section - Sticky */}
      <div className="sticky top-14 z-30 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-3">
        <PageContainer>
          <TeacherFilters />
          <div className="mt-3">
            <TeacherFilterChips />
          </div>
        </PageContainer>
      </div>

      {/* Results Header */}
      <PageContainer className="py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">
              {isLoading ? (
                t('teachers.loading')
              ) : (
                <>
                  {filteredTeachers.length} {t('teachers.results')}
                </>
              )}
            </span>
            {hasFilters && (
              <Badge variant="secondary" size="sm" removable onRemove={clearFilters}>
                {t('teachers.filtered')}
              </Badge>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 hidden sm:flex">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              aria-label="عرض شبكي"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              aria-label="عرض قائمة"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          // Loading Skeleton
          <CardGrid columns={viewMode === 'list' ? 1 : 2}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonTeacherCard key={i} />
            ))}
          </CardGrid>
        ) : filteredTeachers.length === 0 ? (
          // No Results
          <NoTeachersFound onClearFilters={hasFilters ? clearFilters : undefined} />
        ) : (
          // Results Grid/List
          <CardGrid columns={viewMode === 'list' ? 1 : 2}>
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                variant={viewMode === 'list' ? 'horizontal' : 'default'}
              />
            ))}
          </CardGrid>
        )}

        {/* Load More (for pagination) */}
        {!isLoading && filteredTeachers.length > 0 && filteredTeachers.length >= 6 && (
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              {t('common.loadMore')}
            </Button>
          </div>
        )}
      </PageContainer>
    </AppShell>
  );
}
