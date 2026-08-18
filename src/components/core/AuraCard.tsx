'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ShieldAlert, Flame, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Post, VoteType } from '@/types';

interface AuraCardProps {
  post: Post;
  onVote: (postId: string, type: VoteType) => void;
  isFront: boolean;
}

export const AuraCard: React.FC<AuraCardProps> = ({ post, onVote, isFront }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic gesture transformations
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const auraOpacity = useTransform(x, [20, 150], [0, 1]);
  const lauraOpacity = useTransform(x, [-20, -150], [0, 1]);
  const superAuraOpacity = useTransform(y, [-20, -150], [0, 1]);

  const [voteFeedback, setVoteFeedback] = useState<VoteType | null>(null);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      triggerVote('AURA');
    } else if (info.offset.x < -threshold) {
      triggerVote('LAURA');
    } else if (info.offset.y < -threshold) {
      triggerVote('SUPER_AURA');
    }
  };

  const triggerVote = (type: VoteType) => {
    setVoteFeedback(type);
    setTimeout(() => {
      onVote(post.id, type);
    }, 250);
  };

  if (!isFront) {
    return (
      <div className="absolute inset-0 rounded-3xl bg-zinc-900 border border-zinc-800 scale-95 opacity-50 transition-all pointer-events-none" />
    );
  }

  const isBankrupt = post.profiles.is_in_laura_state;

  return (
    <motion.div
      style={{ x, y, rotate }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
      className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl touch-none select-none border-2 ${
        isBankrupt ? 'border-amber-600/80 bg-stone-950 shadow-amber-900/30' : 'border-cyan-500/40 bg-zinc-950 shadow-cyan-950/40'
      }`}
    >
      {/* Background Video Player */}
      <video
        src={post.video_url}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Legibility Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/95 pointer-events-none" />

      {/* GESTURE OVERLAY STAMPS */}
      <motion.div
        style={{ opacity: auraOpacity }}
        className="absolute top-10 left-8 z-30 border-4 border-cyan-400 bg-cyan-950/90 backdrop-blur-md text-cyan-300 font-black text-3xl px-6 py-2 rounded-2xl rotate-[-12deg] flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
      >
        <Flame className="w-8 h-8 fill-cyan-400" />
        +AURA
      </motion.div>

      <motion.div
        style={{ opacity: lauraOpacity }}
        className="absolute top-10 right-8 z-30 border-4 border-rose-600 bg-rose-950/90 backdrop-blur-md text-rose-400 font-black text-3xl px-6 py-2 rounded-2xl rotate-[12deg] flex items-center gap-2 shadow-[0_0_25px_rgba(225,29,72,0.7)]"
      >
        <ShieldAlert className="w-8 h-8 text-rose-500" />
        LAURA (L)
      </motion.div>

      <motion.div
        style={{ opacity: superAuraOpacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 z-30 border-4 border-amber-400 bg-amber-950/95 backdrop-blur-md text-amber-300 font-black text-3xl px-8 py-3 rounded-3xl flex items-center gap-3 shadow-[0_0_35px_rgba(251,191,36,0.9)]"
      >
        <Zap className="w-10 h-10 fill-amber-400 animate-bounce" />
        SUPER AURA!
      </motion.div>

      {/* Promoted Spotlight Badge */}
      {post.is_promoted && (
        <div className="absolute top-4 left-4 z-20 bg-amber-500 text-black text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-lg tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-black" /> Spotlight
        </div>
      )}

      {/* AUTHOR & CLIP METADATA */}
      <div className="absolute bottom-6 left-4 right-4 z-20 flex flex-col gap-3">
        {/* Laura Bankrupt Banner */}
        {isBankrupt && (
          <div className="bg-amber-950/90 border border-amber-500/60 p-2.5 rounded-xl text-amber-300 text-xs font-semibold flex items-center gap-2 backdrop-blur-md animate-pulse">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>⚠️ Usuario en Bancarrota de Aura (&gt;70% Laura)</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.profiles.avatar_url}
              alt={post.profiles.username}
              className={`w-12 h-12 rounded-full border-2 ${
                isBankrupt ? 'border-amber-600 grayscale' : 'border-cyan-400'
              } object-cover`}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">@{post.profiles.username}</span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    post.profiles.rank_tier === 'Gigachad'
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black'
                      : post.profiles.rank_tier === 'Aura Master'
                      ? 'bg-cyan-500 text-black'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {post.profiles.rank_tier}
                </span>
              </div>
              <p className="text-zinc-300 text-sm line-clamp-2 mt-0.5">{post.caption}</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/10">
          <button
            onClick={() => triggerVote('LAURA')}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-400 font-bold hover:bg-rose-900/80 active:scale-95 transition-all"
          >
            <ThumbsDown className="w-5 h-5" /> Laura
          </button>
          <button
            onClick={() => triggerVote('SUPER_AURA')}
            className="flex items-center justify-center gap-1 py-3 rounded-2xl bg-amber-500 text-black font-black hover:bg-amber-400 active:scale-95 transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]"
          >
            <Zap className="w-5 h-5 fill-black" /> Super
          </button>
          <button
            onClick={() => triggerVote('AURA')}
            className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-bold hover:bg-cyan-900/80 active:scale-95 transition-all"
          >
            <ThumbsUp className="w-5 h-5" /> Aura
          </button>
        </div>
      </div>
    </motion.div>
  );
};
