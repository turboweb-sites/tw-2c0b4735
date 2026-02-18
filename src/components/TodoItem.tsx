import { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Circle, X, Save } from 'lucide-react';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [isDeleting, setIsDeleting] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) {
      onEdit(id, trimmed);
    } else {
      setEditText(text);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(id), 200);
  };

  return (
    <div
      className={`
        group flex items-center gap-3 p-3 sm:p-4 rounded-xl
        bg-slate-800/40 backdrop-blur-sm border border-slate-700/30
        hover:bg-slate-800/60 hover:border-slate-600/40
        transition-all duration-300 todo-enter
        ${isDeleting ? 'opacity-0 scale-95 -translate-x-4' : ''}
        ${completed ? 'opacity-70' : ''}
      `}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(id)}
        className={`
          flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-lg
          border-2 transition-all duration-300 
          ${completed
            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-400 check-bounce'
            : 'border-slate-500 hover:border-indigo-400 hover:bg-indigo-500/10'
          }
        `}
      >
        {completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit input */}
      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className="flex-1 bg-slate-700/50 border border-indigo-500/40 rounded-lg px-3 py-1.5 text-white text-sm outline-none focus:border-indigo-400 transition-colors"
          maxLength={200}
        />
      ) : (
        <span
          onDoubleClick={() => !completed && setIsEditing(true)}
          className={`
            flex-1 text-sm sm:text-base select-none cursor-default
            transition-all duration-300
            ${completed ? 'line-through text-slate-500' : 'text-slate-200'}
          `}
        >
          {text}
        </span>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/15 transition-colors"
              title="Сохранить"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-500/15 transition-colors"
              title="Отмена"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            {!completed && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/15 transition-colors"
                title="Редактировать"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/15 transition-colors"
              title="Удалить"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}