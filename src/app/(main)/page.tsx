'use client';

import React from 'react';
import { TribunalFeed } from '@/components/core/TribunalFeed';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TribunalFeed />
    </div>
  );
}
