'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Swords, PlusCircle, ShoppingBag, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Tribunal', icon: Flame },
    { href: '/duels', label: 'Duelos 1v1', icon: Swords },
    { href: '/upload', label: 'Subir', icon: PlusCircle, isSpecial: true },
    { href: '/store', label: 'Tienda', icon: ShoppingBag },
    { href: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 px-4 py-2 flex items-center justify-around max-w-md mx-auto">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        if (item.isSpecial) {
          return (
            <Link key={item.href} href={item.href} className="relative -top-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-400 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.6)] active:scale-95 transition-transform">
                <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              isActive ? 'text-cyan-400 scale-105' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-cyan-400/20' : ''}`} />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
