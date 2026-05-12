import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/shopify';
import { getProductUrl } from '@/lib/shopify-urls';

// SEO Metadata
export const metadata = {
  title: 'Wholesale & Bulk Pricing | Master Display Cases',
  description: 'Volume pricing for retailers, distributors, and store chains. Get wholesale discounts on commercial-grade display cases with dedicated account management.',
  keywords: 'wholesale display cases, bulk display pricing, retail display wholesale, commercial display cases bulk, volume pricing displays',
  openGraph: {
    title: 'Wholesale & Bulk Pricing | Master Display Cases',
    description: 'Volume pricing for retailers and distributors. Save up to 30% on bulk orders.',
    type: 'website',
  },
};

const pricingTiers = [
  {
    quantity: '2-4 Units',
    discount: '10% Off',
    description: 'Perfect for small retailers expanding their display setup',
    features: [
      'Dedicated sales support',
      'Volume discount applied',
      'Freight shipping calculated at checkout',
      '2-year warranty included',
    ],
  },
  {
    quantity: '5-9 Units',
    discount: '15% Off',
    description: 'Ideal for growing chains and multi-location businesses',
    features: [
      'Priority order processing',
      'Reduced freight shipping rates',
      'Custom branding options',
      'Extended warranty available',
      'Dedicated account manager',
    ],
    highlighted: true,
  },
  {
    quantity: '10+ Units',
    discount: '20-30% Off',
    description: 'Best for large retailers, distributors, and franchise operations',
    features: [
      'Custom pricing negotiation',
      'Freight shipping coordinated for bulk orders',
      'Full customization available',
      'Net 30 payment terms (qualified buyers)',
      'Installation guidance provided',
      'Training resources',
    ],
  },
];

const bundleOffers = [
  {
    name: 'Starter Bundle',
    description: '2 Displays + Assembly Service',
    savings: 'Save $150',
    items: [
      '2x 48" Counter Display (RGB)',
      'Professional Assembly Service',
      'Freight shipping coordinated',
    ],
    link: '/bulk-bundles#starter',
  },
  {
    name: 'Growth Bundle',
    description: '3+ Displays + Premium Support',
    savings: 'Save $400',
    items: [
      '3x 70" Floor Standing Showcase',
      'Priority assembly & installation',
      'Extended 3-year warranty',
      'Reduced freight shipping rates',
    ],
    link: '/bulk-bundles#growth',
  },
  {
    name: 'Enterprise Bundle',
    description: 'Full Store Setup',
    savings: 'Save $1,200+',
    items: [
      '5+ Custom Display Units',
      'Installation guidance included',
      'Custom branding',
      'Dedicated account manager',
    ],
    link: '/contact',
  },
];

export default async function WholesalePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Wholesale Program
            </span>
            <h1 className="heading-xl mb-6">
              Wholesale & Bulk Pricing for Business Buyers
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Scale your retail business with commercial-grade display cases at wholesale prices. 
              Volume discounts up to 30% for qualified business buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Apply for Wholesale Account
              </Button>
              <Button href="#pricing" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                View Pricing Tiers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-black mb-2">500+</p>
              <p className="text-sm text-gray-600">Business Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black mb-2">50 States</p>
              <p className="text-sm text-gray-600">Nationwide Shipping</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black mb-2">30%</p>
              <p className="text-sm text-gray-600">Max Volume Discount</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-black mb-2">24hr</p>
              <p className="text-sm text-gray-600">Quote Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Volume Pricing
            </span>
            <h2 className="heading-lg mt-2">Wholesale Pricing Tiers</h2>
            <p className="text-gray-600 mt-4">
              The more you buy, the more you save. All wholesale orders include dedicated support and priority processing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-lg p-8 ${
                  tier.highlighted
                    ? 'bg-black text-white border-2 border-gray-800'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-lg font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-black'}`}>
                    {tier.quantity}
                  </h3>
                  <p className={`text-4xl font-bold mb-2 ${tier.highlighted ? 'text-green-400' : 'text-black'}`}>
                    {tier.discount}
                  </p>
                  <p className={`text-sm ${tier.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 ${tier.highlighted ? 'text-green-400' : 'text-green-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={tier.highlighted ? 'text-gray-300' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  fullWidth
                  className={tier.highlighted ? 'bg-white text-black hover:bg-gray-100' : ''}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Offers */}
      <section id="bundles" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Bundle & Save
            </span>
            <h2 className="heading-lg mt-2">Pre-Built Bundle Offers</h2>
            <p className="text-gray-600 mt-4">
              Save even more with our curated bundle packages designed for common retail setups.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bundleOffers.map((bundle, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{bundle.name}</h3>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                      {bundle.savings}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{bundle.description}</p>
                  <ul className="space-y-3 mb-8">
                    {bundle.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href={bundle.link} variant="outline" fullWidth>
                    View Bundle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products for Wholesale */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Popular Wholesale Picks
            </span>
            <h2 className="heading-lg mt-2">Best Sellers for Business Buyers</h2>
            <p className="text-gray-600 mt-4">
              These display cases are the most popular choices for wholesale customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product: any) => (
                <Link
                  key={product.id}
                  href={getProductUrl(product.handle)}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.priceFormatted || `$${product.price?.toFixed(2)}`}
                    </p>
                    <span className="text-xs text-green-600 font-medium">
                      Wholesale pricing available
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback products
              [1, 2, 3, 4].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">Display Case {index + 1}</h3>
                    <p className="text-sm text-gray-500 mb-2">$449+</p>
                    <span className="text-xs text-green-600 font-medium">
                      Wholesale pricing available
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button href={getProductUrl('led-retail-display-showcase')} variant="secondary" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Simple Process
            </span>
            <h2 className="heading-lg mt-2">How Wholesale Ordering Works</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Apply',
                description: 'Submit your business information for wholesale account verification.',
              },
              {
                step: '02',
                title: 'Get Approved',
                description: 'Our team reviews your application within 24 hours.',
              },
              {
                step: '03',
                title: 'Place Order',
                description: 'Browse products with wholesale pricing and place your order.',
              },
              {
                step: '04',
                title: 'Receive & Install',
                description: 'Freight shipping coordinated. Assembly guidance provided.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Questions?
            </span>
            <h2 className="heading-lg mt-2">Wholesale FAQ</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'Who qualifies for wholesale pricing?',
                answer: 'Wholesale pricing is available for verified businesses including retailers, distributors, interior designers, and contractors. You will need to provide a valid business license or tax ID during application.',
              },
              {
                question: 'What is the minimum order quantity (MOQ)?',
                answer: 'The minimum order for wholesale pricing is 2 units. Higher volume tiers (5+ and 10+ units) receive progressively larger discounts.',
              },
              {
                question: 'Can I mix and match different display case models?',
                answer: 'Yes! Your discount tier is based on total unit count, so you can combine different models and sizes to reach your volume tier.',
              },
              {
                question: 'Do you offer custom displays for large orders?',
                answer: 'For orders of 10+ units, we offer full customization including custom dimensions, colors, branding, and special features. Contact our sales team for a custom quote.',
              },
              {
                question: 'What are the payment terms for wholesale orders?',
                answer: 'Standard wholesale orders require payment at time of purchase. For orders over $5,000, we offer Net 30 terms for qualified businesses with established credit.',
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

          <div className="text-center mt-10">
            <Button href="/contact" variant="primary" size="lg">
              Apply for Wholesale Account
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}