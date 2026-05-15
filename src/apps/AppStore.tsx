import React, { useState } from 'react';
import { useOS } from '../context/OSContext';
import { storeCatalog } from '../config/storeCatalog';
import { Download, Trash2, Search } from 'lucide-react';

export default function AppStore() {
  const { installedApps, installApp, uninstallApp } = useOS();
  const [search, setSearch] = useState('');

  const filteredCatalog = storeCatalog.filter(app => app.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] dark:bg-black pt-16 p-4">
      <h1 className="text-3xl font-bold mb-6 px-2 dark:text-white">App Store</h1>

      <div className="bg-gray-200 dark:bg-[#1c1c1e] p-3 rounded-2xl flex items-center mb-6">
        <Search size={20} className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search Web Apps..." 
          className="bg-transparent outline-none flex-1 dark:text-white"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        <div className="space-y-4">
          {filteredCatalog.map(app => {
            const isInstalled = installedApps.includes(app.id);
            return (
              <div key={app.id} className="bg-white dark:bg-[#1c1c1e] p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${app.color}`}>
                    <app.icon size={24} className={!app.color.includes('text-black') ? 'text-white' : ''} />
                  </div>
                  <div>
                    <h3 className="font-semibold dark:text-white">{app.name}</h3>
                    <p className="text-xs text-gray-500">Web App</p>
                  </div>
                </div>
                {isInstalled ? (
                  <button onClick={() => uninstallApp(app.id)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-[#2c2c2e] text-red-500 rounded-full text-sm font-medium">
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <button onClick={() => installApp(app.id)} className="flex items-center gap-1 px-4 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium">
                    <Download size={16} /> GET
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
