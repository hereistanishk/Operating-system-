import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

export default function StatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn(
      "h-12 w-full flex justify-between items-center px-6 transition-colors z-50",
      dark ? "text-black" : "text-white"
    )}>
      <div className="w-[100px] text-sm font-semibold tracking-tight">{format(time, 'h:mm')}</div>
      <div className="flex-1 flex justify-center">
        {/* Dynamic Island placeholder area */}
        <div className="h-7 w-32 bg-black rounded-full shadow-sm" />
      </div>
      <div className="w-[100px] flex justify-end gap-2 items-center opacity-80">
        <div className="flex space-x-[2px] items-end h-3">
          <div className={cn("w-1 h-1.5 rounded-full", dark ? "bg-black" : "bg-white")}></div>
          <div className={cn("w-1 h-2 rounded-full", dark ? "bg-black" : "bg-white")}></div>
          <div className={cn("w-1 h-2.5 rounded-full", dark ? "bg-black" : "bg-white")}></div>
          <div className={cn("w-1 h-3 rounded-full opacity-30", dark ? "bg-black" : "bg-white")}></div>
        </div>
        <div className="text-[10px] font-bold leading-none">5G</div>
        <div className={cn("w-[22px] h-3 border-[1.5px] rounded-[3px] relative flex items-center p-[1px]", dark ? "border-black/40" : "border-white/40")}>
          <div className={cn("h-full w-[80%] rounded-[1.5px]", dark ? "bg-black" : "bg-white")}></div>
          <div className={cn("absolute -right-1 w-[3px] h-1.5 rounded-r-[2px]", dark ? "bg-black/40" : "bg-white/40")}></div>
        </div>
      </div>
    </div>
  );
}
