import React from 'react';
import { Gamepad2, Search, BookOpen, Code, Github, Map, Compass, Rocket } from 'lucide-react';
import WebApp from '../apps/WebApp';
import type { AppMeta } from '../types';

export const storeCatalog: AppMeta[] = [
  { id: 'grandpath', name: 'GrandPath', icon: Map, color: 'bg-emerald-600 text-white', url: 'https://grandpath.vercel.app/', component: () => <WebApp url="https://grandpath.vercel.app/" /> },
  { id: 'nexus', name: 'Nexus App', icon: Rocket, color: 'bg-indigo-600 text-white', url: 'https://nexusapp-peach.vercel.app/', component: () => <WebApp url="https://nexusapp-peach.vercel.app/" /> },
  { id: '2048', name: '2048', icon: Gamepad2, color: 'bg-yellow-500 text-white', url: 'https://play2048.co/', component: () => <WebApp url="https://play2048.co/" /> },
  { id: 'github', name: 'GitHub', icon: Github, color: 'bg-zinc-800 text-white', url: 'https://github.com', component: () => <WebApp url="https://github.com" /> },
  { id: 'wikipedia', name: 'Wikipedia', icon: BookOpen, color: 'bg-gray-200 text-black', url: 'https://en.wikipedia.org/wiki/Main_Page', component: () => <WebApp url="https://en.wikipedia.org/wiki/Main_Page" /> },
  { id: 'devto', name: 'Dev.to', icon: Code, color: 'bg-black text-white', url: 'https://dev.to', component: () => <WebApp url="https://dev.to" /> },
  { id: 'maps', name: 'Maps', icon: Map, color: 'bg-green-500 text-white', url: 'https://www.google.com/maps/embed', component: () => <WebApp url="https://www.google.com/maps/embed" /> }
];
