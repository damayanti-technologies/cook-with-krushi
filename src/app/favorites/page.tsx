'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FavoritesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/my-kitchen?tab=favorites');
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center text-charcoal-muted text-sm">
      Loading your favorite recipes...
    </div>
  );
}
