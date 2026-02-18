export function formatDueDate(dueDate: string | null): {
  label: string;
  status: 'overdue' | 'today' | 'tomorrow' | 'upcoming' | null;
} {
  if (!dueDate) return { label: '', status: null };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffMs = due.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: `${Math.abs(diffDays)}日超過`, status: 'overdue' };
  } else if (diffDays === 0) {
    return { label: '今日', status: 'today' };
  } else if (diffDays === 1) {
    return { label: '明日', status: 'tomorrow' };
  } else {
    return { label: `${diffDays}日後`, status: 'upcoming' };
  }
}

export function getDueDateBadgeClass(status: 'overdue' | 'today' | 'tomorrow' | 'upcoming' | null): string {
  switch (status) {
    case 'overdue':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case 'today':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    case 'tomorrow':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'upcoming':
      return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    default:
      return '';
  }
}
