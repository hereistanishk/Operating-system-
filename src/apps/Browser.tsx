import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Share, BookOpen } from 'lucide-react';

export default function Browser() {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [input, setInput] = useState('wikipedia.org');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = input;
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      finalUrl = 'https://' + input;
    }
    setUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-black pt-12">
      {/* Search Bar Area */}
      <div className="bg-gray-100 dark:bg-[#1c1c1e] p-2 flex items-center shadow-sm z-10 border-b border-gray-200 dark:border-gray-800">
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            className="w-full bg-white dark:bg-[#2c2c2e] p-2 rounded-xl text-center text-sm outline-none dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search or enter website name"
          />
        </form>
      </div>

      <div className="flex-1 bg-white relative overflow-hidden">
        <iframe 
          title="Browser"
          src={url} 
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>

      {/* Bottom Nav */}
      <div className="h-16 bg-gray-100 dark:bg-[#1c1c1e] border-t border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between pb-6 pt-2">
        <button className="p-2 text-blue-500 opacity-50"><ChevronLeft size={24} /></button>
        <button className="p-2 text-blue-500 opacity-50"><ChevronRight size={24} /></button>
        <button className="p-2 text-blue-500"><Share size={20} /></button>
        <button className="p-2 text-blue-500"><BookOpen size={20} /></button>
        <button className="p-2 text-blue-500"><RotateCw size={20} /></button>
      </div>
    </div>
  );
}
