import React from 'react';
import { motion } from 'motion/react';
import type { AppMeta } from '../types';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface RecentsViewProps {
  apps: AppMeta[];
  recentApps: string[];
  onSelectApp: (id: string) => void;
  onClose: () => void;
  onRemoveApp: (id: string) => void;
}

export default function RecentsView({ apps, recentApps, onSelectApp, onClose, onRemoveApp }: RecentsViewProps) {
  if (recentApps.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center pb-12"
      >
        <div className="text-white text-lg">No recent apps</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[#0B0D12]/80 backdrop-blur-md flex items-center overflow-x-auto snap-x snap-mandatory px-12 space-x-8 pb-12 no-scrollbar"
      onClick={onClose}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {recentApps.map(appId => {
        const app = apps.find(a => a.id === appId);
        if (!app) return null;
        return (
          <motion.div 
            key={app.id}
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
            className="snap-center shrink-0 w-[260px] h-[520px] rounded-[2rem] relative bg-black shadow-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onSelectApp(app.id);
            }}
          >
             <div className="absolute -top-12 left-0 right-0 flex items-center justify-between px-2">
               <div className="flex items-center space-x-2 text-white">
                 <div className={cn("p-1.5 rounded-lg flex items-center justify-center shadow-md", app.color)}>
                   <app.icon size={16} className={cn(!app.color.includes('text-black') && 'text-white')} />
                 </div>
                 <span className="text-sm font-medium tracking-wide drop-shadow-md">{app.name}</span>
               </div>
               <button 
                 onClick={(e) => { 
                   e.stopPropagation(); 
                   onRemoveApp(app.id); 
                 }} 
                 className="text-white/70 hover:text-white bg-white/20 rounded-full p-1.5 backdrop-blur-md transition-colors"
               >
                 <X size={16} />
               </button>
             </div>
             <div className="w-full h-full rounded-[2rem] overflow-hidden relative pointer-events-none border border-white/20 origin-center bg-black flex flex-col shadow-inner">
               <div className="flex-1 w-full relative flex flex-col overflow-hidden pointer-events-none pb-[env(safe-area-inset-bottom)]">
                 <app.component />
               </div>
             </div>
          </motion.div>
        )
      })}
    </motion.div>
  );
}
