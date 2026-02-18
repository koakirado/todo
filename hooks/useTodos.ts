'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, FilterState } from '@/types';

const STORAGE_KEY = 'todos';
const DARK_MODE_KEY = 'darkMode';

const SAMPLE_TODOS: Todo[] = [
  {
    id: 'sample-1',
    title: 'プロジェクト企画書の作成',
    description: '来週の会議までに第1稿を完成させる',
    completed: false,
    priority: 'high',
    category: '仕事',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: '週次レポートの提出',
    description: '先週の進捗をまとめてメールで送付する',
    completed: false,
    priority: 'medium',
    category: '仕事',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: '歯医者の予約',
    description: '3ヶ月ぶりの定期検診',
    completed: false,
    priority: 'low',
    category: '健康',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-4',
    title: '読書: TypeScript実践ガイド',
    description: '第4章まで読み終える',
    completed: true,
    priority: 'low',
    category: '学習',
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-5',
    title: '冷蔵庫の掃除',
    description: '賞味期限切れのものを処分する',
    completed: false,
    priority: 'medium',
    category: '家事',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_FILTER: FilterState = {
  status: 'all',
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  category: null,
};

function priorityValue(p: Todo['priority']): number {
  return p === 'high' ? 3 : p === 'medium' ? 2 : 1;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const [darkMode, setDarkMode] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch {
        setTodos(SAMPLE_TODOS);
      }
    } else {
      setTodos(SAMPLE_TODOS);
    }

    const storedDark = localStorage.getItem(DARK_MODE_KEY);
    if (storedDark !== null) {
      setDarkMode(storedDark === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, initialized]);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, initialized]);

  const addTodo = useCallback((data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const filteredTodos = todos
    .filter(t => {
      if (filter.status === 'active' && t.completed) return false;
      if (filter.status === 'completed' && !t.completed) return false;
      if (filter.category && t.category !== filter.category) return false;
      if (filter.search) {
        const q = filter.search.toLowerCase();
        if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      let cmp = 0;
      switch (filter.sortBy) {
        case 'title':
          cmp = a.title.localeCompare(b.title, 'ja');
          break;
        case 'dueDate': {
          const da = a.dueDate ?? '9999-12-31';
          const db = b.dueDate ?? '9999-12-31';
          cmp = da.localeCompare(db);
          break;
        }
        case 'priority':
          cmp = priorityValue(b.priority) - priorityValue(a.priority);
          break;
        case 'createdAt':
        default:
          cmp = a.createdAt.localeCompare(b.createdAt);
          break;
      }
      return filter.sortOrder === 'asc' ? cmp : -cmp;
    });

  const categories = Array.from(new Set(todos.map(t => t.category).filter(Boolean)));

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    darkMode,
    setDarkMode,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    categories,
    stats,
  };
}
