import React, { useState } from 'react';
import { Check, Trash2, Edit3, X, Save } from 'lucide-react';
import type { Todo } from '../App';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function TodoItem({ id, text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div
      className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
        completed
          ? 'bg-gray-800/30 border-gray-700/30'
          : 'bg-gray-800/60 border-gray-700/50 hover:border-indigo-500/30 hover:bg-gray-800/80'
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(id)}
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
          completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-gray-600 hover:border-indigo-400 hover:bg-indigo-500/10'
        }`}
      >
        {completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
          />
          <button
            onClick={handleSave}
            className="p-1.5 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 text-gray-400 hover:bg-gray-600/50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-sm transition-all duration-200 ${
              completed ? 'text-gray-500 line-through' : 'text-gray-200'
            }`}
          >
            {text}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => {
                setEditText(text);
                setIsEditing(true);
              }}
              className="p-1.5 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-lg font-medium text-gray-400">No tasks yet</p>
        <p className="text-sm text-gray-600 mt-1">Add your first task above</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}