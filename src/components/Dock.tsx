import React from 'react';
import type { AppMeta } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DockProps {
  apps: AppMeta[];
  onOpenApp: (id: string) => void;
}

export default function Dock({ apps, onOpenApp }: DockProps) {
  const dockApps = apps.filter(a => a.inDock);

  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-3xl border border-white/5 px-4 py-4 rounded-[48px] flex gap-4 w-fit shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {dockApps.map((app) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={app.id}
          onClick={() => onOpenApp(app.id)}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-[24px] flex items-center justify-center shadow-lg",
            app.color
          )}
        >
          <app.icon size={28} className={cn(!app.color.includes('text-black') && 'text-white')} />
        </motion.button>
      ))}
    </div>
  );
}
