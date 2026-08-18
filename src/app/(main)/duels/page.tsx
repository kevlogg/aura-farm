'use client';

import React from 'react';
import { Swords, Trophy, Flame, Users, Shield } from 'lucide-react';

export default function DuelsPage() {
  const duelTiers = [
    {
      tier: 'Bronce',
      entryFee: 100,
      prizePool: 180,
      activeDuels: 24,
      borderColor: 'border-amber-700/60',
      bgColor: 'bg-amber-950/30',
      textColor: 'text-amber-400',
    },
    {
      tier: 'Plata',
      entryFee: 500,
      prizePool: 900,
      activeDuels: 12,
      borderColor: 'border-slate-400/60',
      bgColor: 'bg-slate-900/50',
      textColor: 'text-slate-200',
    },
    {
      tier: 'Oro',
      entryFee: 2000,
      prizePool: 3600,
      activeDuels: 5,
      borderColor: 'border-yellow-400/80',
      bgColor: 'bg-amber-900/40 shadow-[0_0_20px_rgba(251,191,36,0.2)]',
      textColor: 'text-amber-300 font-black',
    },
  ];

  return (
    <div className="space-y-6 pt-2 pb-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-zinc-900 to-cyan-950 border border-indigo-500/30 rounded-3xl p-5 text-center space-y-2 relative overflow-hidden shadow-xl">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-400">
          <Swords className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-xl font-black text-white">Duelos 1v1 Asincrónicos</h2>
        <p className="text-xs text-zinc-400">
          Desafía a otros creadores en batallas de 24 hs. El público decide en el Feed de Batallas quién tiene más Aura.
        </p>
      </div>

      {/* Duel Tier Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">Salas de Matchmaking</h3>
        {duelTiers.map((t) => (
          <div
            key={t.tier}
            className={`border ${t.borderColor} ${t.bgColor} backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between shadow-lg transition-transform hover:scale-[1.02]`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-base font-extrabold ${t.textColor}`}>Tier {t.tier}</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full font-bold">
                  {t.activeDuels} Duelos Activos
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span>Entrada: <strong className="text-amber-400">{t.entryFee} Coins</strong></span>
                <span>Pozo: <strong className="text-emerald-400">{t.prizePool} Coins</strong></span>
              </div>
            </div>
            <button className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-black text-xs shadow-md transition-all">
              Entrar al Duelo
            </button>
          </div>
        ))}
      </div>

      {/* Active Battle Feed Mock */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1">Duelo en Vivo Destacado</h3>
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Tier Oro (3,600 Coins)
            </span>
            <span className="text-zinc-500">Termina en 04h 12m</span>
          </div>

          {/* VS Matchup */}
          <div className="grid grid-cols-2 gap-2 text-center relative">
            <div className="bg-zinc-950 p-3 rounded-xl border border-cyan-500/30">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=acro" className="w-10 h-10 mx-auto rounded-full mb-1 border border-cyan-400" />
              <p className="font-bold text-xs text-white">@acro_mateo</p>
              <p className="text-[10px] text-cyan-400 font-extrabold mt-1">68% Aura</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-rose-500/30">
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=skate" className="w-10 h-10 mx-auto rounded-full mb-1 border border-rose-400" />
              <p className="font-bold text-xs text-white">@skate_master</p>
              <p className="text-[10px] text-rose-400 font-extrabold mt-1">32% Aura</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white font-black text-xs w-7 h-7 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-md">
              VS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
