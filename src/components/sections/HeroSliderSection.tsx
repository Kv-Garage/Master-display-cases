'use client';

import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSliderSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-black overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">
                Premium B2B Display Solutions
              </span>
            </div>

            {/* Main Headline - SEO optimized for smoke shop display cases */}
            <h1 className="heading-xl text-white mb-6">
              Turn Your Smoke Shop Into a High-Converting Sales Machine
            </h1>

            {/* Subheadline - ROI focused */}
            <p className="text-gray-400 text-lg lg:text-xl mb-6 max-w-xl mx-auto lg:mx-0">
              Premium LED display cases engineered to increase visibility, reduce theft, and boost average order value.
            </p>

            {/* Offer Stack - Critical trust builders */}
            <div className="flex flex-col gap-2 mb-8 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Free Shipping Available</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">5-Year Warranty</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Bulk Pricing for Multi-Store Owners</span>
              </div>
            </div>

            {/* Stats - Better framed with context */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  +30%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  +40%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Perceived Value
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  3x
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  More Engagement
                </div>
              </div>
            </div>

            {/* CTA Buttons - Primary and Secondary */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
              <Button href="/collections/rgb-displays" variant="primary" size="lg">
                Shop Display Cases
              </Button>
              <Button href="/wholesale" variant="secondary" size="lg">
                Get 10% Off First Order
              </Button>
            </div>

            {/* Microtext - Risk reversal */}
            <p className="text-xs text-gray-500 mb-6">
              No risk. Built for long-term retail performance.
            </p>

            {/* Urgency Line */}
            <p className="text-xs text-orange-400/80 uppercase tracking-wide">
              Limited inventory due to high demand from retail stores
            </p>
          </div>

          {/* Right Content - Interactive Slider with Buy Signal */}
          <div className="relative">
            {/* Best Seller Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-green-600 text-white px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg">
              Best Seller
            </div>

            <BeforeAfterSlider
              beforeImage='/Before and after of 72".png'
              afterImage='/Before and after of the 70W.png'
              beforeLabel="Standard Setup"
              afterLabel="Master Display System"
              altText="Smoke shop display case transformation"
              showCallout={true}
              calloutText="+30% Avg Order Value Increase Potential"
              className="shadow-2xl"
            />
            
            {/* Overlay CTA on visual */}
            <Link 
              href="/products/products-70-led-retail-display-showcase-rgb"
              className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-black hover:border-white transition-all flex items-center space-x-2 group"
            >
              <span>View Product</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-md border border-gray-800 rounded-lg px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-bold">Revenue Growth</div>
                  <div className="text-gray-400 text-xs">Proven ROI in 30 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 text-gray-500">
          <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Brand Logo Watermark - Monumental Placement */}
      <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 opacity-20 lg:opacity-30 pointer-events-none">
        <Image
          src="/New logo.png"
          alt="Master Display Cases"
          width={200}
          height={60}
          className="h-12 lg:h-16 w-auto"
        />
      </div>
    </section>
  );
}