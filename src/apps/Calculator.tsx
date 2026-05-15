import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    if (val === '=') {
      try {
        // Safe evaluation simulation
        const result = new Function('return ' + display.replace(/x/g, '*'))();
        setEquation(display + '=');
        setDisplay(String(result));
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    setDisplay(prev => {
      if (prev === '0' || prev === 'Error') return val;
      return prev + val;
    });
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-1 flex flex-col justify-end p-6 items-end pb-8">
        <div className="text-gray-400 text-2xl h-8">{equation}</div>
        <div className="text-7xl font-light tracking-tighter overflow-hidden text-right w-full">
          {display}
        </div>
      </div>
      <div className="p-4 grid gap-3 grid-cols-4 pb-12">
        {buttons.flat().map((btn, i) => (
          <motion.button
            whileTap={{ scale: 0.9 }}
            key={i}
            onClick={() => handlePress(btn)}
            className={cn(
              "h-16 rounded-full text-2xl font-medium flex items-center justify-center",
              btn === '0' ? "col-span-2 aspect-auto" : "aspect-square",
              ['/', 'x', '-', '+', '='].includes(btn) 
                ? "bg-amber-500 text-white" 
                : btn === 'C' ? "bg-gray-300 text-black" : "bg-gray-800 text-white"
            )}
          >
            {btn}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
