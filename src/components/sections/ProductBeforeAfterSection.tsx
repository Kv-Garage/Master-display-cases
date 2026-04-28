'use client';

import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';

interface ProductBeforeAfterSectionProps {
  productName: string;
  beforeImage: string;
  afterImage: string;
}

export default function ProductBeforeAfterSection({
  productName,
  beforeImage,
  afterImage,
}: ProductBeforeAfterSectionProps) {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Interactive Slider */}
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">
                See the Transformation
              </span>
              <h2 className="heading-md">
                See How {productName} Transforms Your Sales Floor
              </h2>
              <p className="text-gray-600 mt-2">
                Drag the slider to see the difference professional displays make.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              beforeLabel="Standard Setup"
              afterLabel="Master Display System"
              altText={`${productName} before and after comparison`}
              showCallout={true}
              calloutText="+30% Avg Order Value Increase Potential"
            />

            <p className="text-center text-gray-500 text-sm mt-4">
              Drag the slider to compare
            </p>
          </div>

          {/* Right: Value Callout Box */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-black relative">
            {/* Decorative Badge */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
              Proven ROI
            </div>

            <h3 className="heading-sm mb-6">
              This Isn't Furniture. It's a Revenue Tool.
            </h3>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-black mb-1">25-40%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Increase Perceived Value
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-black mb-1">+30%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  Average Order Value
                </div>
              </div>
            </div>

            {/* Value Propositions */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Increases perceived product value</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Customers automatically assign higher value to products displayed in professional cases.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Drives impulse buying behavior</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Eye-level displays with RGB lighting trigger emotional purchase decisions.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Creates premium in-store experience</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Professional displays elevate your entire brand perception and justify premium pricing.
                  </p>
                </div>
              </li>
            </ul>

            {/* Trust Proof Points */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-4">
                Trusted By High-Volume Retailers
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Used by 500+ high-volume retail stores</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Built for high-traffic environments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Designed to increase customer dwell time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}