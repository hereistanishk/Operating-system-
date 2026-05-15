import Calculator from '../apps/Calculator';
import Notes from '../apps/Notes';
import Weather from '../apps/Weather';
import Settings from '../apps/Settings';
import Browser from '../apps/Browser';
import AppStore from '../apps/AppStore';
import { Calculator as CalcIcon, FileText, CloudSun, Settings as SettingsIcon, Globe, ShoppingBag } from 'lucide-react';
import type { AppMeta } from '../types';

export const apps: AppMeta[] = [
  {
    id: 'calculator',
    name: 'Calculator',
    icon: CalcIcon,
    color: 'bg-orange-500 text-white',
    component: Calculator,
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: FileText,
    color: 'bg-[#eab308] text-black',
    component: Notes,
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: CloudSun,
    color: 'bg-gradient-to-br from-indigo-600 to-blue-500 text-white',
    component: Weather,
  },
  {
    id: 'appstore',
    name: 'App Store',
    icon: ShoppingBag,
    color: 'bg-blue-600 text-white',
    component: AppStore,
  },
  {
    id: 'browser',
    name: 'Safari',
    icon: Globe,
    color: 'bg-sky-500 text-white',
    component: Browser,
    inDock: true,
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: SettingsIcon,
    color: 'bg-zinc-800 border border-white/20 text-white',
    component: Settings,
    inDock: true,
  }
];
