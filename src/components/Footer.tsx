import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 pb-6 text-center">
      <p className="text-xs text-slate-600 flex items-center justify-center gap-1">
        Дважды кликните по задаче для редактирования
      </p>
      <p className="text-xs text-slate-700 mt-2 flex items-center justify-center gap-1">
        Сделано с <Heart className="w-3 h-3 text-red-500/50 fill-red-500/50" /> на AAA TTT
      </p>
    </footer>
  );
}