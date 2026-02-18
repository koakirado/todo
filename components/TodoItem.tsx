'use client';

import { useState } from 'react';
import { Pencil, Trash2, Check, X, Calendar } from 'lucide-react';
import { Todo } from '@/types';
import { formatDueDate, getDueDateBadgeClass } from '@/utils/date';
import { getCategoryColor } from '@/utils/colors';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_BORDER = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-blue-400',
};

const PRIORITY_LABEL = {
  high: '高',
  medium: '中',
  low: '低',
};

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '');
  const [editPriority, setEditPriority] = useState<Todo['priority']>(todo.priority);

  const { label: dueDateLabel, status: dueDateStatus } = formatDueDate(todo.dueDate);
  const badgeClass = getDueDateBadgeClass(dueDateStatus);
  const categoryColor = getCategoryColor(todo.category);

  function handleSave() {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      category: editCategory.trim(),
      dueDate: editDueDate || null,
      priority: editPriority,
    });
    setEditing(false);
  }

  function handleCancelEdit() {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditCategory(todo.category);
    setEditDueDate(todo.dueDate ?? '');
    setEditPriority(todo.priority);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 ${PRIORITY_BORDER[todo.priority]} p-4 space-y-3`}>
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          autoFocus
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
        />
        <textarea
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
          rows={2}
          placeholder="詳細"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={editCategory}
            onChange={e => setEditCategory(e.target.value)}
            placeholder="カテゴリ"
            className="flex-1 min-w-28 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={e => setEditDueDate(e.target.value)}
            className="flex-1 min-w-36 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value as Todo['priority'])}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancelEdit}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors"
          >
            <X className="w-4 h-4" />
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={!editTitle.trim()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white text-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            保存
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 border-l-4 ${PRIORITY_BORDER[todo.priority]} p-4 transition-opacity ${todo.completed ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
          }`}
          aria-label={todo.completed ? '未完了に戻す' : '完了にする'}
        >
          {todo.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium text-gray-900 dark:text-white ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
            {todo.title}
          </p>
          {todo.description && (
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
              {todo.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 flex-wrap">
            {todo.category && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColor.bg} ${categoryColor.text}`}>
                {todo.category}
              </span>
            )}
            {dueDateLabel && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
                <Calendar className="w-3 h-3" />
                {dueDateLabel}
              </span>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              優先度: {PRIORITY_LABEL[todo.priority]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            aria-label="編集"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            aria-label="削除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
