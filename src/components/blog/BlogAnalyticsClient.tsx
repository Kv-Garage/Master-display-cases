'use client';

import { useEffect } from 'react';
import { useBlogAnalytics } from '@/components/analytics/AnalyticsProvider';

interface BlogAnalyticsClientProps {
  blogTitle: string;
  blogHandle: string;
}

export default function BlogAnalyticsClient({ blogTitle, blogHandle }: BlogAnalyticsClientProps) {
  const analytics = useBlogAnalytics(blogTitle, blogHandle);

  useEffect(() => {
    // Initialize scroll and engagement tracking
    const cleanupScroll = analytics.setupScrollTracking();
    const cleanupEngagement = analytics.startEngagementTracking();

    return () => {
      cleanupScroll?.();
      cleanupEngagement?.();
    };
  }, [analytics]);

  return null;
}