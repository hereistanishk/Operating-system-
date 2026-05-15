import React from 'react';
import type { AppMeta } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface AppGridProps {
  apps: AppMeta[];
  onOpenApp: (id: string) => void;
}

export default function AppGrid({ apps, onOpenApp }: AppGridProps) {
  const gridApps = apps.filter(a => !a.inDock);

  return (
    <div className="flex-1 w-full pt-16 px-8">
      <div className="grid grid-cols-4 gap-y-10 gap-x-6">
        {gridApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center gap-3 focus:outline-none">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenApp(app.id)}
              className={cn(
                "w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-3xl shadow-lg",
                app.color
              )}
            >
              <app.icon size={30} className={cn(!app.color.includes('text-black') && 'text-white')} />
            </motion.button>
            <span className="text-sm font-medium text-white/80">
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
