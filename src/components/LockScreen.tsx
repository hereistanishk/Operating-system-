import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion, useAnimation, PanInfo } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { useOS } from '../context/OSContext';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState(new Date());
  const controls = useAnimation();
  const { wallpaper, user, loginAsGuest } = useOS();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!user) return; // Prevent swipe to unlock if not logged in

    if (info.offset.y < -150) {
      controls.start({ y: -1000, opacity: 0 }).then(onUnlock);
    } else {
      controls.start({ y: 0, opacity: 1 });
    }
  };

  return (
    <motion.div
      drag={user ? "y" : false}
      dragConstraints={{ top: -200, bottom: 50 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute inset-0 z-50 flex flex-col items-center pt-24 text-white bg-black/20 backdrop-blur-md"
    >
      <div className="flex flex-col items-center">
        <Lock size={20} className="mb-2" />
        <div className="text-xl font-medium tracking-wide">
          {format(time, 'EEEE, MMMM d')}
        </div>
        <div className="text-8xl font-bold tracking-tighter mt-2">
          {format(time, 'h:mm')}
        </div>
      </div>
      
      <div className="mt-auto mb-12 flex flex-col items-center opacity-100">
        {!user ? (
          <button 
            onClick={loginAsGuest}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full backdrop-blur-md transition-colors"
          >
            <User size={20} />
            <span className="font-semibold">Login as Guest</span>
          </button>
        ) : (
          <div className="flex flex-col items-center opacity-80">
            <div className="w-32 h-1.5 bg-white/20 rounded-full mb-4 animate-pulse"></div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-white/60">Swipe up to open</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
