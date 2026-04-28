'use client';

import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Button from '@/components/ui/Button';

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

            {/* Main Headline */}
            <h1 className="heading-xl text-white mb-6">
              Turn Your Store Into a High-Converting Sales Machine
            </h1>

            {/* Subheadline */}
            <p className="text-gray-400 text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Premium LED display cases designed to increase visibility, boost impulse purchases, and maximize ROI.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  +30%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Avg. Order Value
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  +40%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Perceived Value
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                  3x
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  More Purchases
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/collections/rgb-display-cases" variant="primary" size="lg">
                Explore All Display Cases
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Custom Quote
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-gray-500 text-xs uppercase tracking-wider">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Commercial Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66l-2.34 2.34A2 2 0 0017 18.34V20m3-5.34V6a2 2 0 00-2-2h-1.66M17 18.34V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-6 0h12" />
                </svg>
                <span>Nationwide Freight</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Slider */}
          <div className="relative">
            <BeforeAfterSlider
              beforeImage='/Before and after of 72".png'
              afterImage='/Before and after of the 70W.png'
              beforeLabel="Standard Setup"
              afterLabel="Master Display System"
              altText="Store display transformation"
              showCallout={true}
              calloutText="+30% Avg Order Value Increase Potential"
              className="shadow-2xl"
            />
            
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
    </section>
  );
}