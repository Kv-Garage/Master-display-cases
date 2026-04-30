import { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'RGB Display Cases for Smoke Shops & Vape Stores | Master Display Cases',
  description: 'Premium RGB display cases designed specifically for smoke shops and vape stores. Increase perceived value, protect inventory, and boost impulse purchases with professional LED lighting.',
  keywords: 'smoke shop display cases, vape shop displays, CBD display cases, tobacco display cases, retail display cases with LED lighting',
  openGraph: {
    title: 'RGB Display Cases for Smoke Shops | Master Display Cases',
    description: 'Transform your smoke shop with professional RGB display cases. Increase sales by 30%+ with premium presentation.',
    type: 'website',
  },
};

export default function SmokeShopsSolutionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Industry Solution: Smoke Shops & Vape Stores
            </span>
            <h1 className="heading-xl mb-6">
              Display Cases Built for Smoke Shops That Actually Sell
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Your premium products deserve premium presentation. Our RGB display cases 
              increase perceived value by 40% and trigger impulse purchases that flat 
              shelving simply can't match.
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
        {/* Subtle background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none" />
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              The Problem
            </span>
            <h2 className="heading-lg mt-2">Why Most Smoke Shop Displays Fail</h2>
            <p className="text-gray-600 mt-4">
              You've invested in premium products, but your displays aren't doing them justice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 rounded-lg p-8 border border-red-100">
              <h3 className="heading-md text-red-900 mb-6">Without Professional Displays</h3>
              <ul className="space-y-4">
                {[
                  'Premium vape products lost among budget options on crowded shelves',
                  "Customers can't see product details or quality",
                  'No visual differentiation between $20 and $80 products',
                  'Impulse purchases happen at the register, not the display',
                  'High-value inventory vulnerable to theft',
                  'Store looks like every other smoke shop',
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
                  'Premium products command premium prices with proper lighting',
                  'Customers see every detail through crystal-clear glass',
                  'RGB lighting creates visual hierarchy and draws attention',
                  'Impulse purchases happen throughout the store',
                  'Lockable cases protect high-value inventory',
                  'Store stands out as a premium destination',
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
              The Science
            </span>
            <h2 className="heading-lg mt-2">Why RGB Lighting Changes Customer Behavior</h2>
            <p className="text-gray-600 mt-4">
              It's not just about looking cool. There's real retail psychology behind why 
              RGB-lit displays drive sales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'The Spotlight Effect',
                description: 'When products are lit with colored LED lighting, customers automatically perceive them as more valuable. Studies show RGB lighting can increase perceived value by 25-40%.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Premium Pricing Justification',
                description: 'Products displayed in glass cases with RGB lighting are perceived as premium. Customers are willing to pay more because the presentation signals quality.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Impulse Trigger',
                description: 'The combination of glass enclosure and colored lighting creates a "must-have" effect. Customers who came in for a $20 item leave with a $50 one.',
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
            <h2 className="heading-lg mt-2">What This Means for Your Bottom Line</h2>
            <p className="text-gray-600 mt-4">
              Professional displays aren't an expense — they're an investment that pays for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-8 border border-purple-100">
              <div className="text-5xl font-bold text-purple-600 mb-4">+35%</div>
              <h3 className="heading-md mb-3">Increase in Impulse Purchases</h3>
              <p className="text-gray-700">
                Products displayed at eye level in glass cases with RGB lighting are significantly 
                more likely to be purchased on impulse. The visual appeal triggers an emotional 
                response that overcomes price resistance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-100">
              <div className="text-5xl font-bold text-green-600 mb-4">30-60 Days</div>
              <h3 className="heading-md mb-3">Time to ROI</h3>
              <p className="text-gray-700">
                Most smoke shops recover their display case investment within 1-2 months. 
                The combination of higher average order values and increased impulse purchases 
                creates immediate revenue lift.
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
              Our display cases are designed specifically for smoke shop products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Premium Vape Pens',
                description: 'High-margin disposable and rechargeable vapes deserve premium presentation.',
                icon: '💨',
              },
              {
                title: 'CBD Products',
                description: 'Oils, gummies, and tinctures look more legitimate and trustworthy in glass displays.',
                icon: '🌿',
              },
              {
                title: 'Glass Pipes & Bongs',
                description: 'Artistic pieces become focal points when properly lit and displayed.',
                icon: '🔮',
              },
              {
                title: 'Limited Editions',
                description: 'Create urgency and exclusivity for rare or limited-run products.',
                icon: '⭐',
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

      {/* Security Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Security
            </span>
            <h2 className="heading-lg mt-2">Protect Your High-Value Inventory</h2>
            <p className="text-gray-600 mt-4">
              Smoke shops are targets for theft. Our display cases keep your inventory secure 
              while still showcasing it beautifully.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Lockable Doors',
                description: 'Every display case includes integrated locking mechanisms. Two keys included, additional keys available.',
                features: ['Tamper-resistant design', 'Reinforced hinges', 'Pick-resistant locks'],
              },
              {
                title: 'Tempered Glass',
                description: '5x stronger than regular glass. Even if broken, it shatters into safe, dull pieces rather than dangerous shards.',
                features: ['Impact resistant', 'Safety glass', 'Scratch-resistant coating'],
              },
              {
                title: 'Security Mounting',
                description: 'Cases can be securely mounted to counters or floors to prevent grab-and-run theft.',
                features: ['Floor mounting kit', 'Counter attachment', 'Anti-tip design'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Transform Your Smoke Shop?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of smoke shop owners who have increased their average 
              transaction value by 30%+ with professional RGB display cases.
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
              Free shipping consultation • 5-year warranty • Commercial grade
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}