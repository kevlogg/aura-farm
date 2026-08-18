'use client';

import React from 'react';
import { Flame, Coins, ShieldAlert } from 'lucide-react';

interface TopHeaderProps {
  auraPoints?: number;
  auraCoins?: number;
  rankTier?: string;
  isInLauraState?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  auraPoints = 1450,
  auraCoins = 180,
  rankTier = 'Canchero',
  isInLauraState = false,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full max-w-md mx-auto bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between shadow-md">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Flame className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
          AURA FARM
        </span>
      </div>

      {/* User Stats Pills */}
      <div className="flex items-center gap-2">
        {isInLauraState && (
          <div className="flex items-center gap-1 bg-amber-950 border border-amber-500/60 px-2 py-0.5 rounded-full text-amber-400 text-[10px] font-black animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            BANKRUPT
          </div>
        )}

        {/* Aura Points */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/60 px-2.5 py-1 rounded-full">
          <Flame className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          <span className="text-xs font-black text-cyan-300">{auraPoints.toLocaleString()}</span>
        </div>

        {/* Aura Coins */}
        <div className="flex items-center gap-1.5 bg-amber-950/60 border border-amber-500/40 px-2.5 py-1 rounded-full">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black text-amber-300">{auraCoins.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
};
