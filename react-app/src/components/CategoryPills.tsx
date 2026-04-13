'use client';

import { useEffect, useState } from 'react';
import { useFilterStore } from '@/lib/store';
import type { Category } from '@/types';
import { t } from '@/lib/translations';
import { ChevronDown, ChevronUp, Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';

export function CategoryPills() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const { filters, setFilter } = useFilterStore();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  const handleCategoryClick = (categoryId: number | null) => {
    if (categoryId === filters.categoryId) {
      setFilter('categoryId', null);
    } else {
      setFilter('categoryId', categoryId);
    }
  };

  const toggleExpand = (categoryId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-4">
      {/* All Categories Button */}
      <div className="filter-slider pb-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={clsx(
            'filter-button whitespace-nowrap',
            filters.categoryId === null
              ? 'filter-button-blue'
              : 'filter-button-inactive'
          )}
        >
          {t('all')}
        </button>

        {/* Parent Categories */}
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <button
              onClick={() => handleCategoryClick(category.id)}
              className={clsx(
                'filter-button whitespace-nowrap flex items-center gap-1',
                filters.categoryId === category.id
                  ? 'filter-button-blue'
                  : 'filter-button-inactive'
              )}
            >
              {category.icon && <span>{category.icon}</span>}
              <span>{category.name}</span>
              {filters.categoryId === category.id && (
                <Check className="w-4 h-4 ms-1" />
              )}
              {category.children && category.children.length > 0 && (
                <button
                  onClick={(e) => toggleExpand(category.id, e)}
                  className="ms-1 p-0.5 hover:bg-white/20 rounded"
                >
                  {expandedCategory === category.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
            </button>

            {/* Subcategories Dropdown */}
            {expandedCategory === category.id && category.children && category.children.length > 0 && (
              <div className="absolute top-full mt-2 start-0 z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 min-w-[200px]">
                {category.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => {
                      handleCategoryClick(child.id);
                      setExpandedCategory(null);
                    }}
                    className={clsx(
                      'w-full text-start px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between',
                      filters.categoryId === child.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    )}
                  >
                    <span>{child.name}</span>
                    {filters.categoryId === child.id && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
