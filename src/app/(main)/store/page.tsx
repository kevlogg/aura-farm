'use client';

import React from 'react';
import { ShoppingBag, Coins, ShieldAlert, Sparkles, Zap, Trash2, CreditCard } from 'lucide-react';

export default function StorePage() {
  const coinPacks = [
    { coins: 500, price: '$2.99 USD / $3.500 ARS', badge: 'Popular' },
    { coins: 2000, price: '$9.99 USD / $11.500 ARS', badge: 'Mejor Valor' },
    { coins: 5000, price: '$22.99 USD / $26.000 ARS', badge: 'Gigachad Pack' },
  ];

  const storeItems = [
    {
      id: 'item-1',
      name: 'Marco Gigachad Dorado',
      type: 'SKIN_AVATAR',
      price: 1500,
      auraBonus: '+300 Aura',
      description: 'Otorga un resplandor dorado garantizado en tu avatar durante todos los duelos.',
      icon: Sparkles,
      color: 'text-amber-400 border-amber-500/40 bg-amber-950/30',
    },
    {
      id: 'item-2',
      name: 'Limpieza de Imagen (Cleanse)',
      type: 'CLEANSE',
      price: 800,
      auraBonus: 'Restaura Puntos',
      description: 'Elimina un clip fallido de tu historial y recupera los Aura Points restados por Laura.',
      icon: Trash2,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30',
    },
    {
      id: 'item-3',
      name: 'Aura Spotlight (24 hs)',
      type: 'BOOSTER',
      price: 1200,
      auraBonus: 'Prioridad Feed',
      description: 'Tu clip aparece primero en el Tribunal de todos los usuarios durante 24 horas.',
      icon: Zap,
      color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/30',
    },
  ];

  return (
    <div className="space-y-6 pt-2 pb-8">
      {/* Laura Emergency Pack Banner (Conditional offer) */}
      <div className="bg-gradient-to-r from-amber-950 via-red-950 to-stone-900 border-2 border-amber-500/80 rounded-3xl p-5 shadow-[0_0_25px_rgba(245,158,11,0.3)] space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
          <ShieldAlert className="w-5 h-5" />
          <span>Laura Emergency Recovery Pack</span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          ¿Caíste en Bancarrota de Aura? Desbloquea este Pack con 60% OFF en Skins de rescate y limpia tu estado humillante al instante.
        </p>
        <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black text-xs shadow-md transition-all">
          Comprar Emergency Pack (500 Coins)
        </button>
      </div>

      {/* Buy Aura Coins (Mercado Pago / Stripe) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-2">
          <Coins className="w-4 h-4 text-amber-400" /> Recargar Aura Coins
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {coinPacks.map((pack) => (
            <div
              key={pack.coins}
              className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-md"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-amber-300">{pack.coins} Coins</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">
                    {pack.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{pack.price}</p>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs shadow-md">
                <CreditCard className="w-3.5 h-3.5" /> Comprar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items & Cosmetics Store */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Skins & Boosters
        </h3>
        <div className="space-y-3">
          {storeItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`border ${item.color} rounded-2xl p-4 backdrop-blur-xl shadow-lg space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-black/40 flex items-center justify-center border border-white/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                      <span className="text-[10px] font-bold text-cyan-400">{item.auraBonus}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                    {item.price} Coins
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{item.description}</p>
                <button className="w-full mt-2 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-100 font-bold text-xs transition-all border border-zinc-700">
                  Canjear Objeto
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
