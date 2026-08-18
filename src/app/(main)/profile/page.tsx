'use client';

import React from 'react';
import { getRankProgress, RANK_CONFIG } from '@/lib/utils/aura-rank';
import { Flame, Coins, ShieldAlert, Award, Video, Zap, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const user = {
    username: 'canchero_alpha',
    avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=canchero',
    aura_points: 1450,
    aura_coins: 180,
    is_in_laura_state: false,
    streak_days: 5,
  };

  const rankProgress = getRankProgress(user.aura_points);
  const currentRankInfo = RANK_CONFIG[rankProgress.currentTier];

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Profile Header Card */}
      <div
        className={`border-2 ${
          user.is_in_laura_state
            ? 'border-amber-600/80 bg-stone-950 shadow-amber-950/40'
            : 'border-cyan-500/40 bg-zinc-950 shadow-cyan-950/40'
        } rounded-3xl p-6 shadow-2xl relative overflow-hidden text-center space-y-4`}
      >
        {/* Avatar with Rank Frame */}
        <div className="relative w-24 h-24 mx-auto">
          <img
            src={user.avatar_url}
            alt={user.username}
            className={`w-full h-full rounded-full object-cover border-4 ${
              user.is_in_laura_state ? 'border-amber-600 grayscale' : 'border-cyan-400'
            } shadow-lg`}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500 text-black shadow-md border border-cyan-300">
            {rankProgress.currentTier}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-black text-white">@{user.username}</h2>
          <p className="text-xs text-zinc-400 mt-0.5">{currentRankInfo.description}</p>
        </div>

        {/* Laura Bankrupt Banner */}
        {user.is_in_laura_state && (
          <div className="bg-amber-950/90 border border-amber-500/60 p-3 rounded-2xl text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 animate-pulse">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>Perfil en Bancarrota de Aura (&gt;70% Laura)</span>
          </div>
        )}

        {/* Aura Progress Bar */}
        <div className="space-y-1.5 pt-2 text-left">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-zinc-400">Progreso a {rankProgress.nextTier || 'Máximo'}</span>
            <span className="text-cyan-300">{user.aura_points} / {rankProgress.pointsToNext + user.aura_points} Aura</span>
          </div>
          <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500 rounded-full"
              style={{ width: `${rankProgress.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center">
          <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
            <p className="text-[10px] text-zinc-400 font-bold uppercase">Aura Points</p>
            <p className="text-sm font-black text-cyan-300 flex items-center justify-center gap-1 mt-0.5">
              <Flame className="w-3.5 h-3.5 fill-cyan-400" /> {user.aura_points}
            </p>
          </div>
          <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
            <p className="text-[10px] text-zinc-400 font-bold uppercase">Aura Coins</p>
            <p className="text-sm font-black text-amber-300 flex items-center justify-center gap-1 mt-0.5">
              <Coins className="w-3.5 h-3.5" /> {user.aura_coins}
            </p>
          </div>
          <div className="p-2 bg-zinc-900/60 rounded-xl border border-zinc-800">
            <p className="text-[10px] text-zinc-400 font-bold uppercase">Racha Días</p>
            <p className="text-sm font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" /> {user.streak_days}d
            </p>
          </div>
        </div>
      </div>

      {/* User Clips History Mock */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-2">
          <Video className="w-4 h-4 text-cyan-400" /> Mis Aura Moves
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 space-y-2">
            <div className="w-full h-28 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-600">
              <Video className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-white truncate">Kickflip de Barrio</p>
            <div className="flex items-center justify-between text-[10px] font-extrabold">
              <span className="text-cyan-400">+340 Aura</span>
              <span className="text-rose-400">12 Laura</span>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 space-y-2">
            <div className="w-full h-28 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-600">
              <Video className="w-8 h-8" />
            </div>
            <p className="text-xs font-bold text-white truncate">Failed Dance Move</p>
            <div className="flex items-center justify-between text-[10px] font-extrabold">
              <span className="text-cyan-400">+10 Aura</span>
              <span className="text-rose-400">95 Laura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
