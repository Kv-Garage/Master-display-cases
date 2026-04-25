import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/layout/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Master Display Cases | Commercial Display Cases & Store Fixtures",
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
  ],
  authors: [{ name: "Master Display Cases" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://masterdisplaycases.com",
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
  },
  robots: {
    index: true,
    follow: true,
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
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
