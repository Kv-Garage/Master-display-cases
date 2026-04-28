import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Floor Standing Display Cases | Full-Height Retail Showcases | Master Display Cases',
  description: 'Commercial-grade floor standing display cases for maximum visibility. Perfect for showcasing premium products in retail stores, boutiques, and showrooms.',
  keywords: 'floor standing display cases, full height showcases, retail floor displays, glass floor displays, LED floor displays',
  openGraph: {
    title: 'Floor Standing Display Cases | Master Display Cases',
    description: 'Command attention with full-height display cases. Maximum visibility for premium products.',
    type: 'website',
  },
};

export default async function FloorDisplaysCollection() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
  }
  // Filter for floor display products
  const floorProducts = products.filter((p: any) => 
    p.title.toLowerCase().includes('floor') || 
    p.title.toLowerCase().includes('showcase') ||
    p.title.toLowerCase().includes('70"') ||
    p.title.toLowerCase().includes('72"') ||
    p.tags?.some((tag: string) => tag.toLowerCase().includes('floor'))
  ).slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Floor Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">Floor Standing Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Full-height display cases that command attention and showcase your entire premium collection. 
              Perfect for high-traffic retail environments and flagship stores.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📦', text: 'Shipping Calculated at Checkout' },
              { icon: '🔒', text: 'Premium Security' },
              { icon: '💡', text: 'Full-Height Lighting' },
              { icon: '🛡️', text: 'Commercial Grade' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="heading-md mb-4">Floor Standing Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Our floor standing display cases offer maximum visibility and storage capacity. 
              These full-height showcases are ideal for displaying large product collections 
              while maintaining a premium, professional appearance.
            </p>
          </div>

          {floorProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Fallback products */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2">70" Floor Standing Showcase</h3>
                    <p className="text-sm text-gray-500 mb-4">Full-height, RGB lighting</p>
                    <p className="text-lg font-bold">$899</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button href="/collections/all" variant="outline" size="lg">
              View All Displays
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Key Features
            </span>
            <h2 className="heading-lg mt-2">Why Choose Floor Standing Displays?</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                ),
                title: 'Maximum Visibility',
                description: 'Full-height design showcases your entire product collection from floor to ceiling, capturing attention from across the store.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                title: 'Premium Security',
                description: 'Commercial-grade locking systems protect high-value inventory while maintaining an elegant, accessible display.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Enhanced Lighting',
                description: 'Integrated LED/RGB lighting systems illuminate your products from multiple angles, creating dramatic visual impact.',
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

      {/* SEO Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-6">Floor Standing Display Cases for Premium Retail</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Floor standing display cases are the cornerstone of premium retail environments. 
                These full-height showcases provide maximum visibility and storage capacity while 
                creating a dramatic focal point in your store.
              </p>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Ideal Applications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Flagship retail stores and showrooms</li>
                <li>Jewelry and luxury goods retailers</li>
                <li>Electronics and tech product displays</li>
                <li>Art galleries and museum exhibits</li>
                <li>Trade show and exhibition displays</li>
              </ul>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Customization Options</h3>
              <p>
                All floor standing displays can be customized with mirror backs, custom shelving 
                configurations, branded graphics, and specialized lighting to match your brand identity.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}