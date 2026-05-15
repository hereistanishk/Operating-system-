import React from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';

export default function Weather() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-400 to-blue-300 text-white p-6 pt-16">
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-3xl font-medium tracking-wide">Cupertino</h2>
        <div className="text-xl opacity-90">Cloudy</div>
        <div className="text-[120px] font-thin leading-none tracking-tighter my-4">68°</div>
        <div className="text-xl font-medium">H: 72°  L: 55°</div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 flex justify-between items-center mb-8">
        <div className="flex flex-col items-center">
          <CloudSun size={28} className="mb-2" />
          <span className="text-sm font-medium">Now</span>
          <span className="text-lg">68°</span>
        </div>
        <div className="flex flex-col items-center">
          <CloudSun size={28} className="mb-2" />
          <span className="text-sm font-medium">10 AM</span>
          <span className="text-lg">70°</span>
        </div>
        <div className="flex flex-col items-center">
          <CloudSun size={28} className="mb-2" />
          <span className="text-sm font-medium">11 AM</span>
          <span className="text-lg">72°</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 flex flex-col">
          <div className="flex gap-2 items-center text-white/70 text-sm font-semibold mb-2">
            <Wind size={16} /> WIND
          </div>
          <span className="text-2xl font-semibold">12 <span className="text-base text-white/70">mph</span></span>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-4 flex flex-col">
          <div className="flex gap-2 items-center text-white/70 text-sm font-semibold mb-2">
            <Droplets size={16} /> HUMIDITY
          </div>
          <span className="text-2xl font-semibold">45%</span>
        </div>
      </div>
    </div>
  );
}
