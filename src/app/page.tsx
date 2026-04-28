import HeroSliderSection from '@/components/sections/HeroSliderSection';
import BeforeAfterGridSection from '@/components/sections/BeforeAfterGridSection';
import TrustBar from '@/components/sections/TrustBar';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProductGridSection from '@/components/sections/ProductGridSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import UGCGallery from '@/components/sections/UGCGallery';
import { getProducts } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

// Fetch products for homepage
async function getHomePageProducts() {
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error('Shopify fetch failed:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getHomePageProducts();

  return (
    <>
      <HeroSliderSection />
      <TrustBar />
      
      {/* Before/After Grid Section - Visual Proof */}
      <BeforeAfterGridSection />

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
      
      {/* Product Grid */}
      <ProductGridSection 
        products={products} 
        showEmptyState={products.length === 0}
      />

      {/* Why It Works - Conversion Psychology */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              The Science
            </span>
            <h2 className="heading-lg mt-2">Why Professional Displays Drive Sales</h2>
            <p className="text-gray-600 mt-4">
              It's not just about looking nice. There's real psychology behind why displayed products sell better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                title: 'Visibility = Desire',
                description: 'Products at eye level are 3x more likely to be purchased. Glass displays create a "museum effect" that elevates perceived value instantly.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Premium Presentation',
                description: 'When products are displayed in glass cases with proper lighting, customers automatically assign higher value — and are willing to pay more.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'RGB Lighting Effect',
                description: 'Our RGB lighting options create an atmosphere that draws customers in. Color psychology shows warm lighting increases comfort and time spent browsing.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-black mb-6">
                  {item.icon}
                </div>
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UseCasesSection />

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

      {/* Email Capture Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Get Bulk Pricing & Wholesale Discounts</h2>
            <p className="text-gray-400 mb-8">
              Sign up for exclusive wholesale pricing, volume discounts, and early access to new products. Perfect for multi-location retailers.
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
                Get Pricing
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQSection />

      <CTASection />
    </>
  );
}