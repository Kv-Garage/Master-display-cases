import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getProducts } from '@/lib/shopify';

// SEO Metadata
export const metadata = {
  title: 'Buying Guide - Find the Right Display Case for Your Store | Master Display Cases',
  description: 'Complete buying guide for retail display cases. Learn how to choose the right display case for smoke shops, jewelry stores, convenience stores, and boutiques. Compare features, sizes, and ROI.',
  keywords: 'display case buying guide, retail display cases, glass display cases, countertop display, floor standing display, wall display, smoke shop displays, jewelry display cases',
  openGraph: {
    title: 'Display Case Buying Guide | Master Display Cases',
    description: 'Find the perfect display case for your store in minutes. Compare types, features, and calculate ROI.',
    type: 'website',
  },
};

export default async function BuyingGuidePage() {
  // Fetch products for best sellers section
  const products = await getProducts();
  const bestSellers = products.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                Buying Guide
              </span>
            <h1 className="heading-xl mb-6">
              Find the Right Display Case for Your Store in Minutes
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you run a smoke shop, jewelry store, or boutique — get expert guidance on choosing display cases that boost sales and elevate your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/collections/all" variant="primary" size="lg">
                Shop Displays
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Get Expert Help
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Store Type Selector */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Step 1: Your Store Type
            </span>
            <h2 className="heading-lg mt-2">What Type of Store Do You Have?</h2>
            <p className="text-gray-600 mt-4">
              Different stores have different display needs. Select yours to see tailored recommendations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Smoke Shops',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                description: 'Vape & CBD displays',
              },
              {
                name: 'Jewelry Stores',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                description: 'Luxury presentation',
              },
              {
                name: 'Convenience Stores',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                description: 'High-traffic solutions',
              },
              {
                name: 'Boutiques',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a3 3 0 00-6 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                ),
                description: 'Fashion & accessories',
              },
            ].map((store, index) => (
              <Link
                key={index}
                href="/collections/all"
                className="group block p-8 bg-gray-50 rounded-lg border-2 border-transparent hover:border-black transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  {store.icon}
                </div>
                <h3 className="text-lg font-bold text-center mb-2">{store.name}</h3>
                <p className="text-sm text-gray-500 text-center">{store.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Setup Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Step 2: Your Setup
            </span>
            <h2 className="heading-lg mt-2">Choose Your Setup</h2>
            <p className="text-gray-600 mt-4">
              Select from our proven display solutions. Each option is designed to maximize visibility and ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: '48" Counter Display (RGB)',
                description: 'Perfect for checkout areas. RGB lighting increases impulse purchases by 35%. Ideal for vape shops, jewelry stores, and boutiques.',
                roi: '+35% impulse purchases',
                image: '/SEO 1.jpeg',
                link: '/products/48-led-counter-display',
              },
              {
                title: '70" Full Showcase (RGB)',
                description: 'Full-height showcase with maximum visibility. Commands attention and stores your entire premium collection.',
                roi: '+40% perceived value',
                image: '/In-store Shop Display 2.jpeg',
                link: '/products/70-led-retail-display-showcase',
              },
              {
                title: 'Assembly Options (Save Time or Save Money)',
                description: 'Tier 1: Self assembly with included kit. Tier 2: Pre-assembled and delivered ready to use.',
                roi: 'Save 2-3 hours labor',
                image: '/UGC content.jpeg',
                link: '/assembly-options',
              },
              {
                title: 'Lock Your Inventory (Prevent Theft)',
                description: 'Commercial-grade locking systems. Keyed, combination, or electronic lock options available.',
                roi: 'Protect high-value inventory',
                image: '/SEO 3.jpeg',
                link: '/lock-security-upgrade',
              },
            ].map((product, index) => (
              <Link
                key={index}
                href={product.link}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="heading-sm mb-3 group-hover:text-gray-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 1.818a8.182 8.182 0 100 16.364A8.182 8.182 0 0012 3.818zM9.212 7.435a.91.91 0 011.576 0l1.818 3.182a.91.91 0 01-.788 1.364H8.182a.91.91 0 01-.788-1.364l1.818-3.182z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold text-green-700">{product.roi}</span>
                    </div>
                    <span className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-black group-hover:translate-x-1 transition-transform">
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Key Features
            </span>
            <h2 className="heading-lg mt-2">What Makes a Great Display Case?</h2>
            <p className="text-gray-600 mt-4">
              Understanding these features will help you make the right choice for your store.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'RGB Lighting',
                subtitle: 'Customizable ambiance',
                description: 'Our RGB lighting systems let you match your brand colors or create dynamic displays. Studies show colored lighting increases dwell time by up to 40% and can highlight specific products for maximum impact.',
                benefits: [
                  '16 million color options',
                  'Remote & app control',
                  'Energy-efficient LEDs',
                  'Increases perceived value',
                ],
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Security Locks',
                subtitle: 'Protect your inventory',
                description: 'Every display case comes with integrated locking systems. Choose from keyed locks, combination locks, or electronic locks depending on your security needs and traffic patterns.',
                benefits: [
                  'Tamper-resistant design',
                  'Multiple lock options',
                  'Reinforced hinges',
                  'Peace of mind',
                ],
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Glass Durability',
                subtitle: 'Built to last',
                description: 'We use only premium tempered glass that is 5x stronger than regular glass. Optional laminated glass provides additional security and UV protection for sensitive products.',
                benefits: [
                  'Tempered safety glass',
                  'Scratch-resistant coating',
                  'UV protection available',
                  'Crystal-clear visibility',
                ],
              },
              {
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
                title: 'Shelving Flexibility',
                subtitle: 'Adapt to any product',
                description: 'Adjustable glass shelves let you customize heights for different products. From small vape cartridges to large decorative pieces, your display grows with your inventory.',
                benefits: [
                  'Adjustable shelf heights',
                  'Tempered glass shelves',
                  'No-tool adjustments',
                  'Mirror backs available',
                ],
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="heading-sm mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{feature.subtitle}</p>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Popular Choices
            </span>
            <h2 className="heading-lg mt-2">Best Selling Display Cases</h2>
            <p className="text-gray-600 mt-4">
              See what other retailers are choosing to transform their stores.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bestSellers.length > 0 ? (
              bestSellers.map((product: any, index: number) => (
                <Link
                  key={index}
                  href={`/products/${product.handle}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-semibold uppercase rounded">
                      Best Seller
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="heading-sm mb-2 group-hover:text-gray-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                    </p>
                    <p className="text-lg font-bold text-black">
                      {product.priceFormatted || `$${product.price?.toFixed(2)}`}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              // Fallback products when Shopify isn't connected
              [
                {
                  title: '48" Countertop Display Case',
                  price: '$449',
                  handle: '48-countertop-display',
                  image: '/public/SEO 1.jpeg',
                },
                {
                  title: '72" Floor Standing Showcase',
                  price: '$899',
                  handle: '72-floor-standing',
                  image: '/public/In-store Shop Display 2.jpeg',
                },
                {
                  title: 'RGB LED Wall Display System',
                  price: '$649',
                  handle: 'rgb-wall-display',
                  image: '/public/UGC content.jpeg',
                },
              ].map((product, index) => (
                <Link
                  key={index}
                  href={`/products/${product.handle}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-semibold uppercase rounded">
                      Best Seller
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="heading-sm mb-2 group-hover:text-gray-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Premium display case with RGB lighting and security locks.
                    </p>
                    <p className="text-lg font-bold text-black">{product.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button href="/collections/all" variant="secondary" size="lg">
              View All Display Cases
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Return on Investment
            </span>
            <h2 className="heading-lg mt-2 text-white">Pay for Itself in 30-60 Days</h2>
            <p className="text-gray-400 mt-4">
              Professional display cases aren't an expense — they're an investment that pays dividends.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                metric: '+35%',
                label: 'Increase in impulse purchases',
                description: 'Products at eye level in glass displays are significantly more likely to be purchased on impulse.',
              },
              {
                metric: '+25%',
                label: 'Higher perceived value',
                description: 'Items in professional displays command higher prices and are perceived as more premium.',
              },
              {
                metric: '30-60',
                label: 'Days to ROI',
                description: 'Most retailers see full return on investment within 1-2 months of installing displays.',
              },
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 bg-white/5 rounded-lg border border-white/10">
                <p className="text-5xl font-bold mb-2 rgb-gradient">{stat.metric}</p>
                <p className="text-lg font-semibold mb-3">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>

          {/* ROI Calculator Visual */}
          <div className="max-w-3xl mx-auto bg-white/5 rounded-lg p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-6 text-center">Example: $500 Display Case Investment</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Additional daily sales</span>
                <span className="font-semibold">+$50/day</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Monthly increase (30 days)</span>
                <span className="font-semibold">+$1,500/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Display case cost</span>
                <span className="font-semibold">$500</span>
              </div>
              <div className="flex justify-between items-center py-4 bg-green-500/20 rounded px-4 mt-4">
                <span className="text-green-400 font-semibold">Time to ROI</span>
                <span className="text-green-400 font-bold text-xl">~10 days</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6 text-center">
              *Based on average customer results. Actual ROI varies by store type, location, and product mix.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Transform Your Store?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of retailers who have increased sales with professional display cases. Shipping calculated at checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/collections/all" variant="primary" size="lg">
                Shop All Displays
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to a Specialist
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Shipping Calculated at Checkout</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Common Questions
            </span>
            <h2 className="heading-lg mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'How long does shipping take?',
                answer: 'Standard freight shipping takes 7-14 business days. Expedited options available. Shipping is calculated at checkout based on your location and order size.',
              },
              {
                question: 'Do you offer assembly services?',
                answer: 'Most display cases arrive 90% assembled. Simple final assembly takes 15-30 minutes with included tools and instructions.',
              },
              {
                question: 'Can I customize the display case?',
                answer: 'Yes! We offer custom sizes, colors, mirror backs, and shelving configurations. Contact us for a custom quote.',
              },
              {
                question: 'What is your warranty?',
                answer: 'All display cases come with a 2-year manufacturer warranty covering defects in materials and workmanship.',
              },
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-lg">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
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
            <Link href="/faq" className="text-sm font-semibold uppercase tracking-wider hover:underline">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}