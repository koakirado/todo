'use client';

import { useState, FormEvent } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Todo } from '@/types';

interface AddTodoFormProps {
  onAdd: (data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  categories: string[];
}

export default function AddTodoForm({ onAdd, categories }: AddTodoFormProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      dueDate: dueDate || null,
      priority,
    });
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
    setPriority('medium');
    setExpanded(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="新しいTODOを追加..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            onFocus={() => setExpanded(true)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="詳細を開閉"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            追加
          </button>
        </div>

        {expanded && (
          <div className="mt-3 space-y-3">
            <textarea
              placeholder="詳細（任意）"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
            />
            <div className="flex gap-2 flex-wrap">
              <input
                type="text"
                placeholder="カテゴリ"
                value={category}
                onChange={e => setCategory(e.target.value)}
                list="category-suggestions"
                className="flex-1 min-w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <datalist id="category-suggestions">
                {categories.map(c => <option key={c} value={c} />)}
              </datalist>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="flex-1 min-w-36 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as Todo['priority'])}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="high">高優先度</option>
                <option value="medium">中優先度</option>
                <option value="low">低優先度</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
