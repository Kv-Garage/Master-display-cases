import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Counter Display Cases | Retail Countertop Displays | Master Display Cases',
  description: 'Professional countertop display cases for retail stores. Perfect for smoke shops, jewelry stores, and boutiques. RGB lighting options available.',
  keywords: 'counter display cases, countertop displays, retail counter displays, glass counter displays, LED counter displays',
  openGraph: {
    title: 'Counter Display Cases | Master Display Cases',
    description: 'Professional countertop display cases for retail. Increase impulse purchases by 35%.',
    type: 'website',
  },
};

export default async function CounterDisplaysCollection() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
  }
  // Filter for counter display products (in a real app, this would use collection filtering)
  const counterProducts = products.filter((p: any) => 
    p.title.toLowerCase().includes('counter') || 
    p.title.toLowerCase().includes('countertop') ||
    p.tags?.some((tag: string) => tag.toLowerCase().includes('counter'))
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
              <span>Counter Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">Counter Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Professional countertop display cases designed to maximize visibility and impulse purchases. 
              Perfect for checkout areas, jewelry displays, and premium product showcasing.
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
              { icon: '🔒', text: 'Integrated Locking' },
              { icon: '💡', text: 'RGB Lighting Options' },
              { icon: '🛡️', text: '2-Year Warranty' },
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
            <h2 className="heading-md mb-4">Our Counter Display Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Choose from a variety of countertop display cases in different sizes and configurations. 
              All units feature tempered glass construction, integrated lighting, and security locks.
            </p>
          </div>

          {counterProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {counterProducts.map((product: any) => (
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
                    <h3 className="font-bold mb-2">48" Counter Display</h3>
                    <p className="text-sm text-gray-500 mb-4">RGB lighting, tempered glass</p>
                    <p className="text-lg font-bold">$449</p>
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

      {/* SEO Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-6">Why Choose Counter Display Cases?</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Counter display cases are essential for any retail environment where you want to showcase 
                premium products and increase impulse purchases. Positioned at checkout areas or high-traffic 
                zones, these displays capture customer attention and drive additional sales.
              </p>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Increase impulse purchases by up to 35%</li>
                <li>Protect valuable merchandise with integrated locks</li>
                <li>Enhance product visibility with LED/RGB lighting</li>
                <li>Create a premium shopping experience</li>
                <li>Maximize counter space efficiency</li>
              </ul>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Perfect For</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Smoke shops and vape stores</li>
                <li>Jewelry stores and boutiques</li>
                <li>Electronics retailers</li>
                <li>Convenience stores</li>
                <li>Beauty and cosmetics shops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}