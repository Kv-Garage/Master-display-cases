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
  
  // Display all products from Shopify (including any test products)
  // Prioritize 48" and 70" displays for smoke shops, but show all available products
  const prioritizedProducts = allProducts
    .filter((p: Product) => p.title.includes('48') || p.title.includes('70'))
    .slice(0, 2);
  
  // Get remaining products (including any test/demo products)
  const remainingProducts = allProducts.filter((p: Product) => 
    !p.title.includes('48') && !p.title.includes('70')
  );
  
  // Combine: prioritized products first, then remaining products
  // Display up to 4 products total
  const displayProducts = [...prioritizedProducts, ...remainingProducts].slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* ============================================
          HERO SECTION - Above the Fold (CRITICAL)
          ============================================ */}
      <section className="relative bg-black text-white py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            {/* H1 - Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Display Cases Built for Smoke Shops That Increase Sales & Security
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-300 max-w-2xl mb-6 leading-relaxed">
              Upgrade your store with premium LED display cases designed to boost product visibility, reduce theft, and increase customer spending.
            </p>
            
            {/* Targeting Line */}
            <p className="text-lg text-blue-400 max-w-2xl mb-8 font-medium">
              Built specifically for smoke shop owners who want to improve store performance and stand out from competitors.
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
                <span className="text-lg text-gray-300">Create a modern, high-end shopping experience</span>
              </li>
            </ul>
            
            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5">
                Shop Display Cases
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg" className="text-lg px-10 py-5">
                Get a Quote
              </Button>
            </div>
            
            {/* Urgency Line */}
            <p className="text-red-400 text-sm font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Limited inventory available due to high demand from retail store owners.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PRODUCT SECTION - IMMEDIATE (CRITICAL FOR CONVERSION)
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Top Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 text-lg">
              Professional-grade display cases with RGB lighting, secure locking, and commercial construction.
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
                        ? 'Perfect for checkout counters. RGB lighting drives impulse buys. Ideal for vape products and accessories.'
                        : product.title.includes('70')
                        ? 'Full-height showcase that commands attention. Store your entire premium collection with maximum visibility.'
                        : 'Professional LED display case with RGB lighting for maximum product visibility and security.'
                      }
                    </p>
                    
                    {/* View Product Button */}
                    <Button href={getProductUrl(product.handle)} variant="primary" size="lg" fullWidth className="text-lg">
                      View Product
                    </Button>
                  </div>
                </div>
              ))
            ) : (
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
          TRUST + AUTHORITY SECTION
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Trusted by 500+ Retail Stores</h2>
              <p className="text-gray-600 text-lg">
                Join hundreds of smoke shop owners who have transformed their stores with our display cases.
              </p>
            </div>

            {/* Trust Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
                <p className="text-gray-600 font-medium">Stores Trust Us</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-blue-600 mb-2">5-Year</p>
                <p className="text-gray-600 font-medium">Warranty Included</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <p className="text-4xl font-bold text-blue-600 mb-2">Nationwide</p>
                <p className="text-gray-600 font-medium">Freight Shipping</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-black text-white rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl md:text-2xl italic mb-6">
                "These display cases completely transformed our store. Sales are up 40% and customers constantly comment on how professional everything looks."
              </p>
              <p className="text-gray-400 font-medium">— Mike R., Smoke Shop Owner, Texas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PROBLEM → SOLUTION SECTION
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Problems */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">The Problem: Most Smoke Shops Are Losing Sales</h2>
            <p className="text-gray-600 text-lg">
              Poor display setup is costing you customers and revenue every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {[
              { title: 'Poor Product Visibility', desc: 'Products get lost on dark shelves. Customers cannot see what you have.' },
              { title: 'Theft Risk', desc: 'Open displays invite shoplifters. High-value items disappear.' },
              { title: 'Cluttered Displays', desc: 'Messy setups look unprofessional. Customers lose trust.' },
              { title: 'Low Perceived Value', desc: 'Poor presentation makes products look cheap. You cannot charge premium prices.' },
            ].map((item, index) => (
              <div key={index} className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">The Solution: Professional LED Display Cases</h2>
            <p className="text-gray-600 text-lg">
              Transform your store with display cases designed to sell more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'LED Lighting = Attention + Sales', desc: 'RGB lighting makes products pop. Customers notice, engage, and buy more.', icon: '💡' },
              { title: 'Lockable Glass = Security', desc: 'Commercial locks protect inventory. Staff access is easy, thieves are blocked.', icon: '🔒' },
              { title: 'Clean Layout = Better Experience', desc: 'Organized displays make shopping easy. Customers stay longer and spend more.', icon: '✨' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ROI SECTION
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Your Display Case Isn't Just Furniture — It's a Sales Tool</h2>
            <p className="text-xl text-gray-600 mb-12">
              Professional display cases pay for themselves through increased sales and higher average orders.
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

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">Increased Visibility</h4>
                <p className="text-gray-600 text-sm">LED lighting makes products impossible to miss, leading to more purchases.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">Higher Perceived Value</h4>
                <p className="text-gray-600 text-sm">Premium presentation justifies premium pricing. Customers pay more.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-lg mb-2">Longer Browsing Time</h4>
                <p className="text-gray-600 text-sm">Organized displays keep customers shopping longer, increasing basket size.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          BEFORE / AFTER SECTION
          ============================================ */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Upgrade Your Store Experience Instantly</h2>
            <p className="text-gray-400 text-lg">
              See the difference professional display cases make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
              <span className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4 block">Before</span>
              <p className="text-gray-300 text-lg">Products lost on standard shelves. Low perceived value. Missed impulse sales. Customers rush through.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900 to-gray-800 rounded-xl p-8 text-center border border-blue-700">
              <span className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-4 block">After</span>
              <p className="text-white text-lg">Products command attention. 40% higher perceived value. 35% more impulse purchases. Customers linger and buy more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          MID-PAGE CTA
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to upgrade your store?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of smoke shop owners who have already made the switch to professional display cases.
            </p>
            <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5">
              Browse Display Cases
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA - STRONG CLOSE
          ============================================ */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Upgrade Your Smoke Shop Today
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Turn your display into a high-converting sales tool. Increase visibility, improve security, and boost revenue with professional LED display cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5 bg-white text-black hover:bg-gray-200">
                Shop Now
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg" className="text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-black">
                Get a Quote
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