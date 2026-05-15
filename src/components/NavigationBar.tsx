import React from 'react';
import { cn } from '../lib/utils';

interface NavigationBarProps {
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
  dark?: boolean;
}

export default function NavigationBar({ onBack, onHome, onRecents, dark }: NavigationBarProps) {
  return (
    <div className={cn(
      "h-12 w-full flex justify-around items-center px-12 transition-colors",
      dark ? "text-gray-800" : "text-white"
    )}>
      <button onClick={onRecents} className="p-3 bg-transparent border-none outline-none focus:outline-none opacity-80 hover:opacity-100 active:opacity-60 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 6v12M12 6v12M17 6v12" />
        </svg>
      </button>
      <button onClick={onHome} className="p-3 bg-transparent border-none outline-none focus:outline-none opacity-80 hover:opacity-100 active:opacity-60 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="5" width="14" height="14" rx="4.5" />
        </svg>
      </button>
      <button onClick={onBack} className="p-3 bg-transparent border-none outline-none focus:outline-none opacity-80 hover:opacity-100 active:opacity-60 transition-opacity">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}
