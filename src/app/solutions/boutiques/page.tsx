import { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'RGB Display Cases for Boutiques & Jewelry Stores | Master Display Cases',
  description: 'Elegant RGB display cases designed for boutiques, jewelry stores, and fashion retailers. Create an upscale shopping experience that justifies premium pricing.',
  keywords: 'boutique display cases, jewelry display cases, fashion retail displays, luxury display cases, glass display cases with LED lighting',
  openGraph: {
    title: 'RGB Display Cases for Boutiques | Master Display Cases',
    description: 'Transform your boutique with professional RGB display cases. Increase perceived value by 40% with premium presentation.',
    type: 'website',
  },
};

export default function BoutiquesSolutionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Industry Solution: Boutiques & Jewelry Stores
            </span>
            <h1 className="heading-xl mb-6">
              Display Cases That Make Your Products Feel Like Luxury
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Your carefully curated collection deserves a display that matches its quality. 
              Our RGB display cases create an upscale shopping experience that justifies 
              premium pricing and elevates your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/rgb-display-cases" variant="primary" size="lg">
                View RGB Display Cases
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Get a Custom Quote
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-pink-500/5 pointer-events-none" />
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              The Problem
            </span>
            <h2 className="heading-lg mt-2">Why Beautiful Products Get Overlooked</h2>
            <p className="text-gray-600 mt-4">
              You source high-quality pieces, but your displays don't communicate their value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 rounded-lg p-8 border border-red-100">
              <h3 className="heading-md text-red-900 mb-6">Without Professional Displays</h3>
              <ul className="space-y-4">
                {[
                  'Handcrafted jewelry lost in generic display trays',
                  "Customers can't appreciate fine details without proper lighting",
                  'Premium pieces priced the same as mass-market items',
                  'Store feels cluttered rather than curated',
                  'No visual hierarchy to guide customer attention',
                  'Difficult to justify premium pricing',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-8 border-2 border-green-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 text-sm font-semibold uppercase tracking-wider">
                With Master Display Cases
              </div>
              <h3 className="heading-md text-green-900 mb-6">With Professional RGB Displays</h3>
              <ul className="space-y-4">
                {[
                  'Each piece becomes a featured work of art',
                  'RGB lighting highlights craftsmanship and materials',
                  'Glass enclosure creates exclusivity and desire',
                  'Store feels like a high-end gallery',
                  'Strategic lighting guides customer focus',
                  'Premium presentation justifies premium prices',
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

      {/* Why RGB Changes Behavior */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              The Psychology
            </span>
            <h2 className="heading-lg mt-2">How Lighting Transforms Perception</h2>
            <p className="text-gray-600 mt-4">
              In luxury retail, presentation is everything. The right lighting doesn't just 
              show products — it transforms how customers perceive value.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'The Museum Effect',
                description: "When items are displayed in glass cases with dramatic lighting, customers automatically assign higher value. It's the same psychology that makes museum pieces feel priceless.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Sparkle & Brilliance',
                description: 'RGB lighting can be tuned to enhance specific materials — warm tones for gold, cool tones for silver, colored accents for gemstones. The right light makes everything sparkle.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Emotional Connection',
                description: "Beautifully lit displays create an emotional response. Customers don't just see a product — they feel desire. That emotional connection drives purchase decisions.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Impact */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Revenue Impact
            </span>
            <h2 className="heading-lg mt-2">What This Means for Your Boutique</h2>
            <p className="text-gray-600 mt-4">
              Professional displays don't just look better — they directly impact your bottom line.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-8 border border-yellow-100">
              <div className="text-5xl font-bold text-yellow-600 mb-4">+40%</div>
              <h3 className="heading-md mb-3">Higher Perceived Value</h3>
              <p className="text-gray-700">
                Products displayed in professional glass cases with RGB lighting are perceived 
                as significantly more valuable. Customers are willing to pay premium prices 
                when the presentation matches the quality.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-100">
              <div className="text-5xl font-bold text-green-600 mb-4">30-60 Days</div>
              <h3 className="heading-md mb-3">Time to ROI</h3>
              <p className="text-gray-700">
                Most boutiques recover their display investment within 1-2 months through 
                increased average transaction values and higher conversion rates on displayed items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Perfect For
            </span>
            <h2 className="heading-lg mt-2">What to Display in Your RGB Cases</h2>
            <p className="text-gray-600 mt-4">
              Our display cases are designed to showcase your most valuable and beautiful pieces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Fine Jewelry',
                description: 'Rings, necklaces, and earrings deserve museum-quality presentation.',
                icon: '💎',
              },
              {
                title: 'Designer Accessories',
                description: 'Handbags, scarves, and belts become statement pieces.',
                icon: '👜',
              },
              {
                title: 'Watches',
                description: 'Luxury timepieces demand dramatic, focused lighting.',
                icon: '⌚',
              },
              {
                title: 'Limited Collections',
                description: 'Create exclusivity and urgency for special pieces.',
                icon: '✨',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="heading-sm mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Elevate Your Boutique?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join luxury retailers who have transformed their stores with professional 
              RGB display cases that command premium prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/rgb-display-cases" variant="primary" size="lg">
                Shop Display Cases
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Get Expert Advice
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              Free design consultation • 5-year warranty • Commercial grade
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}