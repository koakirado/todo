'use client';

import { useTodos } from '@/hooks/useTodos';
import Header from '@/components/Header';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const {
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        stats={stats}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(v => !v)}
      />
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <AddTodoForm onAdd={addTodo} categories={categories} />
        <FilterBar
          filter={filter}
          onFilterChange={updates => setFilter(prev => ({ ...prev, ...updates }))}
          categories={categories}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}
