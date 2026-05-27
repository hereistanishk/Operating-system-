import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface OSState {
  user: string;
  loginAsGuest: () => void;
  wallpaper: string;
  setWallpaper: (w: string) => void;
  privacy: {
    location: boolean;
    camera: boolean;
    microphone: boolean;
    tracking: boolean;
  };
  updatePrivacy: (p: Partial<OSState['privacy']>) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  installedApps: string[];
  installApp: (id: string) => void;
  uninstallApp: (id: string) => void;
}

const OSContext = createContext<OSState | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => localStorage.getItem('os_user') || '');

  const [wallpaper, setWallpaper] = useState(() => 
    localStorage.getItem('os_wallpaper') || 'bg-[#0B0D12]'
  );
  
  const [privacy, setPrivacyState] = useState(() => {
    const saved = localStorage.getItem('os_privacy');
    return saved ? JSON.parse(saved) : { location: false, camera: false, microphone: false, tracking: false };
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('os_darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [installedApps, setInstalledApps] = useState<string[]>(() => {
    const saved = localStorage.getItem('os_installedApps');
    const parsed = saved ? JSON.parse(saved) : ['calculator', 'notes', 'weather', 'browser', 'settings', 'appstore'];
    if (!parsed.includes('ecommerce')) parsed.push('ecommerce');
    if (!parsed.includes('seller')) parsed.push('seller');
    return parsed;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('os_user', user);
      localStorage.setItem('os_wallpaper', wallpaper);
      localStorage.setItem('os_privacy', JSON.stringify(privacy));
      localStorage.setItem('os_darkMode', JSON.stringify(darkMode));
      localStorage.setItem('os_installedApps', JSON.stringify(installedApps));
    }
  }, [user, wallpaper, privacy, darkMode, installedApps]);

  const loginAsGuest = () => setUser('Guest');

  const updatePrivacy = (p: Partial<OSState['privacy']>) => {
    setPrivacyState(prev => ({ ...prev, ...p }));
  };

  const installApp = (id: string) => setInstalledApps(prev => [...new Set([...prev, id])]);
  const uninstallApp = (id: string) => setInstalledApps(prev => prev.filter(a => a !== id));

  return (
    <OSContext.Provider value={{
      user, loginAsGuest,
      wallpaper, setWallpaper,
      privacy, updatePrivacy,
      darkMode, setDarkMode,
      installedApps, installApp, uninstallApp
    }}>
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error('useOS must be used within OSProvider');
  return ctx;
}
