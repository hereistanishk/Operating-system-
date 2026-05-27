import React from 'react';
import { motion } from 'motion/react';
import type { AppMeta } from '../types';
import StatusBar from './StatusBar';

interface WindowProps {
  app: AppMeta;
  onClose: () => void;
  key?: string;
}

export default function Window({ app, onClose }: WindowProps) {
  const isDark = app.id === 'calculator' || app.id === 'notes' || app.id === 'settings';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute inset-0 z-40 bg-black flex flex-col overflow-hidden shadow-2xl pb-12"
    >
      <div className="absolute top-0 left-0 right-0 z-50">
        <StatusBar dark={app.id === 'settings' || app.id === 'notes'} />
      </div>

      <div className="flex-1 w-full relative">
        <div className="absolute inset-0 flex flex-col">
          <app.component />
        </div>
      </div>
    </motion.div>
  );
}
