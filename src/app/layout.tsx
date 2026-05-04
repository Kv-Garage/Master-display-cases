import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/layout/CartDrawer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import EmailCapturePopup from "@/components/marketing/EmailCapturePopup";
import AIChatbot from "@/components/chat/AIChatbot";
import RobotsMeta from "@/components/seo/RobotsMeta";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Primary domain - used for all canonical URLs
export const PRIMARY_DOMAIN = 'https://masterdisplaycases.com';

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_DOMAIN),
  title: {
    default: "Master Display Cases | Commercial Display Cases & Store Fixtures",
    template: "%s | Master Display Cases"
  },
  description:
    "Premium commercial-grade display cases for retail stores. Built for visibility, durability, and higher-value sales. Freight shipping available nationwide from Grand Rapids, Michigan.",
  keywords: [
    "display cases",
    "glass display cases",
    "retail display cases",
    "store display fixtures",
    "commercial display cases",
    "showcase displays",
    "retail fixtures",
    "store fixtures",
    "RGB display cases",
    "LED display cases",
  ],
  authors: [{ name: "Master Display Cases" }],
  creator: "Master Display Cases",
  publisher: "Master Display Cases",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/New logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/New logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/New logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: PRIMARY_DOMAIN,
    siteName: "Master Display Cases",
    title: "Master Display Cases | Commercial Display Cases & Store Fixtures",
    description:
      "Premium commercial-grade display cases for retail stores. Built for visibility, durability, and higher-value sales.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Master Display Cases - Commercial Display Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Display Cases | Commercial Display Cases & Store Fixtures",
    description:
      "Premium commercial-grade display cases for retail stores.",
    images: ["/og-image.jpg"],
    site: "@masterdisplaycases",
    creator: "@masterdisplaycases",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: PRIMARY_DOMAIN,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      {/* Google Analytics & Ads Tags */}
      <Script
        id="google-gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3EVFYMRM32');
            gtag('config', 'AW-18131039337');
          `,
        }}
      />
      <Script
        id="google-analytics-script"
        src="https://www.googletagmanager.com/gtag/js?id=G-3EVFYMRM32"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-script"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18131039337"
        strategy="afterInteractive"
      />
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {/* Robots Meta - Conditionally adds noindex for myshopify.com domains */}
        <RobotsMeta />

        {/* Shopify Analytics Bridge Script */}
        {/* Passes UTM params and referrer data to Shopify when navigating to store */}
        <Script
          id="shopify-analytics-bridge"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Store UTM params and referrer in sessionStorage for Shopify to pick up
              (function() {
                var params = new URLSearchParams(window.location.search);
                var utmParams = {};
                var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
                
                utmKeys.forEach(function(key) {
                  if (params.get(key)) {
                    utmParams[key] = params.get(key);
                  }
                });
                
                // Store in sessionStorage for cross-domain tracking
                if (Object.keys(utmParams).length > 0) {
                  sessionStorage.setItem('shopify_utm_params', JSON.stringify(utmParams));
                }
                
                // Store referrer info
                if (document.referrer) {
                  sessionStorage.setItem('shopify_referrer', document.referrer);
                }
                
                // Intercept clicks on Shopify links to ensure tracking
                document.addEventListener('click', function(e) {
                  var link = e.target.closest('a[href*="mraze2-ra.myshopify.com"]');
                  if (link) {
                    var href = link.href;
                    var url = new URL(href);
                    var searchParams = url.searchParams;
                    
                    // Add UTM params if not present
                    if (!searchParams.has('utm_source')) {
                      searchParams.set('utm_source', 'masterdisplaycases.com');
                    }
                    if (!searchParams.has('utm_medium')) {
                      searchParams.set('utm_medium', 'referral');
                    }
                    
                    // Add referrer info
                    searchParams.set('referrer', window.location.href);
                    
                    // Update link href with tracking params
                    url.search = searchParams.toString();
                    link.href = url.toString();
                    
                    // Track click with GA4
                    if (typeof gtag === 'function') {
                      gtag('event', 'shopify_redirect', {
                        event_category: 'Navigation',
                        event_label: url.pathname,
                        destination: href
                      });
                    }
                  }
                });
              })();
            `
          }}
        />
        <ErrorBoundary>
          <AnalyticsProvider />
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
          <EmailCapturePopup />
          <AIChatbot />
        </ErrorBoundary>
      </body>
    </html>
  );
}
