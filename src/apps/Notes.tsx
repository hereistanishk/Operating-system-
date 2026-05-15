import React, { useState } from 'react';
import { Plus, ChevronLeft, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Welcome', content: 'This is a sample note...', date: new Date() }
  ]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const createNote = () => {
    const newNote = { id: Date.now().toString(), title: '', content: '', date: new Date() };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
  };

  const updateNote = (id: string, content: string) => {
    const lines = content.split('\n');
    const title = lines[0] || 'New Note';
    setNotes(notes.map(n => n.id === id ? { ...n, content, title, date: new Date() } : n));
    setActiveNote(prev => prev ? { ...prev, content, title } : null);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    setActiveNote(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-black overflow-hidden relative">
      <AnimatePresence>
        {!activeNote ? (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col pt-12 p-4 h-full"
          >
            <h1 className="text-3xl font-bold mb-4 px-2 dark:text-white">Folders</h1>
            <div className="flex-1 overflow-y-auto">
              <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                {notes.map(note => (
                  <button
                    key={note.id}
                    onClick={() => setActiveNote(note)}
                    className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-[#2c2c2e] transition-colors"
                  >
                    <div className="font-semibold text-gray-900 dark:text-white truncate">{note.title || 'New Note'}</div>
                    <div className="text-gray-500 text-sm truncate mt-1">
                      {note.date.toLocaleDateString()} {note.content || 'No additional text'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 flex justify-end bg-gradient-to-t from-[#f2f2f7] dark:from-black to-transparent">
              <button onClick={createNote} className="text-yellow-500 p-2">
                <Plus size={28} className="stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute inset-0 flex flex-col bg-white dark:bg-black pt-12 h-full z-10"
          >
            <div className="flex items-center justify-between px-2 pb-2 text-yellow-500">
              <button onClick={() => setActiveNote(null)} className="flex items-center space-x-1 p-2">
                <ChevronLeft size={24} />
                <span>Notes</span>
              </button>
              <button onClick={() => deleteNote(activeNote.id)} className="p-2">
                <Trash2 size={20} />
              </button>
            </div>
            <textarea
              className="flex-1 w-full bg-transparent p-4 outline-none resize-none dark:text-white placeholder-gray-400"
              placeholder="Start typing..."
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, e.target.value)}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
