import React from "react";

interface ProgressBarProps {
  total: number;
  completed: number;
}

export function ProgressBar({ total, completed }: ProgressBarProps) {
  const percentage = Math.round((completed / total) * 100) || 0;
  // Fake level calculation: 1 level per achievement or just based on %
  const level = Math.floor(percentage / 2) + 1;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 text-center">
      <div className="flex justify-between items-end mb-2 px-4 font-serif text-skyrim-gold tracking-widest uppercase">
        <span className="text-xl">Niveau {level}</span>
        <span className="text-sm text-skyrim-light">{percentage}% Complété</span>
      </div>
      
      <div className="relative h-4 w-full bg-black/60 border border-skyrim-steel/50 transform skew-x-[-20deg]">
        <div 
          className="h-full bg-linear-to-r from-skyrim-red/80 to-skyrim-red transition-all duration-1000 ease-out border-r border-skyrim-gold/50"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Decorative center diamond */}
      <div className="flex justify-center -mt-2.5">
        <div className="w-5 h-5 bg-black border-2 border-skyrim-gold rotate-45 z-10"></div>
      </div>
    </div>
  );
}
