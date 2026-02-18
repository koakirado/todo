'use client';

import { Moon, Sun, CheckSquare } from 'lucide-react';

interface HeaderProps {
  stats: { total: number; active: number; completed: number };
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ stats, darkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-7 h-7 text-blue-500" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">TODOアプリ</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              全{stats.total}件 &middot; 未完了{stats.active}件 &middot; 完了{stats.completed}件
            </p>
          </div>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? 'ライトモードに切替' : 'ダークモードに切替'}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
