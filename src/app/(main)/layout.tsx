import React from 'react';
import { TopHeader } from '@/components/layout/TopHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col max-w-md mx-auto relative border-x border-zinc-900 shadow-2xl">
      <TopHeader />
      <main className="flex-1 pb-20 pt-2 px-3 overflow-y-auto no-scrollbar">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
