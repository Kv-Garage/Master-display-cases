'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

// Default navigation items - these correspond to Shopify collection handles
const defaultNavItems = [
  { href: '/collections/display-cases', label: 'Display Cases' },
  { href: '/collections/store-packages', label: 'Store Packages' },
  { href: '/collections/countertop', label: 'Countertop' },
  { href: '/collections/floor-standing', label: 'Floor Standing' },
];

function CartSection() {
  const { totalItems, setIsOpen } = useCart();

  return (
    <div className="hidden lg:flex items-center gap-4">
      <Link
        href="/contact"
        className="btn-primary inline-flex items-center justify-center"
      >
        Get Quote
      </Link>
      
      {/* Cart Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={`Shopping cart with ${totalItems} items`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}

function MobileCartButton() {
  const { totalItems, setIsOpen } = useCart();
  
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState(defaultNavItems);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch collections from Shopify to populate navigation
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch('/api/collections');
        if (response.ok) {
          const collections = await response.json();
          if (collections.length > 0) {
            // Map Shopify collections to navigation items
            const collectionNavItems = collections
              .filter((c: { handle: string }) => c.handle)
              .map((c: { handle: string; title: string }) => ({
                href: `/collections/${c.handle}`,
                label: c.title,
              }));

            // Add static pages
            setNavItems([
              ...collectionNavItems.slice(0, 4), // Limit to 4 items for clean navigation
              { href: '/contact', label: 'Contact' },
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching collections for navigation:', error);
        // Keep default nav items on error
      }
    }

    fetchCollections();
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs font-medium uppercase tracking-wider py-2 px-4 text-center">
        Commercial-Grade Display Systems | Freight Shipping Available Nationwide
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-black uppercase">
                  Master Display Cases
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-black'
                     : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button & Cart */}
            <CartSection />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

            {/* Mobile Cart & Menu */}
        <div className="lg:hidden flex items-center gap-4">
          <MobileCartButton />
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium uppercase tracking-wider py-2 ${
                      pathname === item.href
                        ? 'text-black'
                        : 'text-gray-500 hover:text-black'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}