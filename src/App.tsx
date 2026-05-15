import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StatusBar from './components/StatusBar';
import LockScreen from './components/LockScreen';
import AppGrid from './components/AppGrid';
import Dock from './components/Dock';
import Window from './components/Window';
import NavigationBar from './components/NavigationBar';
import RecentsView from './components/RecentsView';
import { apps as systemApps } from './config/apps';
import { storeCatalog } from './config/storeCatalog';
import { cn } from './lib/utils';
import { useOS } from './context/OSContext';

const allApps = [...systemApps, ...storeCatalog];

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [openedAppId, setOpenedAppId] = useState<string | null>(null);
  const [recentApps, setRecentApps] = useState<string[]>([]);
  const [showRecents, setShowRecents] = useState(false);
  const { wallpaper, installedApps } = useOS();

  const handleOpenApp = (id: string) => {
    setOpenedAppId(id);
    setShowRecents(false);
    setRecentApps(prev => {
      const filtered = prev.filter(appId => appId !== id);
      return [id, ...filtered];
    });
  };

  const activeApp = allApps.find(a => a.id === openedAppId);
  const isDarkNav = activeApp && ['settings', 'notes', 'browser', 'appstore'].includes(activeApp.id) && !showRecents;

  const visibleApps = allApps.filter(a => installedApps.includes(a.id));

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-900 sm:p-8">
      {/* Phone container */}
      <div 
        className={cn(
          "relative h-full w-full overflow-hidden bg-black",
          "sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] sm:border-[14px] sm:border-black sm:shadow-2xl"
        )}
      >
        <div 
          className={cn("absolute inset-0 bg-cover bg-center transition-all duration-500", !wallpaper.startsWith('http') && wallpaper)} 
          style={wallpaper.startsWith('http') ? { backgroundImage: `url("${wallpaper}")` } : undefined}
        />

        <AnimatePresence>
          {isLocked && (
            <LockScreen key="lock" onUnlock={() => setIsLocked(false)} />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col z-10 pb-12">
          <StatusBar dark={false} />
          <AnimatePresence>
            {!activeApp && !showRecents && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center">
                <AppGrid apps={visibleApps} onOpenApp={handleOpenApp} />
                <Dock apps={visibleApps} onOpenApp={handleOpenApp} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeApp && (
            <Window 
              key={activeApp.id} 
              app={activeApp} 
              onClose={() => setOpenedAppId(null)} 
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRecents && (
            <RecentsView 
              apps={allApps}
              recentApps={recentApps} 
              onSelectApp={handleOpenApp} 
              onClose={() => setShowRecents(false)}
              onRemoveApp={(id) => setRecentApps(prev => prev.filter(appId => appId !== id))}
            />
          )}
        </AnimatePresence>

        {!isLocked && (
          <div className="absolute bottom-0 left-0 right-0 z-[60]">
            <NavigationBar 
              onBack={() => {
                setOpenedAppId(null);
                setShowRecents(false);
              }} 
              onHome={() => {
                setOpenedAppId(null);
                setShowRecents(false);
              }} 
              onRecents={() => {
                setShowRecents(!showRecents);
              }} 
              dark={isDarkNav as boolean}
            />
          </div>
        )}
      </div>
    </div>
  );
}
