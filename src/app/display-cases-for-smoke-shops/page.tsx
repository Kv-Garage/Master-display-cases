import Button from '@/components/ui/Button';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import { getProducts } from '@/lib/shopify';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Smoke Shops | LED Retail Cases | Master Display Cases',
  description: 'Premium LED display cases designed specifically for smoke shops. Increase sales with better product visibility, reduce theft with secure locking, and create a premium shopping experience.',
  keywords: 'display cases for smoke shops, vape shop displays, LED display cases, smoke shop display cases, retail display cases, secure display cases, RGB lighting displays',
  openGraph: {
    title: 'Display Cases for Smoke Shops | Master Display Cases',
    description: 'Premium LED display cases designed specifically for smoke shops. Increase sales, improve security, and create a premium shopping experience.',
    type: 'website',
  },
};

interface Product {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: number;
  variantId: string;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    available: boolean;
  }>;
  images: Array<{ url: string; altText?: string }>;
}

// Helper to get product URL from handle
function getProductUrl(handle: string): string {
  return `/products/${handle}`;
}

export default async function DisplayCasesForSmokeShops() {
  // Fetch products from Shopify server-side
  const allProducts = await getProducts();
  
  // Select recommended products for smoke shops
  // Prioritize 48" counter display and 70" showcase
  const recommendedProducts = allProducts
    .filter((p: Product) => p.title.includes('48') || p.title.includes('70'))
    .slice(0, 2);
  
  // Fallback: if we don't have 2 products, use the first 2 from all products
  const displayProducts = recommendedProducts.length >= 2 
    ? recommendedProducts 
    : allProducts.slice(0, 2);

  return (
    <main className="min-h-screen">
      {/* ============================================
          HERO SECTION - Above the Fold (CRITICAL FOR CONVERSION)
          ============================================ */}
      <section className="relative bg-black text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* Target Audience Identifier */}
            <p className="text-blue-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              Designed Specifically for Smoke Shop Owners
            </p>
            
            {/* H1 - Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Display Cases Built for Smoke Shops That Increase Sales & Security
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-300 max-w-2xl mb-6 leading-relaxed">
              Upgrade your store with premium LED display cases designed to improve product visibility, reduce theft, and increase customer spending.
            </p>
            
            {/* Target Audience Reinforcement */}
            <p className="text-lg text-gray-400 max-w-2xl mb-8">
              Designed specifically for smoke shop owners who want to boost sales and stand out from competitors.
            </p>
            
            {/* Quick Benefit Bullets */}
            <ul className="mb-10 space-y-3 max-w-xl">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-300">Increase product visibility instantly</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-300">Secure high-value inventory with lockable glass</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg text-gray-300">Create a modern, high-end store experience</span>
              </li>
            </ul>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5">
                Shop Smoke Shop Display Cases
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg" className="text-lg px-10 py-5">
                Get a Free Quote
              </Button>
            </div>
            
            {/* Urgency Trigger */}
            <p className="mt-8 text-gray-500 text-sm italic">
              ⚡ Retailers upgrading their display cases often see immediate improvements in product visibility and customer engagement.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST BAR - Quick Social Proof
          ============================================ */}
      <section className="bg-gray-900 py-4 border-b border-gray-800">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-gray-400 text-xs md:text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Trusted by 500+ stores nationwide
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Commercial-grade quality
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              5-Year Warranty
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          PRODUCT SECTION - MOVED UP (CRITICAL FOR CONVERSION)
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Best Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 text-lg">
              Choose the perfect display case for your store. All cases feature RGB lighting, secure locking, and commercial-grade construction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayProducts.length > 0 ? (
              displayProducts.map((product: Product) => (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  {/* Product Image */}
                  <div className="aspect-video relative bg-gray-200">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <span className="text-lg font-medium">Display Case</span>
                      </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
                      <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    <p className="text-gray-600 mb-6">
                      {product.title.includes('48') 
                        ? 'Perfect for checkout counters. RGB lighting drives impulse buys. Ideal for vape products, accessories, and small items.'
                        : product.title.includes('70')
                        ? 'Full-height showcase that commands attention. Store your entire premium collection with maximum visibility.'
                        : 'Professional LED display case with RGB lighting for maximum product visibility and security.'
                      }
                    </p>
                    
                    {/* Quick Features */}
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        RGB LED lighting
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Lockable security
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Commercial-grade
                      </li>
                    </ul>
                    
                    {/* View Product Button */}
                    <Button href={getProductUrl(product.handle)} variant="primary" size="lg" fullWidth className="text-lg">
                      View Product
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no products available
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600 mb-6">Loading products...</p>
                <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                  Browse All Display Cases
                </Button>
              </div>
            )}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Button href={ROUTES.COLLECTION} variant="secondary" size="lg">
              Browse All Display Cases →
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          PROBLEM SECTION - Pain Points (Tightened)
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Are These Problems Costing You Sales?</h2>
            <p className="text-gray-600 text-lg">
              Most smoke shops lose sales daily due to poor display setup.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Products Not Standing Out',
                description: 'Small vape products and colorful e-liquids get lost on dark shelves. Without proper lighting, the vibrant colors that attract customers are invisible.',
              },
              {
                title: 'Poor Lighting = Lower Prices',
                description: "Products without proper lighting look cheap. Customers won't pay premium prices for products that don't look premium.",
              },
              {
                title: 'Theft Eating Your Profits',
                description: 'High-value vape devices are easy targets. Open displays invite shoplifters and shrink your inventory.',
              },
              {
                title: 'Cluttered = Unprofessional',
                description: 'Piled products look messy and unprofessional. Customers associate messy displays with low-quality products.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SOLUTION SECTION - Benefits (Tightened)
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">How Our Display Cases Fix These Problems</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'LED Lighting = Instant Visibility',
                description: 'RGB lighting makes e-liquid colors pop. Customers spot their favorites instantly from across the store.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Lockable Glass = Theft Protection',
                description: 'Commercial locks keep high-value items secure. Staff access is easy, shoplifters are blocked.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Premium Design = Higher Prices',
                description: 'Professional displays make products look expensive. Customers happily pay more for premium presentation.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Organized Layout = More Sales',
                description: 'Adjustable shelves fit any product size. Easy comparison means faster decisions and bigger baskets.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          {/* Mid-Page CTA */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-6">Ready to upgrade your store setup?</h3>
            <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10">
              Browse Display Cases
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          ROI / VALUE SECTION (Tightened)
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-4">A Better Display Pays for Itself</h2>
            <p className="text-xl text-gray-600 mb-12">
              Professional display cases aren't an expense — they're an investment that increases every customer's spending.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">+35%</p>
                <p className="text-gray-600 font-medium">More impulse purchases</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">+40%</p>
                <p className="text-gray-600 font-medium">Higher perceived value</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">30-60</p>
                <p className="text-gray-600 font-medium">Days to full ROI</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Increased Visibility</h4>
                <p className="text-sm text-gray-600">LED lighting makes products impossible to miss</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Higher Perceived Value</h4>
                <p className="text-sm text-gray-600">Premium presentation justifies premium pricing</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Longer Browsing</h4>
                <p className="text-sm text-gray-600">Attractive displays keep customers shopping longer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA SECTION (Strong Close)
          ============================================ */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Upgrade Your Smoke Shop Today
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Turn your display into a sales-driving asset with premium LED cases. Join hundreds of smoke shop owners who've already made the switch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5 bg-white text-black hover:bg-gray-200">
                Shop Now
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg" className="text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-black">
                Get a Free Quote
              </Button>
            </div>
            <p className="mt-8 text-gray-500 text-sm">
              Free shipping nationwide • 5-Year Warranty • Easy assembly
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}