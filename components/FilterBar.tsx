'use client';

import { Search, X } from 'lucide-react';
import { FilterState } from '@/types';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  categories: string[];
}

const STATUS_OPTIONS: { value: FilterState['status']; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

const SORT_OPTIONS: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'createdAt', label: '作成日' },
  { value: 'dueDate', label: '期日' },
  { value: 'priority', label: '優先度' },
  { value: 'title', label: 'タイトル' },
];

export default function FilterBar({ filter, onFilterChange, categories }: FilterBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="検索..."
          value={filter.search}
          onChange={e => onFilterChange({ search: e.target.value })}
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {filter.search && (
          <button
            onClick={() => onFilterChange({ search: '' })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
          {STATUS_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onFilterChange({ status: opt.value })}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                filter.status === opt.value
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <select
            value={filter.sortBy}
            onChange={e => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => onFilterChange({ sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            title={filter.sortOrder === 'asc' ? '昇順' : '降順'}
          >
            {filter.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange({ category: null })}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              filter.category === null
                ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            すべて
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onFilterChange({ category: filter.category === cat ? null : cat })}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filter.category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
