import { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'RGB Display Cases for Electronics Stores | Master Display Cases',
  description: 'Heavy-duty RGB display cases designed for electronics retailers. Protect valuable devices while showcasing them with professional LED lighting that drives sales.',
  keywords: 'electronics display cases, tech retail displays, smartphone display cases, tablet displays, consumer electronics showcases, LED display cases',
  openGraph: {
    title: 'RGB Display Cases for Electronics Stores | Master Display Cases',
    description: 'Transform your electronics store with professional RGB display cases. Protect inventory while increasing sales by 30%+.',
    type: 'website',
  },
};

export default function ElectronicsSolutionPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Industry Solution: Electronics & Tech Stores
            </span>
            <h1 className="heading-xl mb-6">
              Display Cases Built for High-Value Electronics
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Your expensive inventory needs protection without sacrificing visibility. 
              Our RGB display cases combine security with stunning presentation that 
              makes customers want to buy.
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 pointer-events-none" />
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              The Problem
            </span>
            <h2 className="heading-lg mt-2">The Security vs. Visibility Dilemma</h2>
            <p className="text-gray-600 mt-4">
              Electronics retailers face a unique challenge: how to keep expensive items 
              secure while still letting customers see what they're buying.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-50 rounded-lg p-8 border border-red-100">
              <h3 className="heading-md text-red-900 mb-6">Without Professional Displays</h3>
              <ul className="space-y-4">
                {[
                  'Expensive devices locked away in back rooms',
                  "Customers can't see or interact with products",
                  'High theft rates from open displays',
                  'Products look generic without proper lighting',
                  'No differentiation between budget and premium items',
                  'Lost sales from security-focused layouts',
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
                  'Devices visible but secure behind tempered glass',
                  'RGB lighting makes tech look premium and desirable',
                  'Lockable cases prevent theft while showcasing products',
                  'Strategic lighting highlights key features',
                  'Premium presentation justifies premium pricing',
                  'Increased sales without compromising security',
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
            <h2 className="heading-lg mt-2">How Lighting Sells Electronics</h2>
            <p className="text-gray-600 mt-4">
              Electronics are functional products, but buying decisions are emotional. 
              The right lighting creates desire that specs alone cannot.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'The Halo Effect',
                description: 'When electronics are displayed with dramatic RGB lighting, they appear more advanced and valuable. The lighting creates a "halo" that transfers to the product itself.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'Feature Highlighting',
                description: 'RGB lighting can be tuned to highlight specific product features — cool blue for screens, warm amber for metallic finishes, colored accents for gaming gear.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Tech Appeal',
                description: 'RGB lighting is associated with high-tech products (gaming PCs, smart home devices). Using RGB in displays creates an immediate association with cutting-edge technology.',
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
            <h2 className="heading-lg mt-2">What This Means for Your Electronics Store</h2>
            <p className="text-gray-600 mt-4">
              Professional displays solve the security vs. visibility problem while 
              directly increasing sales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-100">
              <div className="text-5xl font-bold text-blue-600 mb-4">+30%</div>
              <h3 className="heading-md mb-3">Increase in Conversion</h3>
              <p className="text-gray-700">
                When customers can see products clearly in well-lit displays, they're 
                more likely to purchase. The combination of visibility and security 
                removes purchase barriers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-100">
              <div className="text-5xl font-bold text-green-600 mb-4">30-60 Days</div>
              <h3 className="heading-md mb-3">Time to ROI</h3>
              <p className="text-gray-700">
                Most electronics stores recover their display investment within 1-2 months 
                through reduced shrinkage and increased average transaction values.
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
              Our display cases are designed for the unique needs of electronics retailers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Smartphones & Tablets',
                description: 'High-value devices that need security without hiding them from customers.',
                icon: '📱',
              },
              {
                title: 'Headphones & Audio',
                description: 'Premium audio gear deserves premium presentation with dramatic lighting.',
                icon: '🎧',
              },
              {
                title: 'Gaming Accessories',
                description: 'RGB lighting perfectly complements gaming peripherals and accessories.',
                icon: '🎮',
              },
              {
                title: 'Smart Home Devices',
                description: 'Make smart home products look as innovative as they actually are.',
                icon: '🏠',
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
              Electronics are prime targets for theft. Our display cases keep your inventory 
              secure while still letting customers see exactly what they're buying.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Tempered Glass Construction',
                description: '5x stronger than regular glass. Even if broken, it shatters safely rather than into dangerous shards.',
                features: ['Impact resistant', 'Safety glass', 'Clear visibility'],
              },
              {
                title: 'Integrated Locking Systems',
                description: 'Every case includes commercial-grade locks. Two keys included, additional keys available.',
                features: ['Tamper-resistant', 'Reinforced hinges', 'Pick-resistant'],
              },
              {
                title: 'Anti-Theft Design',
                description: 'Cases can be floor-mounted or counter-secured to prevent grab-and-run theft.',
                features: ['Floor mounting', 'Counter attachment', 'Anti-tip design'],
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
            <h2 className="heading-lg mb-6">Ready to Secure and Sell More?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join electronics retailers who have reduced theft while increasing sales 
              with professional RGB display cases.
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
              Free security consultation • 5-year warranty • Commercial grade
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}