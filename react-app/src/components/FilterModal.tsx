'use client';

import { X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useFilterStore, useFilterModalStore } from '@/lib/store';
import {
  GENDER_OPTIONS,
  QUALIFICATION_OPTIONS,
  LESSON_LOCATION_OPTIONS,
  NATIONALITY_OPTIONS,
  COUNTRY_OPTIONS,
  CITY_OPTIONS,
  SORT_OPTIONS,
} from '@/types';
import { t } from '@/lib/translations';
import clsx from 'clsx';

export function MobileFilterButton() {
  const { setShowMobileFilters } = useFilterModalStore();

  return (
    <button
      onClick={() => setShowMobileFilters(true)}
      className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <span className="font-medium">{t('filters')}</span>
    </button>
  );
}

export function MobileFilterModal() {
  const { showMobileFilters, setShowMobileFilters } = useFilterModalStore();
  const { filters, setFilter, clearFilters } = useFilterStore();

  if (!showMobileFilters) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShowMobileFilters(false)}
      />

      {/* Modal Content */}
      <div className="absolute inset-x-0 top-32 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl flex flex-col">
        {/* Handle Bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-4 pb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('filters')}
          </h3>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-4 flex-1 overflow-y-auto">
          <div className="space-y-4 pb-4">
            {/* Sort Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <ArrowUpDown className="w-4 h-4 me-2 text-blue-600 dark:text-blue-400" />
                {t('sort_by')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => setFilter('sortBy', value as keyof typeof SORT_OPTIONS)}
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium transition-all',
                      filters.sortBy === value
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <FilterSelect
              label={t('gender')}
              value={filters.gender || ''}
              onChange={(v) => setFilter('gender', v as '' | 'male' | 'female')}
              placeholder={t('select_gender')}
              options={GENDER_OPTIONS.map((opt) => ({ value: opt, label: t(opt) }))}
            />

            {/* Qualification */}
            <FilterSelect
              label={t('qualification')}
              value={filters.qualification || ''}
              onChange={(v) => setFilter('qualification', v)}
              placeholder={t('select_qualification')}
              options={QUALIFICATION_OPTIONS.map((opt) => ({ value: opt, label: t(opt) }))}
            />

            {/* Lesson Location */}
            <div>
              <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                {t('lesson_locations')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(LESSON_LOCATION_OPTIONS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      setFilter(
                        'lessonLocation',
                        filters.lessonLocation === key ? '' : (key as 'online' | 'in_person' | 'both')
                      )
                    }
                    className={clsx(
                      'p-3 rounded-lg text-sm font-medium transition-all',
                      filters.lessonLocation === key
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nationality */}
            <FilterSelect
              label={t('nationality')}
              value={filters.nationality || ''}
              onChange={(v) => setFilter('nationality', v)}
              placeholder={t('select_nationality')}
              options={NATIONALITY_OPTIONS.map((opt) => ({ value: opt, label: t(opt) }))}
            />

            {/* Country */}
            <FilterSelect
              label={t('country')}
              value={filters.countryCode || ''}
              onChange={(v) => {
                setFilter('countryCode', v);
                setFilter('cityId', '');
              }}
              placeholder={t('select_country')}
              options={Object.entries(COUNTRY_OPTIONS).map(([code, name]) => ({
                value: code,
                label: name,
              }))}
            />

            {/* City */}
            {filters.countryCode && CITY_OPTIONS[filters.countryCode] && (
              <FilterSelect
                label={t('city')}
                value={filters.cityId || ''}
                onChange={(v) => setFilter('cityId', v)}
                placeholder={t('select_city')}
                options={Object.entries(CITY_OPTIONS[filters.countryCode]).map(([id, name]) => ({
                  value: id,
                  label: name,
                }))}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <button
              onClick={() => {
                clearFilters();
                setShowMobileFilters(false);
              }}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              {t('clear_filters')}
            </button>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-all"
            >
              {t('done')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

function FilterSelect({ label, value, onChange, placeholder, options }: FilterSelectProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input w-full text-sm"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
