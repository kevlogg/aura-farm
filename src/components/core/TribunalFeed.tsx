'use client';

import React, { useState } from 'react';
import { AuraCard } from './AuraCard';
import { Post, VoteType } from '@/types';
import { Flame, RefreshCw, Sparkles } from 'lucide-react';

interface TribunalFeedProps {
  initialPosts?: Post[];
  onVoteCast?: (postId: string, type: VoteType) => void;
}

const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    user_id: 'user-1',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-skater-doing-a-trick-in-a-skate-park-41556-large.mp4',
    caption: 'Caída épica intentando un Kickflip 360 pero me levanté como Gigachad 😎',
    aura_votes_count: 342,
    laura_votes_count: 21,
    super_aura_count: 45,
    is_promoted: true,
    created_at: new Date().toISOString(),
    profiles: {
      username: 'skate_master_99',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=skate',
      rank_tier: 'Aura Master',
      is_in_laura_state: false,
    },
  },
  {
    id: 'post-2',
    user_id: 'user-2',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-the-city-lights-42823-large.mp4',
    caption: 'Intenté tirar los prohibidos en el boliche y rompí el pantalón 💀',
    aura_votes_count: 12,
    laura_votes_count: 89,
    super_aura_count: 2,
    is_promoted: false,
    created_at: new Date().toISOString(),
    profiles: {
      username: 'brian_baile',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=brian',
      rank_tier: 'NPC',
      is_in_laura_state: true,
    },
  },
  {
    id: 'post-3',
    user_id: 'user-3',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-performing-a-backflip-on-the-beach-41484-large.mp4',
    caption: 'Backflip perfecto en la playa con atardecer de fondo. ¿Aura o Laura?',
    aura_votes_count: 1205,
    laura_votes_count: 14,
    super_aura_count: 180,
    is_promoted: false,
    created_at: new Date().toISOString(),
    profiles: {
      username: 'acro_mateo',
      avatar_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=acro',
      rank_tier: 'Gigachad',
      is_in_laura_state: false,
    },
  },
];

export const TribunalFeed: React.FC<TribunalFeedProps> = ({
  initialPosts = MOCK_POSTS,
  onVoteCast,
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleVote = (postId: string, type: VoteType) => {
    if (onVoteCast) {
      onVoteCast(postId, type);
    }
    // Avanza al siguiente clip en la pila
    setCurrentIndex((prev) => prev + 1);
  };

  const resetFeed = () => {
    setCurrentIndex(0);
  };

  const isCompleted = currentIndex >= posts.length;

  return (
    <div className="relative w-full max-w-sm h-[calc(100vh-140px)] min-h-[580px] mx-auto flex flex-col items-center justify-center p-2">
      {!isCompleted ? (
        <div className="relative w-full h-full">
          {posts.slice(currentIndex, currentIndex + 2).map((post, idx) => (
            <AuraCard
              key={post.id}
              post={post}
              onVote={handleVote}
              isFront={idx === 0}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-zinc-900/90 border border-zinc-800 rounded-3xl w-full backdrop-blur-xl shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">¡Tribunal Completado!</h3>
            <p className="text-zinc-400 text-xs mt-1">
              Has juzgado todos los Aura Moves disponibles por ahora. Ganaste +{posts.length} Aura Coins por tus votos de hoy.
            </p>
          </div>
          <button
            onClick={resetFeed}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Recargar Feed
          </button>
        </div>
      )}
    </div>
  );
};
