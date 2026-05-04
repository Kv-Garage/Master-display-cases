'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Trust badge data
const trustBadges = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    label: 'Commercial Grade',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '5-Year Warranty',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 19a1 1 0 011-1v0a1 1 0 011 1m6-1v0a1 1 0 011 1" />
      </svg>
    ),
    label: 'Nationwide Freight',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Bulk Discounts',
  },
];

// Google Review Link - Official Google Business Profile review URL
const GOOGLE_REVIEW_URL = 'https://g.page/r/CXhIkxeS2TYIEBM/review';

// Footer navigation data
const shopLinks = [
  { label: 'RGB Display Cases', href: '/collections/rgb-displays' },
];

const companyLinks = [
  { label: 'Buying Guide', href: '/buying-guide' },
  { label: 'Contact', href: '/contact' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Blog', href: '/blog' },
];

const supportLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping Policy', href: '/policies/shipping' },
  { label: 'Returns', href: '/policies/refunds' },
  { label: 'Terms', href: '/policies/terms' },
  { label: 'Privacy', href: '/policies/privacy' },
];

function NewsletterForm({ variant = 'footer' }: { variant?: 'footer' | 'inline' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');

    try {
      // Submit to Shopify Customer API via our contact endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'newsletter',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 text-center">
        <p className="text-green-400 text-sm font-medium">
          ✓ Thanks for subscribing! Check your email for your discount code.
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your business email"
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg whitespace-nowrap disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    );
  }

  // Footer variant - compact
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
        required
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-4 py-3 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg whitespace-nowrap disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Get Discount'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">
          Something went wrong. Please try again.
        </p>
      )}
      <p className="text-gray-500 text-xs">
        By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Trust Strip */}
      <div className="border-b border-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-gray-400">{badge.icon}</div>
                <span className="text-sm font-medium text-gray-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Column 1: Logo + Statement */}
          <div className="lg:col-span-1 space-y-6">
            <Image
              src="/Footer logo.png"
              alt="Master Display Cases"
              width={300}
              height={100}
              className="h-20 w-auto object-contain"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Commercial display systems engineered to increase retail revenue.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">
              Get 10% Off
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for store setup tips and product recommendations.
            </p>
            <NewsletterForm />
          </div>

          {/* Column 6: Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-white">
              Contact
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Form
                </Link>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Grand Rapids, Michigan<br />United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Review CTA Section */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Loved Your Experience?</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Help other store owners by leaving a quick review.
            </p>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Leave a Google Review
            </a>
            <p className="text-gray-500 text-xs mt-4">
              Helps other store owners trust us • Takes 30 seconds
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs">
              © {currentYear} Master Display Cases. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs font-medium">
              Trusted by 500+ retail stores nationwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}