'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

// Dropdown menu item type
interface DropdownItem {
  label: string;
  href: string;
}

// Dropdown menu type
interface DropdownMenu {
  label: string;
  items: DropdownItem[];
}

// Main navigation structure - Simplified for conversion
const resourcesItems: DropdownItem[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Buying Guide', href: '/buying-guide' },
  { label: 'FAQ', href: '/faq' },
];

function CartIcon({ totalItems }: { totalItems: number }) {
  return (
    <Link
      href="/cart"
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
    </Link>
  );
}

function DesktopDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: DropdownItem[];
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors duration-200 py-6 ${
          isOpen ? 'text-black' : 'text-gray-600 hover:text-black'
        }`}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-sm transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-50 text-black font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({
  label,
  items,
  pathname,
}: {
  label: string;
  items: DropdownItem[];
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-4 text-sm font-medium uppercase tracking-wider text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="pb-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-3 pl-4 text-sm ${
                pathname === item.href
                  ? 'text-black font-medium'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-100 text-gray-600 text-xs font-medium py-2 px-4 text-center">
        Commercial-Grade Display Systems | Designed for High-Conversion Retail
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[96px]">
            {/* Logo - LEFT (Brand Anchor) */}
            <Link href="/" className="flex items-center mr-12 flex-shrink-0">
              <span className="text-xl lg:text-2xl font-extrabold tracking-tight text-black uppercase">
                MASTER DISPLAY CASES
              </span>
            </Link>

            {/* Desktop Navigation - CENTER (Simplified for conversion) */}
            <nav className="hidden lg:flex items-center gap-10">
              <Link
                href="/collections/rgb-displays"
                className="text-sm font-medium uppercase tracking-wider text-gray-600 hover:text-black transition-colors duration-200"
              >
                RGB Display Cases
              </Link>
              <Link
                href="/wholesale"
                className="text-[14px] font-medium uppercase tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
              >
                Wholesale / Bulk Pricing
              </Link>
              <DesktopDropdown
                label="Resources"
                items={resourcesItems}
                pathname={pathname}
              />
            </nav>

            {/* Right Section - CTA, Cart */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/contact"
                className="bg-black text-white px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors rounded-none"
              >
                Get Quote
              </Link>
              <CartIcon totalItems={totalItems} />
            </div>

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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container-custom py-4">
              <nav className="flex flex-col">
                <Link
                  href="/collections/rgb-displays"
                  className="py-4 text-sm font-medium uppercase tracking-wider text-gray-800 border-b border-gray-100"
                >
                  RGB Display Cases
                </Link>
                <Link
                  href="/wholesale"
                  className="py-4 text-sm font-medium uppercase tracking-wider text-gray-800 border-b border-gray-100"
                >
                  Wholesale / Bulk Pricing
                </Link>
                <MobileDropdown
                  label="Resources"
                  items={resourcesItems}
                  pathname={pathname}
                />
                <div className="pt-4 pb-2">
                  <Link
                    href="/contact"
                    className="btn-primary w-full text-center block"
                  >
                    Get Quote
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}