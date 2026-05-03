import HeroSliderSection from '@/components/sections/HeroSliderSection';
import BeforeAfterGridSection from '@/components/sections/BeforeAfterGridSection';
import TrustBar from '@/components/sections/TrustBar';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProductGridSection from '@/components/sections/ProductGridSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import UGCGallery from '@/components/sections/UGCGallery';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';
import { getProducts } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

// Fetch products for homepage with debug logging
async function getHomePageProducts() {
  try {
    const products = await getProducts();
    console.log("PRODUCTS:", products);
    console.log("PRODUCTS COUNT:", products?.length || 0);
    if (products && products.length > 0) {
      console.log("FIRST PRODUCT:", JSON.stringify(products[0], null, 2));
    }
    return products || [];
  } catch (error) {
    console.error('Shopify fetch failed:', error);
    return [];
  }
}

// Fast Path Navigation Component
function FastPathNavigation() {
  return (
    <section className="section-padding bg-black">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Shop Display Cases */}
          <Link href="/collections/rgb-displays" className="group relative bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              Shop Display Cases
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Browse our full collection of LED display cases designed for smoke shops and retail stores.
            </p>
            <div className="flex items-center text-white font-semibold text-sm">
              <span>Browse Collection</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card 2: Wholesale / Bulk Pricing */}
          <Link href="/wholesale" className="group relative bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              Wholesale / Bulk Pricing
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Special pricing for multi-store owners and large volume orders. Save up to 25%.
            </p>
            <div className="flex items-center text-white font-semibold text-sm">
              <span>Get Wholesale Pricing</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Card 3: Buyer's Guide */}
          <Link href="/buying-guide" className="group relative bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-gray-600 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
              Buyer's Guide
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Everything you need to know about choosing the right display case for your store.
            </p>
            <div className="flex items-center text-white font-semibold text-sm">
              <span>Read the Guide</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Problem → Solution Section
function ProblemSolutionSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The Challenge
          </span>
          <h2 className="heading-lg mt-2">Why Most Smoke Shops Lose Sales</h2>
          <p className="text-gray-600 mt-4">
            Without the right display strategy, you're leaving money on the table every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Problem 1 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-3">Poor Visibility</h3>
            <p className="text-gray-600 text-sm mb-4">
              Products lost on crowded shelves or hidden behind counters go unnoticed by customers.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">
                <strong>Fix:</strong> LED display systems increase attention and make products impossible to ignore.
              </p>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-3">Theft & Shrinkage</h3>
            <p className="text-gray-600 text-sm mb-4">
              Open displays and unsecured products lead to inventory loss and reduced profits.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">
                <strong>Fix:</strong> Lockable glass cases reduce shrinkage while maintaining accessibility.
              </p>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-3">Cheap Layout</h3>
            <p className="text-gray-600 text-sm mb-4">
              Basic shelving makes even premium products look ordinary and limits pricing power.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm font-medium">
                <strong>Fix:</strong> Premium displays increase perceived value and justify higher prices.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/solutions/smoke-shops"
            className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            See Solutions
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Authority / Trust Section
function AuthorityTrustSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Built for Business
          </span>
          <h2 className="heading-lg mt-2">Commercial-Grade Quality</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-bold text-black mb-2">Commercial-Grade Materials</h3>
            <p className="text-gray-600 text-sm">Built to withstand high-traffic retail environments.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-black mb-2">Nationwide Trust</h3>
            <p className="text-gray-600 text-sm">Used by retail store owners across the country.</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/5 flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-black mb-2">High-Volume Ready</h3>
            <p className="text-gray-600 text-sm">Engineered for busy stores with constant customer flow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const products = await getHomePageProducts();

  return (
    <>
      <HeroSliderSection />
      
      {/* Featured Display Setup - AFTER HERO (Placement 1) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Featured Display Setup
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              Our most popular display system, engineered for high-converting retail environments.
            </p>
          </div>
          <FeaturedProductAd variant="large" />
        </div>
      </section>

      {/* Fast Path Navigation - Controls user flow immediately */}
      <FastPathNavigation />

      <TrustBar />
      
      {/* Before/After Grid Section - Visual Proof */}
      <BeforeAfterGridSection />

      {/* Problem → Solution Section */}
      <ProblemSolutionSection />

      {/* Before/After ROI Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Return on Investment
            </span>
            <h2 className="heading-lg mt-2">Transform Your Store's Revenue</h2>
            <p className="text-gray-600 mt-4">
              Professional display cases don't just showcase products — they increase perceived value and drive impulse purchases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Without Professional Displays
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  'Products lost on crowded shelves',
                  'Lower perceived value',
                  'Missed impulse purchases',
                  'Difficulty showcasing premium items',
                  'Average sale: baseline',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-black relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                With Master Display Cases
              </div>
              <div className="text-center mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  With Professional Displays
                </span>
              </div>
              <ul className="space-y-4">
                {[
                  'Products featured at eye level',
                  '25-40% higher perceived value',
                  'Increased impulse purchases',
                  'Premium presentation for high-margin items',
                  'Average sale: +30% revenue',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BenefitsSection />
      
      {/* Built for High-Converting Stores - MID PAGE (Placement 2) */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Built for High-Converting Stores
            </span>
            <h2 className="heading-lg mt-2">Professional Display That Drives Sales</h2>
            <p className="text-gray-600 mt-3">
              Transform your store with premium display cases designed for maximum impact.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
        </div>
      </section>

      {/* Featured Products Section - Hard Sell Area */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Top Products
            </span>
            <h2 className="heading-lg mt-2">Top Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 mt-2">
              Our most popular commercial display cases, engineered for maximum impact.
            </p>
          </div>

          <ProductGridSection 
            products={products} 
            showEmptyState={products.length === 0}
            title=""
            subtitle=""
          />

          {/* Helper CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Not sure what fits your store?</p>
            <Link 
              href="/buying-guide"
              className="inline-flex items-center text-black font-semibold hover:text-gray-700 transition-colors border-b-2 border-black pb-1"
            >
              View Buyer Guide
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Authority / Trust Section */}
      <AuthorityTrustSection />
      
      {/* UGC Gallery - Real Store Photos */}
      <UGCGallery />

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Testimonials
            </span>
            <h2 className="heading-lg mt-2">What Store Owners Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "We saw a 35% increase in sales of our premium products within the first month of installing these display cases. The RGB lighting is a game-changer.",
                author: "Marcus T.",
                business: "Cloud 9 Smoke Shop",
                location: "Detroit, MI",
              },
              {
                quote: "The quality is outstanding. These cases make our jewelry look like it belongs in a high-end boutique. Customers constantly compliment the presentation.",
                author: "Sarah L.",
                business: "Bella Boutique",
                location: "Chicago, IL",
              },
              {
                quote: "Best investment we made for our store. The display cases are sturdy, look professional, and the freight shipping was smooth. Highly recommend for any serious retailer.",
                author: "David K.",
                business: "Tech Hub Electronics",
                location: "Atlanta, GA",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-600">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-black">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.business}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Upgrade - BOTTOM CTA (Placement 3) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="heading-lg">Ready to Upgrade Your Store?</h2>
            <p className="text-gray-600 mt-3 mb-8">
              Join hundreds of retailers who have transformed their stores with professional display cases.
            </p>
          </div>
          <FeaturedProductAd variant="compact" />
          <div className="text-center mt-8">
            <Link 
              href="/products/products-48-led-retail-wrap-counter-rgb"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              View Product Details
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture Section - Money Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Get 10% Off + Store Setup Guide</h2>
            <p className="text-gray-400 mb-8">
              Join store owners increasing revenue with better displays. We'll send setup tips + product recommendations.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your business email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg whitespace-nowrap"
              >
                Get My Discount
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Wholesale Push Section - High Ticket Lever */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg text-white mb-4">Need Multiple Display Cases?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Get bulk pricing for multi-store locations. Special rates available for orders of 3+ units.
            </p>
            <Link 
              href="/wholesale"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Request Wholesale Pricing
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQSection />

      {/* Final Close Section */}
      <section className="section-padding bg-black text-white text-center">
        <div className="container-custom">
          <h2 className="heading-xl mb-6">Upgrade Your Store Today</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join hundreds of retailers who have transformed their stores with professional display cases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections/rgb-displays"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Shop Display Cases
            </Link>
            <Link 
              href="/wholesale"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Get 10% Off
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}