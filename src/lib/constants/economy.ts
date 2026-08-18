import { StoreItem, CoinPack } from '@/types';

export const ECONOMY_RULES = {
  // Conversion base: 1 USD ≈ 500 Coins
  COINS_PER_USD: 500,
  ARS_PER_USD: 1200,

  // Faucets (Ingresos de Monedas Gratis)
  DAILY_VOTE_COIN_REWARD: 1,
  MAX_DAILY_VOTE_COINS: 50,

  // Rake de Plataforma en Duelos 1v1 (10% quemado)
  DUEL_RAKE_PERCENT: 0.10,

  // Costos de Consumibles
  COST_SUPER_AURA_VOTE: 50,
  COST_SPOTLIGHT_24H: 600,
  COST_IMAGE_CLEANSE: 400,
};

export const COIN_PACKS: CoinPack[] = [
  {
    id: 'pack-starter',
    name: 'Starter Aura',
    coinsBase: 450,
    coinsBonus: 50,
    totalCoins: 500,
    priceUsd: 0.99,
    priceArs: 1200,
    badgeText: 'GANCHO INICIAL',
    isPopular: false,
    colorGradient: 'from-zinc-800 to-zinc-900 border-zinc-700',
  },
  {
    id: 'pack-canchero',
    name: 'Pack Canchero',
    coinsBase: 1500,
    coinsBonus: 500,
    totalCoins: 2000,
    priceUsd: 3.49,
    priceArs: 4200,
    badgeText: '+33% EXTRA',
    isPopular: false,
    colorGradient: 'from-emerald-950/80 to-zinc-900 border-emerald-500/40',
  },
  {
    id: 'pack-aura-master',
    name: 'Aura Master Pack',
    coinsBase: 5000,
    coinsBonus: 2500,
    totalCoins: 7500,
    priceUsd: 9.99,
    priceArs: 12000,
    badgeText: 'MÁS POPULAR • 50% EXTRA',
    isPopular: true,
    colorGradient: 'from-cyan-950/90 via-indigo-950 to-zinc-950 border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.4)]',
  },
  {
    id: 'pack-gigachad-vault',
    name: 'Gigachad Vault',
    coinsBase: 15000,
    coinsBonus: 10000,
    totalCoins: 25000,
    priceUsd: 29.99,
    priceArs: 36000,
    badgeText: 'MEJOR VALOR • 66% EXTRA',
    isPopular: false,
    colorGradient: 'from-amber-950/90 via-yellow-950 to-zinc-950 border-amber-400/80 shadow-[0_0_30px_rgba(251,191,36,0.4)]',
  },
];

export const STORE_ITEMS_CATALOG: StoreItem[] = [
  // Laura Emergency Pack (Conditional)
  {
    id: 'laura-emergency-pack',
    name: 'Laura Emergency Pack',
    description: '1 Limpieza de Imagen + Skin de Redención "Fénix de Aura" + 200 Aura Points inmediatos.',
    type: 'RECOVERY_PACK',
    price_coins: 350,
    aura_grant_amount: 200,
    is_laura_exclusive: true,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    badgeText: '60% OFF BANCARROTA',
  },

  // Consumibles
  {
    id: 'item-spotlight',
    name: 'Aura Spotlight (24 hs)',
    description: 'Tu clip aparece primero en el Tribunal de todos los usuarios durante 24 horas.',
    type: 'BOOSTER',
    price_coins: ECONOMY_RULES.COST_SPOTLIGHT_24H,
    aura_grant_amount: 0,
    is_laura_exclusive: false,
    image_url: '',
    badgeText: 'BOOSTER DE FEED',
  },
  {
    id: 'item-cleanse',
    name: 'Limpieza de Imagen (Cleanse)',
    description: 'Elimina un clip fallido de tu historial y recupera los Aura Points restados por Laura.',
    type: 'CLEANSE',
    price_coins: ECONOMY_RULES.COST_IMAGE_CLEANSE,
    aura_grant_amount: 0,
    is_laura_exclusive: false,
    image_url: '',
    badgeText: 'REPARAR HISTORIAL',
  },

  // Cosméticos Permanentes
  {
    id: 'skin-frame-canchero',
    name: 'Marco Esmeralda Canchero',
    description: 'Marco reluciente verde esmeralda para destacar tu avatar en todos los duelos.',
    type: 'SKIN_AVATAR',
    price_coins: 1000,
    aura_grant_amount: 50,
    is_laura_exclusive: false,
    image_url: '',
  },
  {
    id: 'skin-frame-aura-master',
    name: 'Marco Cian Neón Resplandeciente',
    description: 'Marco con halo de energía cian en alta definición.',
    type: 'SKIN_AVATAR',
    price_coins: 2500,
    aura_grant_amount: 150,
    is_laura_exclusive: false,
    image_url: '',
  },
  {
    id: 'skin-frame-gigachad',
    name: 'Marco Gigachad Dorado Animado',
    description: 'Efecto dorado supremo con aura de partículas y rayos intermitentes.',
    type: 'SKIN_AVATAR',
    price_coins: 6000,
    aura_grant_amount: 500,
    is_laura_exclusive: false,
    image_url: '',
    badgeText: 'GIGACHAD LEGENDARIO',
  },
];
