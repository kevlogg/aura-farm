import { RankTier } from '@/types';

export interface RankInfo {
  tier: RankTier;
  minPoints: number;
  maxPoints: number;
  color: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  description: string;
}

export const RANK_CONFIG: Record<RankTier, RankInfo> = {
  NPC: {
    tier: 'NPC',
    minPoints: 0,
    maxPoints: 499,
    color: '#a1a1aa', // zinc-400
    badgeBg: 'bg-zinc-800',
    badgeText: 'text-zinc-300',
    glowColor: 'rgba(161, 161, 170, 0.2)',
    description: 'Sin aura relevante. Votando en el Tribunal para ganar Aura Coins.',
  },
  Canchero: {
    tier: 'Canchero',
    minPoints: 500,
    maxPoints: 1999,
    color: '#34d399', // emerald-400
    badgeBg: 'bg-emerald-950/80 border border-emerald-500/40',
    badgeText: 'text-emerald-300',
    glowColor: 'rgba(52, 211, 153, 0.4)',
    description: 'Destacado de barrio. Tus clips empiezan a resonar en el Tribunal.',
  },
  'Aura Master': {
    tier: 'Aura Master',
    minPoints: 2000,
    maxPoints: 4999,
    color: '#22d3ee', // cyan-400
    badgeBg: 'bg-cyan-950/90 border border-cyan-400/60',
    badgeText: 'text-cyan-300 font-extrabold',
    glowColor: 'rgba(34, 211, 238, 0.6)',
    description: 'Dominante del Feed. El algoritmo del Tribunal favorece tus clips.',
  },
  Gigachad: {
    tier: 'Gigachad',
    minPoints: 5000,
    maxPoints: 999999,
    color: '#fbbf24', // amber-400
    badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-600 border border-yellow-300',
    badgeText: 'text-black font-black uppercase tracking-wider',
    glowColor: 'rgba(251, 191, 36, 0.8)',
    description: 'Estatus legendario. Máxima respetabilidad en el multiverso del Aura.',
  },
};

export function getRankTier(auraPoints: number): RankTier {
  if (auraPoints >= 5000) return 'Gigachad';
  if (auraPoints >= 2000) return 'Aura Master';
  if (auraPoints >= 500) return 'Canchero';
  return 'NPC';
}

export function getRankProgress(auraPoints: number): {
  currentTier: RankTier;
  nextTier: RankTier | null;
  progressPercent: number;
  pointsToNext: number;
} {
  const currentTier = getRankTier(auraPoints);
  const info = RANK_CONFIG[currentTier];

  if (currentTier === 'Gigachad') {
    return {
      currentTier: 'Gigachad',
      nextTier: null,
      progressPercent: 100,
      pointsToNext: 0,
    };
  }

  const range = info.maxPoints + 1 - info.minPoints;
  const currentPointsInTier = auraPoints - info.minPoints;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentPointsInTier / range) * 100)));
  const pointsToNext = info.maxPoints + 1 - auraPoints;

  const nextTierMap: Record<RankTier, RankTier | null> = {
    NPC: 'Canchero',
    Canchero: 'Aura Master',
    'Aura Master': 'Gigachad',
    Gigachad: null,
  };

  return {
    currentTier,
    nextTier: nextTierMap[currentTier],
    progressPercent,
    pointsToNext,
  };
}
