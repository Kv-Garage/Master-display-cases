import { getProduct, getProducts } from '@/lib/shopify';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'RGB Display Case | LED Retail Display Showcase | Master Display Cases',
  description: 'Commercial-grade RGB display case designed for high-conversion retail. Increase impulse purchases with customizable LED lighting. Perfect for smoke shops, jewelry stores, and boutiques.',
  keywords: 'RGB display case, LED retail display, retail showcase, commercial display case, impulse purchase display',
  openGraph: {
    title: 'RGB Display Case | Master Display Cases',
    description: 'Increase impulse purchases by 35% with our commercial-grade RGB display case.',
    type: 'website',
  },
};

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'RGB LED Lighting',
    description: '16 million color options to match your brand and highlight products',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Integrated Locking',
    description: 'Secure your high-value inventory with commercial-grade locks',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Adjustable Shelving',
    description: 'Configure shelf heights to fit any product size',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Commercial Grade',
    description: 'Tempered glass and aluminum construction built for retail environments',
  },
];

const sizes = [
  { 
    name: '48" Counter Display', 
    price: 449, 
    bestFor: 'Checkout areas, small products',
    dimensions: '48"W x 18"D x 36"H',
    features: ['Tempered glass', 'RGB LED strips', '2 adjustable shelves']
  },
  { 
    name: '70" Floor Standing', 
    price: 899, 
    bestFor: 'Full product collections, high-traffic areas',
    dimensions: '70"W x 20"D x 78"H',
    features: ['Tempered glass', 'RGB LED strips', '4 adjustable shelves', 'Locking base']
  },
];

const assemblyOptions = [
  {
    name: 'Tier 1 - Flat Pack',
    price: 0,
    description: 'DIY assembly required. All parts pre-drilled and labeled.',
    time: '2-3 hours assembly time',
    tools: 'Basic tools included',
  },
  {
    name: 'Tier 2 - Pre-Assembled',
    price: 149,
    description: 'Professional assembly before shipping. Arrives ready to use.',
    time: 'Ships fully assembled',
    tools: 'No assembly required',
    recommended: true,
  },
];

const lockOptions = [
  {
    name: 'Standard Key Lock',
    price: 0,
    description: 'Included commercial-grade cam locks (2 keys)',
    security: 'Basic security for standard retail',
  },
  {
    name: 'Electronic Keypad Lock',
    price: 99,
    description: 'Digital keypad with programmable codes',
    security: 'High security, no keys to lose',
    recommended: true,
  },
  {
    name: 'Biometric Fingerprint Lock',
    price: 199,
    description: 'Fingerprint scanner with backup key override',
    security: 'Maximum security for high-value items',
  },
];

const useCases = [
  {
    industry: 'Smoke Shops',
    description: 'Showcase vape products and e-liquids with RGB lighting that makes colors pop.',
    href: '/use-cases/smoke-shops',
  },
  {
    industry: 'Jewelry Stores',
    description: 'Premium presentation that increases perceived value and drives higher-margin sales.',
    href: '/use-cases/jewelry-stores',
  },
  {
    industry: 'Boutiques',
    description: 'Create an elevated shopping experience that reflects your brand aesthetic.',
    href: '/use-cases/boutiques',
  },
  {
    industry: 'Electronics',
    description: 'Secure display for high-value tech products with integrated security.',
    href: '/use-cases/electronics',
  },
];

export default async function RGBDisplayCasePage() {
  const products = await getProducts();
  const relatedProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                Commercial Grade
              </span>
              <h1 className="heading-xl mb-6">RGB Display Case</h1>
              <p className="text-xl text-gray-400 mb-8 max-w-lg">
                Increase impulse purchases by up to 35% with our commercial-grade RGB display case. 
                Designed for retail environments that convert browsers into buyers.
              </p>
              
              {/* Size Selection */}
              <div className="space-y-4 mb-8">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div>
                      <p className="font-semibold">{size.name}</p>
                      <p className="text-sm text-gray-400">{size.bestFor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${size.price}</p>
                      <Button href={`/cart?variant=${index === 0 ? '48-counter' : '70-floor'}`} variant="primary" size="sm" className="mt-2">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  Get Bulk Quote
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  <svg className="w-32 h-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Banner */}
      <section className="bg-green-50 py-12 border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-green-600 mb-2">+35%</p>
              <p className="text-sm text-gray-600 font-medium">Increase in impulse purchases</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600 mb-2">+25%</p>
              <p className="text-sm text-gray-600 font-medium">Higher perceived product value</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600 mb-2">30-60</p>
              <p className="text-sm text-gray-600 font-medium">Days to ROI (typical)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Built for Conversion
            </span>
            <h2 className="heading-lg mt-2">Why This Display Drives Sales</h2>
            <p className="text-gray-600 mt-4">
              Every feature is designed to maximize product visibility and purchase intent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Industry Solutions
            </span>
            <h2 className="heading-lg mt-2">Perfect For Your Business</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Link
                key={index}
                href={useCase.href}
                className="group bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="heading-sm mb-3 group-hover:text-gray-600 transition-colors">
                  {useCase.industry}
                </h3>
                <p className="text-gray-600">{useCase.description}</p>
                <span className="inline-flex items-center mt-4 text-sm font-semibold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Assembly Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Choose Your Setup
            </span>
            <h2 className="heading-lg mt-2">Assembly Options</h2>
            <p className="text-gray-600 mt-4">
              Select the assembly level that works best for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {assemblyOptions.map((option, index) => (
              <div 
                key={index} 
                className={`relative p-8 rounded-lg border-2 ${
                  option.recommended 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                  <p className="text-3xl font-bold text-black">
                    {option.price === 0 ? 'Included' : `+$${option.price}`}
                  </p>
                </div>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {option.time}
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {option.tools}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lock Upgrade Options */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Security Upgrades
            </span>
            <h2 className="heading-lg mt-2">Lock & Security Options</h2>
            <p className="text-gray-600 mt-4">
              Protect your inventory with the right security level for your products.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {lockOptions.map((option, index) => (
              <div 
                key={index} 
                className={`relative p-6 rounded-lg border-2 ${
                  option.recommended 
                    ? 'border-black bg-white' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">{option.name}</h3>
                  <p className="text-2xl font-bold text-black">
                    {option.price === 0 ? 'Included' : `+$${option.price}`}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Security:</span> {option.security}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product FAQs */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Common Questions
            </span>
            <h2 className="heading-lg mt-2">Product FAQs</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'How long does shipping take?',
                answer: 'Standard freight shipping takes 5-10 business days within the continental US. Shipping costs are calculated at checkout based on your location and order size. For bulk orders, freight shipping is coordinated directly with you to schedule delivery.',
              },
              {
                question: 'What is involved in assembly?',
                answer: 'Tier 1 (Flat Pack): All components arrive pre-drilled and labeled with instructions. Basic tools are included. Assembly takes 2-3 hours with 2 people. Tier 2 (Pre-Assembled): The display case arrives fully assembled - just unpack and place it. We recommend Tier 2 for customers who want to avoid the assembly process.',
              },
              {
                question: 'Can I upgrade the lock later?',
                answer: 'Yes, all our display cases are designed to accommodate lock upgrades. The standard cam lock can be replaced with our electronic keypad or biometric options at any time. The mounting holes are pre-drilled for easy installation.',
              },
              {
                question: 'What can I display in these cases?',
                answer: 'Our display cases are versatile and used across many industries: vape products and e-liquids in smoke shops, jewelry and watches, electronics and gadgets, boutique accessories, collectibles, cosmetics, and more. The adjustable shelving lets you configure the interior for any product size.',
              },
              {
                question: 'Do you offer warranties?',
                answer: 'Yes, all display cases include a 2-year warranty covering manufacturing defects, glass, and LED components. Extended warranty options are available for bulk orders. The RGB LED strips have a rated lifespan of 50,000+ hours.',
              },
              {
                question: 'What if it arrives damaged?',
                answer: 'All shipments are fully insured. If any damage occurs during freight shipping, document it with photos and contact us within 48 hours of delivery. We will arrange for replacement parts or a full replacement unit at no additional cost.',
              },
            ].map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-lg">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="font-semibold pr-8">{faq.question}</span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Increase Your Sales?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of retailers who have transformed their stores with our 
              commercial-grade display cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/cart?variant=48-counter" variant="primary" size="lg">
                Order 48" Display - $449
              </Button>
              <Button href="/cart?variant=70-floor" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Order 70" Display - $899
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
