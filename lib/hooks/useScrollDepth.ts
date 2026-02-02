'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '@/lib/helpers/tracking/gtm';

const DEPTH_MILESTONES = [25, 50, 75, 100] as const;

/**
 * Fires GTM scroll_depth events at 25%, 50%, 75%, 100%.
 * Call with current page path (e.g. pathname) so events are attributed correctly.
 */
export function useScrollDepth(pagePath: string): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !pagePath) return;

    const reached = new Set<number>();

    function getScrollDepthPercent(): number {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight <= clientHeight) return 100;
      const scrollable = scrollHeight - clientHeight;
      return Math.round((scrollTop / scrollable) * 100);
    }

    function checkMilestones(): void {
      const current = getScrollDepthPercent();
      for (const milestone of DEPTH_MILESTONES) {
        if (current >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackScrollDepth(pagePath, milestone);
        }
      }
    }

    window.addEventListener('scroll', checkMilestones, { passive: true });
    checkMilestones();

    return () => window.removeEventListener('scroll', checkMilestones);
  }, [pagePath]);
}
