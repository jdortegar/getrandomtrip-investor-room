'use client';

import { usePathname } from 'next/navigation';
import { useScrollDepth } from '@/lib/hooks/useScrollDepth';

/**
 * Renders nothing; attaches scroll-depth tracking (25%, 50%, 75%, 100%) for the current page.
 * Add once per layout or page where scroll depth matters (e.g. marketing, long room pages).
 */
function ScrollDepthTracker() {
  const pathname = usePathname();
  useScrollDepth(pathname ?? '/');
  return null;
}

export default ScrollDepthTracker;
