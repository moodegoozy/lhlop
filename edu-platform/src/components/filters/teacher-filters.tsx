'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  Button,
  Badge,
  Input,
} from '@/components/ui';
import { useFiltersStore } from '@/store';
import { t } from '@/lib/translations';
import { mockSubjects, mockServices, mockCities } from '@/data/mock';
import type { LessonMode } from '@/types';

export function TeacherFilters({ className }: { className?: string }) {
  const { filters, setFilter, clearFilters, hasActiveFilters } =
    useFiltersStore();

  const [isOpen, setIsOpen] = React.useState(false);

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sort_by') return false;
    return value !== undefined && value !== '' && value !== null;
  }).length;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Search Input - Always visible */}
      <div className="flex-1">
        <Input
          placeholder={t('teachers.searchPlaceholder')}
          value={filters.search || ''}
          onChange={(e) => setFilter('search', e.target.value)}
          leftIcon={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          }
          inputSize="default"
        />
      </div>

      {/* Filter Button - Opens Sheet on Mobile */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="default" className="relative">
            <svg
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="hidden sm:inline">{t('teachers.filters')}</span>
            {activeFiltersCount > 0 && (
              <Badge
                variant="default"
                size="sm"
                className="absolute -top-2 -left-2 min-w-[20px] h-5"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{t('teachers.filters')}</SheetTitle>
          </SheetHeader>

          <div className="py-4 space-y-4">
            {/* Subject Filter */}
            <Select
              value={filters.subject_id || ''}
              onValueChange={(value) =>
                setFilter('subject_id', value || undefined)
              }
            >
              <SelectTrigger label={t('teachers.subject')}>
                <SelectValue placeholder={t('teachers.allSubjects')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('teachers.allSubjects')}</SelectItem>
                {mockSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Service Filter */}
            <Select
              value={filters.service_id || ''}
              onValueChange={(value) =>
                setFilter('service_id', value || undefined)
              }
            >
              <SelectTrigger label={t('teachers.service')}>
                <SelectValue placeholder={t('teachers.allServices')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('teachers.allServices')}</SelectItem>
                {mockServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select
              value={filters.city_id || ''}
              onValueChange={(value) =>
                setFilter('city_id', value || undefined)
              }
            >
              <SelectTrigger label={t('teachers.city')}>
                <SelectValue placeholder={t('teachers.allCities')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('teachers.allCities')}</SelectItem>
                {mockCities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name_ar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Lesson Mode Filter */}
            <Select
              value={filters.lesson_mode || ''}
              onValueChange={(value) =>
                setFilter('lesson_mode', (value as LessonMode) || undefined)
              }
            >
              <SelectTrigger label={t('teachers.lessonMode')}>
                <SelectValue placeholder={t('teachers.allModes')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('teachers.allModes')}</SelectItem>
                <SelectItem value="online">
                  {t('teachers.lessonModes.online')}
                </SelectItem>
                <SelectItem value="in_person">
                  {t('teachers.lessonModes.inPerson')}
                </SelectItem>
                <SelectItem value="both">
                  {t('teachers.lessonModes.both')}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('teachers.priceRange')}
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={t('common.min')}
                  value={filters.min_price || ''}
                  onChange={(e) =>
                    setFilter(
                      'min_price',
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  inputSize="sm"
                />
                <span className="text-gray-400">-</span>
                <Input
                  type="number"
                  placeholder={t('common.max')}
                  value={filters.max_price || ''}
                  onChange={(e) =>
                    setFilter(
                      'max_price',
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  inputSize="sm"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <Select
              value={filters.min_rating?.toString() || ''}
              onValueChange={(value) =>
                setFilter('min_rating', value ? Number(value) : undefined)
              }
            >
              <SelectTrigger label={t('teachers.rating')}>
                <SelectValue placeholder={t('teachers.allRatings')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('teachers.allRatings')}</SelectItem>
                <SelectItem value="4">4+ ⭐</SelectItem>
                <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                <SelectItem value="5">5 ⭐</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select
              value={filters.sort_by || 'rating'}
              onValueChange={(value) =>
                setFilter(
                  'sort_by',
                  value as
                    | 'rating'
                    | 'price_asc'
                    | 'price_desc'
                    | 'experience'
                    | 'reviews'
                )
              }
            >
              <SelectTrigger label={t('teachers.sortBy')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t('teachers.sortOptions.rating')}</SelectItem>
                <SelectItem value="price_asc">{t('teachers.sortOptions.priceAsc')}</SelectItem>
                <SelectItem value="price_desc">{t('teachers.sortOptions.priceDesc')}</SelectItem>
                <SelectItem value="experience">{t('teachers.sortOptions.experience')}</SelectItem>
                <SelectItem value="reviews">{t('teachers.sortOptions.reviews')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SheetFooter>
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters()}
            >
              {t('teachers.clearFilters')}
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              {t('teachers.applyFilters')}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Horizontal filter chips for quick access
export function TeacherFilterChips({ className }: { className?: string }) {
  const { filters, setFilter } = useFiltersStore();

  const chips = [
    { key: 'online', label: 'أونلاين', value: 'online' as LessonMode },
    { key: 'in_person', label: 'حضوري', value: 'in_person' as LessonMode },
    { key: 'high_rated', label: '4+ ⭐', value: 4 },
  ];

  return (
    <div
      className={cn(
        'flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide',
        className
      )}
    >
      {chips.map((chip) => {
        const isActive =
          chip.key === 'high_rated'
            ? filters.min_rating === chip.value
            : filters.lesson_mode === chip.value;

        return (
          <button
            key={chip.key}
            onClick={() => {
              if (chip.key === 'high_rated') {
                setFilter(
                  'min_rating',
                  isActive ? undefined : (chip.value as number)
                );
              } else {
                setFilter(
                  'lesson_mode',
                  isActive ? undefined : (chip.value as LessonMode)
                );
              }
            }}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
              isActive
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
