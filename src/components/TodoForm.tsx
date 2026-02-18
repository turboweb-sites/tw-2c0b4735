import { useState, useRef } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 fade-in">
      <div
        className={`
          flex items-center gap-3 p-2 pl-5 rounded-2xl
          bg-slate-800/60 backdrop-blur-sm
          border transition-all duration-300
          ${isFocused
            ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/20'
            : 'border-slate-700/50 hover:border-slate-600/50'
          }
        `}
      >
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Добавить задачу..."
          className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 text-sm sm:text-base"
          maxLength={200}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={!text.trim()}
          className={`
            flex items-center justify-center w-10 h-10 rounded-xl
            transition-all duration-300
            ${text.trim()
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95'
              : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}