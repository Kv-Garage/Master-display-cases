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
          HERO SECTION - Above the Fold (MOST IMPORTANT)
          ============================================ */}
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Display Cases Built for Smoke Shops That Increase Sales & Security
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
              Upgrade your store with premium LED display cases designed to improve product visibility, reduce theft, and boost customer engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                Shop Smoke Shop Display Cases
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST + POSITIONING BAR
          ============================================ */}
      <section className="bg-gray-900 py-6 border-b border-gray-800">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-300 text-sm md:text-base">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Trusted by retail store owners nationwide
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Commercial-grade quality
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Designed for high-traffic retail environments
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          PROBLEM SECTION - Pain Points
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Are These Problems Costing You Sales?</h2>
            <p className="text-gray-600 text-lg">
              Smoke shop owners face unique challenges when it comes to product display and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Products Not Standing Out',
                description: 'Small vape products and colorful e-liquids get lost on dark shelves. Without proper lighting, the vibrant colors that attract customers are invisible.',
              },
              {
                title: 'Poor Lighting Lowering Perceived Value',
                description: "Products displayed without proper lighting appear less premium, reducing customers' willingness to pay top dollar for quality items.",
              },
              {
                title: 'Theft Concerns',
                description: 'High-value vape devices and premium products are targets for theft, leading to significant inventory shrinkage. Open displays make it easy for shoplifters.',
              },
              {
                title: 'Cluttered Displays Hurting Sales',
                description: 'Disorganized displays create a chaotic shopping experience that undermines your brand credibility. When products are piled together, nothing looks appealing.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SOLUTION SECTION - Benefits
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">How Our Display Cases Transform Your Store</h2>
            <p className="text-gray-600 text-lg">
              Our LED display cases are engineered specifically for smoke shop environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'LED Lighting Increases Product Visibility',
                description: 'RGB LED lighting makes e-liquid colors pop and helps customers easily spot their favorite brands and flavors. Create eye-catching displays that draw attention from across the store.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Lockable Glass Improves Security',
                description: 'Commercial-grade locking systems keep high-value vape devices and premium e-liquids secure while remaining easily accessible to staff during busy periods.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Clean Modern Design Builds Trust',
                description: 'Professional, well-lit displays create an environment of trust and professionalism that encourages customers to spend more time and money in your store.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Organized Layout Improves Shopping Experience',
                description: 'Adjustable glass shelves accommodate products of all sizes, from small vape pods to large hookahs and glass pieces. Make product comparison easy for customers.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm">
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PRODUCT SECTION - Recommended Display Cases
          ============================================ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Recommended Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 text-lg">
              Choose the perfect display case for your store layout and product range.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayProducts.length > 0 ? (
              displayProducts.map((product: Product, index: number) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
                      <span className="text-sm font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                    <p className="text-gray-600 mb-6">
                      {product.title.includes('48') 
                        ? 'Perfect for checkout areas and counter displays. RGB lighting increases impulse purchases. Ideal for vape products, accessories, and small items that need maximum visibility.'
                        : product.title.includes('70')
                        ? 'Full-height showcase with maximum visibility. Commands attention and stores your entire premium collection of vape products and glass pieces. Perfect for feature walls.'
                        : 'Professional LED display case with RGB lighting. Perfect for showcasing premium products with maximum visibility and security.'
                      }
                    </p>
                    <ul className="mb-8 space-y-2">
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        RGB LED lighting system
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Lockable tempered glass doors
                      </li>
                      <li className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Commercial-grade construction
                      </li>
                    </ul>
                    <Button href={getProductUrl(product.handle)} variant="primary" size="lg" fullWidth>
                      View Product
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              // Fallback if no products available
              <>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <span className="text-lg font-medium">48" LED Display Case</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">48" LED Display Case</h3>
                    <p className="text-gray-600 mb-6">
                      Perfect for checkout areas and counter displays. RGB lighting increases impulse purchases.
                    </p>
                    <Button href={ROUTES.COLLECTION} variant="primary" size="lg" fullWidth>
                      View All Products
                    </Button>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <span className="text-lg font-medium">70" LED Display Case</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">70" LED Display Case</h3>
                    <p className="text-gray-600 mb-6">
                      Full-height showcase with maximum visibility. Perfect for feature walls.
                    </p>
                    <Button href={ROUTES.COLLECTION} variant="primary" size="lg" fullWidth>
                      View All Products
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Button href={ROUTES.COLLECTION} variant="secondary" size="lg">
              Browse All Display Cases
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================
          ROI / VALUE SECTION
          ============================================ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">A Better Display Doesn't Just Look Good — It Helps Sell More Products</h2>
              <p className="text-xl text-gray-600">
                Professional display cases are an investment that pays for itself through increased sales.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Increased Visibility</h3>
                <p className="text-gray-600">LED lighting makes products impossible to miss, leading to more impulse purchases and higher average order values.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Higher Perceived Value</h3>
                <p className="text-gray-600">Premium presentation justifies premium pricing. Customers are willing to pay more for products that look valuable.</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Longer Browsing Time</h3>
                <p className="text-gray-600">Organized, attractive displays encourage customers to browse longer, increasing the likelihood of additional purchases.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA SECTION
          ============================================ */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Upgrade Your Smoke Shop?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join hundreds of smoke shop owners who have transformed their retail space with professional LED display cases. Increase sales, improve security, and create a premium shopping experience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                Browse All Display Cases
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}