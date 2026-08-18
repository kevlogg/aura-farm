'use client';

import React, { useState } from 'react';
import { COIN_PACKS, STORE_ITEMS_CATALOG, ECONOMY_RULES } from '@/lib/constants/economy';
import { CoinPack, StoreItem } from '@/types';
import {
  Coins,
  ShieldAlert,
  Sparkles,
  Zap,
  Trash2,
  CreditCard,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
  Crown,
  X,
} from 'lucide-react';

export default function StorePage() {
  const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
  const [activeTab, setActiveTab] = useState<'COINS' | 'CONSUMABLES' | 'COSMETICS'>('COINS');
  const [selectedPack, setSelectedPack] = useState<CoinPack | null>(null);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState<string | null>(null);

  // Simulación de estado de usuario
  const user = {
    auraCoins: 180,
    isInLauraState: true, // Para demostración del Laura Emergency Pack
  };

  const emergencyPack = STORE_ITEMS_CATALOG.find((i) => i.id === 'laura-emergency-pack');
  const consumables = STORE_ITEMS_CATALOG.filter((i) => i.type === 'BOOSTER' || i.type === 'CLEANSE');
  const cosmetics = STORE_ITEMS_CATALOG.filter((i) => i.type === 'SKIN_AVATAR');

  const handleBuyCoinPack = (pack: CoinPack) => {
    setSelectedPack(pack);
  };

  const handleRedeemItem = (item: StoreItem) => {
    if (user.auraCoins < item.price_coins) {
      alert(`Necesitas ${item.price_coins} Aura Coins para canjear este objeto.`);
      return;
    }
    setSelectedItem(item);
  };

  const confirmCoinPurchase = () => {
    if (selectedPack) {
      setPurchaseSuccessMessage(`¡Acreditaste +${selectedPack.totalCoins.toLocaleString()} Aura Coins!`);
      setSelectedPack(null);
      setTimeout(() => setPurchaseSuccessMessage(null), 3000);
    }
  };

  const confirmItemRedeem = () => {
    if (selectedItem) {
      setPurchaseSuccessMessage(`¡Canjeaste "${selectedItem.name}" exitosamente!`);
      setSelectedItem(null);
      setTimeout(() => setPurchaseSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-5 pt-2 pb-10">
      {/* Toast Notification */}
      {purchaseSuccessMessage && (
        <div className="sticky top-16 z-50 bg-emerald-500 text-black font-black text-xs p-3 rounded-2xl shadow-xl flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 fill-black text-emerald-500" />
          <span>{purchaseSuccessMessage}</span>
        </div>
      )}

      {/* Store Header Banner */}
      <div className="bg-gradient-to-r from-zinc-950 via-cyan-950 to-indigo-950 border border-cyan-500/30 rounded-3xl p-5 shadow-xl relative overflow-hidden space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Coins className="w-6 h-6 animate-pulse" />
            <h1 className="text-xl font-black text-white">Mercado de Aura</h1>
          </div>

          {/* ARS / USD Currency Selector */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-1 text-[10px] font-black">
            <button
              onClick={() => setCurrency('ARS')}
              className={`px-3 py-1 rounded-full transition-all ${
                currency === 'ARS' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🇦🇷 ARS
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full transition-all ${
                currency === 'USD' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🇺🇸 USD
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-400">
          Adquiere Coins para desbloquear Spotlight, limpiar tu historial o rescatar tu perfil de la Bancarrota.
        </p>
      </div>

      {/* LAURA EMERGENCY PACK BANNER (Diferenciado para rescatar usuarios) */}
      {emergencyPack && user.isInLauraState && (
        <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-stone-900 border-2 border-amber-500/80 rounded-3xl p-5 shadow-[0_0_30px_rgba(245,158,11,0.3)] space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="bg-amber-500 text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full flex items-center gap-1 shadow-md">
              <ShieldAlert className="w-3.5 h-3.5" /> {emergencyPack.badgeText}
            </span>
            <span className="text-xs text-amber-300 font-extrabold">Oferta por Bancarrota</span>
          </div>

          <div>
            <h3 className="text-base font-black text-white">{emergencyPack.name}</h3>
            <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">{emergencyPack.description}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 line-through">800 Coins</span>
              <span className="text-base font-black text-amber-300 flex items-center gap-1">
                <Coins className="w-4 h-4 text-amber-400" /> {emergencyPack.price_coins} Coins
              </span>
            </div>
            <button
              onClick={() => handleRedeemItem(emergencyPack)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 fill-black" /> Rescatar Perfil
            </button>
          </div>
        </div>
      )}

      {/* CATEGORY TABS */}
      <div className="grid grid-cols-3 gap-1 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 text-xs font-black">
        <button
          onClick={() => setActiveTab('COINS')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'COINS' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Packs Coins
        </button>
        <button
          onClick={() => setActiveTab('CONSUMABLES')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'CONSUMABLES' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Boosters
        </button>
        <button
          onClick={() => setActiveTab('COSMETICS')}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'COSMETICS' ? 'bg-cyan-500 text-black shadow-md' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Skins & Marcos
        </button>
      </div>

      {/* TAB 1: PAQUETES DE COINS (DINERO REAL) */}
      {activeTab === 'COINS' && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Recargas Oficiales con Mercado Pago / Stripe
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {COIN_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`border rounded-2xl p-4 bg-gradient-to-r ${pack.colorGradient} backdrop-blur-xl space-y-3 relative overflow-hidden shadow-lg`}
              >
                {pack.badgeText && (
                  <div className="inline-block bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
                    {pack.badgeText}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-black text-white">{pack.name}</h4>
                    <p className="text-xs text-zinc-300 font-bold flex items-center gap-1 mt-0.5">
                      <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-amber-300 text-base">{pack.totalCoins.toLocaleString()} Coins</span>
                      <span className="text-[10px] text-zinc-400 font-normal">
                        ({pack.coinsBase.toLocaleString()} + {pack.coinsBonus.toLocaleString()} bonus)
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleBuyCoinPack(pack)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    {currency === 'ARS' ? `$${pack.priceArs.toLocaleString()} ARS` : `$${pack.priceUsd} USD`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONSUMIBLES & BOOSTERS */}
      {activeTab === 'CONSUMABLES' && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" /> Herramientas Recurrentes de Feed
          </h3>
          <div className="space-y-3">
            {consumables.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2 backdrop-blur-xl shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400">
                      {item.type === 'BOOSTER' ? <Zap className="w-5 h-5 fill-amber-400 text-amber-400" /> : <Trash2 className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                      {item.badgeText && (
                        <span className="text-[10px] font-bold text-cyan-400">{item.badgeText}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> {item.price_coins}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => handleRedeemItem(item)}
                  className="w-full mt-2 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 active:scale-95 font-bold text-xs transition-all"
                >
                  Canjear por {item.price_coins} Coins
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COSMÉTICOS & SKINS */}
      {activeTab === 'COSMETICS' && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <Crown className="w-4 h-4 text-yellow-400" /> Marcos de Avatar y Títulos
          </h3>
          <div className="space-y-3">
            {cosmetics.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-2 backdrop-blur-xl shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                      <span className="text-[10px] font-bold text-emerald-400">+{item.aura_grant_amount} Aura Points</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5" /> {item.price_coins}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                <button
                  onClick={() => handleRedeemItem(item)}
                  className="w-full mt-2 py-2 rounded-xl bg-amber-500 text-black hover:bg-amber-400 active:scale-95 font-black text-xs transition-all shadow-md"
                >
                  Equipar por {item.price_coins} Coins
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE COMPRA CON DINERO REAL */}
      {selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 relative text-center">
            <button
              onClick={() => setSelectedPack(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Coins className="w-8 h-8 fill-amber-400" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{selectedPack.name}</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Recibirás <strong className="text-amber-300">{selectedPack.totalCoins.toLocaleString()} Coins</strong> en tu billetera.
              </p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs flex items-center justify-between">
              <span className="text-zinc-400 font-bold">Total a pagar:</span>
              <span className="text-emerald-400 font-black text-sm">
                {currency === 'ARS' ? `$${selectedPack.priceArs.toLocaleString()} ARS` : `$${selectedPack.priceUsd} USD`}
              </span>
            </div>

            <button
              onClick={confirmCoinPurchase}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" /> Pagar con Mercado Pago / Stripe
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE CANJE CON COINS */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 relative text-center">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{selectedItem.name}</h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedItem.description}</p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs flex items-center justify-between">
              <span className="text-zinc-400 font-bold">Costo del canje:</span>
              <span className="text-amber-300 font-black text-sm flex items-center gap-1">
                <Coins className="w-4 h-4 text-amber-400" /> {selectedItem.price_coins} Coins
              </span>
            </div>

            <button
              onClick={confirmItemRedeem}
              className="w-full py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-black font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirmar Canje
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
