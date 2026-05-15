import React, { useState } from 'react';
import { Wifi, Bluetooth, Zap, Bell, Moon, Paintbrush, Shield, ChevronLeft } from 'lucide-react';
import { useOS } from '../context/OSContext';

export default function Settings() {
  const { wallpaper, setWallpaper, privacy, updatePrivacy } = useOS();
  const [view, setView] = useState<'main' | 'customization' | 'privacy'>('main');

  const settingsRows = [
    { icon: <Wifi size={18} className="text-white" />, title: 'Wi-Fi', value: 'Connected', color: 'bg-blue-500' },
    { icon: <Bluetooth size={18} className="text-white" />, title: 'Bluetooth', value: 'Off', color: 'bg-blue-500' },
    { icon: <Zap size={18} className="text-white" />, title: 'Battery', value: '84%', color: 'bg-green-500' },
  ];
  
  const additionalRows = [
    { icon: <Bell size={18} className="text-white" />, title: 'Notifications', color: 'bg-red-500' },
    { icon: <Moon size={18} className="text-white" />, title: 'Do Not Disturb', color: 'bg-indigo-500' },
  ];

  const osRows = [
    { icon: <Paintbrush size={18} className="text-white" />, title: 'Customization', color: 'bg-purple-500', id: 'customization' },
    { icon: <Shield size={18} className="text-white" />, title: 'Privacy & Security', color: 'bg-slate-500', id: 'privacy' },
  ];

  const wallpapers = [
    { id: 'bg-[#0B0D12]', label: 'Dark Mode' },
    { id: 'bg-gradient-to-br from-indigo-500 to-purple-600', label: 'Indigo Purple' },
    { id: 'bg-gradient-to-br from-blue-400 to-emerald-400', label: 'Ocean Breeze' },
    { id: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2832&auto=format&fit=crop', label: 'Abstract Sand' },
    { id: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop', label: 'Neon Lines' },
  ];

  if (view === 'customization') {
    return (
      <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-black pt-12 p-4">
        <div className="flex items-center mb-6 px-1">
          <button onClick={() => setView('main')} className="text-blue-500 flex items-center p-1 -ml-2">
             <ChevronLeft size={24} />
             <span className="text-lg">Settings</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 px-2 dark:text-white">Customization</h1>
        <div className="px-2 mb-2 text-sm font-medium text-gray-500 uppercase tracking-widest">Wallpaper</div>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {wallpapers.map((wp, i) => (
            <button key={i} onClick={() => setWallpaper(wp.id)} className="w-full flex items-center justify-between p-4 text-left">
              <span className="font-medium dark:text-white">{wp.label}</span>
              {wallpaper === wp.id && <span className="text-blue-500">✓</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'privacy') {
    return (
      <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-black pt-12 p-4">
        <div className="flex items-center mb-6 px-1">
          <button onClick={() => setView('main')} className="text-blue-500 flex items-center p-1 -ml-2">
             <ChevronLeft size={24} />
             <span className="text-lg">Settings</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 px-2 dark:text-white">Privacy</h1>
        <div className="px-2 mb-2 text-sm font-medium text-gray-500 uppercase tracking-widest">App Permissions</div>
        <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex flex-row items-center justify-between p-4">
              <span className="font-medium dark:text-white capitalize">{key}</span>
              <button 
                onClick={() => updatePrivacy({ [key as keyof typeof privacy]: !value })}
                className={`w-12 h-7 rounded-full transition-colors relative ${value ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full absolute top-0.5 transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-black pt-16 p-4">
      <h1 className="text-3xl font-bold mb-6 px-2 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 mb-6">
        {settingsRows.map((row, i) => (
          <div key={i} className="flex flex-row items-center justify-between p-3 px-4">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${row.color}`}>
                {row.icon}
              </div>
              <span className="font-medium dark:text-white">{row.title}</span>
            </div>
            {row.value && <span className="text-gray-500 dark:text-gray-400">{row.value}</span>}
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 mb-6">
        {additionalRows.map((row, i) => (
          <div key={i} className="flex flex-row items-center justify-between p-3 px-4">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${row.color}`}>
                {row.icon}
              </div>
              <span className="font-medium dark:text-white">{row.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 mb-6">
        {osRows.map((row, i) => (
          <button key={i} onClick={() => setView(row.id as any)} className="flex flex-row items-center justify-between p-3 px-4 w-full text-left hover:bg-gray-50 dark:hover:bg-[#2c2c2e] transition-colors">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${row.color}`}>
                {row.icon}
              </div>
              <span className="font-medium dark:text-white">{row.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
