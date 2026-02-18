'use client';

import { ClipboardList } from 'lucide-react';
import { Todo } from '@/types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ClipboardList className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">TODOがありません</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          新しいTODOを追加するか、フィルターを変更してください
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
