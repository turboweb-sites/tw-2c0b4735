import { ListTodo, CheckCircle } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export default function Header({ totalCount, activeCount, completedCount }: HeaderProps) {
  return (
    <div className="text-center mb-8 fade-in">
      {/* Logo */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 mb-4">
        <ListTodo className="w-8 h-8 text-white" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
        TODO TPDP
      </h1>

      <p className="text-slate-400 text-sm">
        {totalCount === 0 ? (
          'Начните добавлять задачи'
        ) : (
          <span className="flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              {activeCount} активных
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              {completedCount} выполнено
            </span>
          </span>
        )}
      </p>
    </div>
  );
}