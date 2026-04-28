import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Vape Shop Display Cases | CBD & Vape Store Displays | Master Display Cases',
  description: 'Specialized vape shop display cases with secure locking and RGB lighting. Perfect for showcasing vape products, e-liquids, and CBD items.',
  keywords: 'vape shop displays, vape counter displays, CBD display cases, e-liquid displays, vape showcase',
  openGraph: {
    title: 'Vape Shop Display Cases | Master Display Cases',
    description: 'Professional display solutions for vape shops. Secure, stylish, and sales-driving.',
    type: 'website',
  },
};

export default function VapeShopDisplaysCollection() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Vape Shop Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">Vape Shop Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Premium display solutions designed specifically for vape shops. 
              Showcase your e-liquids, devices, and accessories with style and security.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Built for Vape Retailers</h2>
            <p className="text-gray-600 mt-4">
              Our vape shop displays are designed with input from successful vape store owners 
              to address the unique needs of vape product retail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Secure Locking',
                description: 'Keep high-value vape devices and premium e-liquids secure with integrated locking systems.',
                icon: '🔒',
              },
              {
                title: 'RGB Lighting',
                description: 'Make your e-liquid colors pop with customizable RGB lighting. Match your brand or create dynamic displays.',
                icon: '💡',
              },
              {
                title: 'Adjustable Shelves',
                description: 'Accommodate products of all sizes, from small pods to large mod devices and e-liquid bottles.',
                icon: '📐',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <h2 className="heading-md mb-4">Popular Vape Display Configurations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose from our most popular display setups for vape shops.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: '48" Vape Counter Display', price: '$449', features: 'RGB, Locking, Adjustable' },
              { name: '70" Vape Showcase', price: '$899', features: 'Full-height, App Control' },
              { name: 'CBD Display Bundle', price: '$1,198', features: '2 Units + Assembly' },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.features}</p>
                  <p className="text-lg font-bold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/contact" variant="primary" size="lg">
              Get a Custom Quote
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Upgrade Your Vape Shop?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Professional displays that increase sales and elevate your brand. 
              Contact us for a custom quote.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}