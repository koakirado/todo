export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  status: 'all' | 'active' | 'completed';
  search: string;
  sortBy: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder: 'asc' | 'desc';
  category: string | null;
}
