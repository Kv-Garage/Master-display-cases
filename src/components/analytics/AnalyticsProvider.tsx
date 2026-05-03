'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Analytics Provider Component
// Handles GA4, Meta Pixel, and TikTok Pixel tracking

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    initializeAnalytics();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(pathname);
  }, [pathname]);

  return null;
}

// Initialize all analytics platforms
function initializeAnalytics() {
  // Google Analytics 4
  if (typeof window !== 'undefined') {
    // GA4 - Load gtag script
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || ''}`;
    document.head.appendChild(gaScript);

    // GA4 - Initialize gtag
    const gaInit = document.createElement('script');
    gaInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ''}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(gaInit);

    // Meta Pixel
    const metaScript = document.createElement('script');
    metaScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID || ''}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(metaScript);

    // TikTok Pixel - Initialize directly without template literal to avoid syntax issues
    const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '';
    if (tiktokPixelId) {
      // @ts-ignore - TikTok Pixel global
      window.TiktokAnalyticsObject = 'ttq';
      // @ts-ignore
      var ttq = window.ttq = window.ttq || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'ready', 'trackWebEvent', 'trackLink', 'share'];
      ttq.setAndDefer = function (t: any, e: any) {
        t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); };
      };
      ttq.instances = function (w: any) {
        if (!w) return ttq;
        return ttq[w] || (ttq[w] = [], ttq[w].setAndDefer = function (e: any) {
          ttq[w][e] = function () { ttq[w].push([e].concat(Array.prototype.slice.call(arguments, 0))); };
        }), ttq[w];
      };
      for (var e2 = ['Ready', 'Before', 'After', 'Track', 'TrackLink', 'Page', 'Share', 'Identify', 'TrackWebEvent', 'SetAndDefer', 'Instances'].map(function (e) { return e.toLowerCase(); }), i = 0; i < e2.length; i++) {
        var n = e2[i], r = n.charAt(0).toUpperCase() + n.slice(1);
        ttq.setAndDefer(r, n), ttq.instances(r);
      }
      ttq.load = ttq.track = function () {
        var e = Array.prototype.slice.call(arguments);
        ttq.push([e.shift()].concat(e));
      };
      ttq.page = function () {
        var e = Array.prototype.slice.call(arguments);
        e.unshift('page');
        ttq.push(e);
      };
      // Load the TikTok pixel SDK
      const tiktokSdkScript = document.createElement('script');
      tiktokSdkScript.async = true;
      tiktokSdkScript.src = `https://analytics.tiktok.com/i18n/pixel/sdk.js?sdkid=${tiktokPixelId}`;
      document.head.appendChild(tiktokSdkScript);
      // Initialize
      ttq.load(tiktokPixelId);
      ttq.page();
    }
  }
}

// Track page views
function trackPageView(pathname: string) {
  // GA4 - Track page view
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }

  // Meta Pixel - Track page view
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView');
  }

  // TikTok Pixel - Track page view
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('PageView');
  }
}

// E-commerce tracking events
export const trackAddToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: product.price,
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: product.quantity,
      }],
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('AddToCart', {
      contents: [{
        content_id: product.id,
        content_name: product.name,
        price: product.price,
        quantity: product.quantity,
      }],
      currency: 'USD',
      value: product.price,
    });
  }
};

export const trackInitiateCheckout = (cart: {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: cart.total,
      items: cart.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      content_ids: cart.items.map(item => item.id),
      content_type: 'product',
      value: cart.total,
      currency: 'USD',
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('InitiateCheckout', {
      contents: cart.items.map(item => ({
        content_id: item.id,
        content_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      currency: 'USD',
      value: cart.total,
    });
  }
};

export const trackPurchase = (order: {
  orderId: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  shipping?: number;
  tax?: number;
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'purchase', {
      transaction_id: order.orderId,
      currency: 'USD',
      value: order.total,
      shipping: order.shipping,
      tax: order.tax,
      items: order.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      content_ids: order.items.map(item => item.id),
      content_type: 'product',
      value: order.total,
      currency: 'USD',
      num_items: order.items.length,
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('PlaceAnOrder', {
      contents: order.items.map(item => ({
        content_id: item.id,
        content_name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      currency: 'USD',
      value: order.total,
      order_id: order.orderId,
    });
  }
};

export const trackLead = (leadData: {
  email?: string;
  phone?: string;
  productName?: string;
}) => {
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: leadData.productName,
      value: 0,
      currency: 'USD',
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('SubmitForm', {
      content_name: leadData.productName,
    });
  }
};

// Custom event tracking
export const trackCustomEvent = (eventName: string, eventData?: Record<string, any>) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventData);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', eventName, eventData);
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track(eventName, eventData);
  }
};

// ==========================================
// BLOG-SPECIFIC ANALYTICS TRACKING
// ==========================================

/**
 * Track when a user clicks on a product link within a blog post
 */
export const trackBlogProductClick = (params: {
  blogTitle: string;
  blogHandle: string;
  productUrl: string;
  productName?: string;
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'blog_product_click', {
      blog_title: params.blogTitle,
      blog_handle: params.blogHandle,
      link_url: params.productUrl,
      product_name: params.productName,
      content_type: 'blog_product_link',
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: params.productName || params.productUrl,
      content_type: 'product',
      content_ids: [params.productUrl],
    });
  }
};

/**
 * Track when a user clicks on a CTA button within a blog post
 */
export const trackBlogCTAClick = (params: {
  blogTitle: string;
  blogHandle: string;
  ctaLocation: 'top' | 'middle' | 'bottom' | 'inline';
  ctaText: string;
  ctaUrl: string;
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', {
      blog_title: params.blogTitle,
      blog_handle: params.blogHandle,
      cta_location: params.ctaLocation,
      cta_text: params.ctaText,
      cta_url: params.ctaUrl,
      content_type: 'blog_cta',
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Click', {
      content_name: params.ctaText,
      content_type: 'cta',
    });
  }
};

/**
 * Track scroll depth on blog posts
 * Tracks 25%, 50%, 75%, and 100% scroll milestones
 */
export const setupBlogScrollTracking = (params: {
  blogTitle: string;
  blogHandle: string;
}) => {
  if (typeof window === 'undefined') return;

  const trackedMilestones = new Set<number>();
  const milestones = [25, 50, 75, 100];

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);

    for (const milestone of milestones) {
      if (scrollPercentage >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);

        // GA4
        if ((window as any).gtag) {
          (window as any).gtag('event', 'blog_scroll_depth', {
            blog_title: params.blogTitle,
            blog_handle: params.blogHandle,
            scroll_depth: milestone,
            content_type: 'blog_engagement',
          });
        }

        // Meta Pixel - track deep engagement (75%+)
        if ((window as any).fbq && milestone >= 75) {
          (window as any).fbq('track', 'ReadContent', {
            content_name: params.blogTitle,
            content_type: 'blog',
            scroll_depth: milestone,
          });
        }
      }
    }
  };

  // Use passive event listener for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Track email signup/lead capture from blog pages
 */
export const trackBlogLeadCapture = (params: {
  blogTitle: string;
  blogHandle: string;
  email?: string;
  source: 'newsletter' | 'popup' | 'inline';
}) => {
  // GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'lead_capture', {
      blog_title: params.blogTitle,
      blog_handle: params.blogHandle,
      source: params.source,
      content_type: 'blog_lead',
    });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: params.blogTitle,
      content_type: 'blog_newsletter',
      source: params.source,
    });
  }
};

/**
 * Track time spent on blog post
 */
export const trackBlogEngagement = (params: {
  blogTitle: string;
  blogHandle: string;
}) => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();

  // Track at 30s, 60s, 120s intervals
  const engagementIntervals = [30, 60, 120];
  const trackedIntervals = new Set<number>();

  const intervalId = setInterval(() => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);

    for (const interval of engagementIntervals) {
      if (elapsed >= interval && !trackedIntervals.has(interval)) {
        trackedIntervals.add(interval);

        // GA4
        if ((window as any).gtag) {
          (window as any).gtag('event', 'blog_time_spent', {
            blog_title: params.blogTitle,
            blog_handle: params.blogHandle,
            time_seconds: interval,
            content_type: 'blog_engagement',
          });
        }
      }
    }
  }, 1000);

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
    // Track final engagement time on unmount
    const finalTime = Math.round((Date.now() - startTime) / 1000);
    if ((window as any).gtag && finalTime > 5) {
      (window as any).gtag('event', 'blog_engagement_complete', {
        blog_title: params.blogTitle,
        blog_handle: params.blogHandle,
        total_time_seconds: finalTime,
        content_type: 'blog_engagement',
      });
    }
  };
};

/**
 * Hook to initialize all blog analytics tracking
 */
export const useBlogAnalytics = (blogTitle: string, blogHandle: string) => {
  // This would be used in a client component
  // For server components, call the individual functions in useEffect
  return {
    trackProductClick: (productUrl: string, productName?: string) =>
      trackBlogProductClick({ blogTitle, blogHandle, productUrl, productName }),
    trackCTAClick: (location: 'top' | 'middle' | 'bottom' | 'inline', text: string, url: string) =>
      trackBlogCTAClick({ blogTitle, blogHandle, ctaLocation: location, ctaText: text, ctaUrl: url }),
    setupScrollTracking: () => setupBlogScrollTracking({ blogTitle, blogHandle }),
    trackLeadCapture: (source: 'newsletter' | 'popup' | 'inline', email?: string) =>
      trackBlogLeadCapture({ blogTitle, blogHandle, source, email }),
    startEngagementTracking: () => trackBlogEngagement({ blogTitle, blogHandle }),
  };
};
