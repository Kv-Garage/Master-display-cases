import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/layout/CartDrawer";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import EmailCapturePopup from "@/components/marketing/EmailCapturePopup";
import AIChatbot from "@/components/chat/AIChatbot";

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
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AnalyticsProvider />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <EmailCapturePopup />
        <AIChatbot />
      </body>
    </html>
  );
}
