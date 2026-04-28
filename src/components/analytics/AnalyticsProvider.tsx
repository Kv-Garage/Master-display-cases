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