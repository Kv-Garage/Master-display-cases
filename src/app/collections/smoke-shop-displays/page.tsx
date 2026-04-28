import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Smoke Shop Display Cases | Vape Shop Displays | Master Display Cases',
  description: 'Specialized display cases for smoke shops and vape stores. Secure, well-lit displays perfect for vape products, CBD, and smoking accessories.',
  keywords: 'smoke shop displays, vape shop displays, CBD display cases, head shop displays, vape counter displays',
  openGraph: {
    title: 'Smoke Shop Display Cases | Master Display Cases',
    description: 'Purpose-built displays for smoke shops and vape stores. Maximize sales with professional product presentation.',
    type: 'website',
  },
};

export default async function SmokeShopDisplaysCollection() {
  const products = await getProducts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Smoke Shop Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">Smoke Shop & Vape Store Displays</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Purpose-built display cases designed specifically for smoke shops and vape stores. 
              Secure storage with premium presentation to showcase your vape products, CBD items, 
              and smoking accessories.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Stats */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '+45%', label: 'More Impulse Sales' },
              { value: '500+', label: 'Shops Equipped' },
              { value: '+30%', label: 'Higher AOV' },
              { value: '24/7', label: 'Secure Storage' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="heading-md mb-4">Recommended for Smoke Shops</h2>
            <p className="text-gray-600 max-w-3xl">
              Our most popular display configurations for vape shops and smoke stores. 
              These setups are designed to maximize visibility of vape products while 
              keeping high-value items secure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2 block">
                    Popular Choice
                  </span>
                  <h3 className="font-bold mb-2">48" Vape Counter Display</h3>
                  <p className="text-sm text-gray-500 mb-4">RGB lighting, locking doors, adjustable shelves</p>
                  <p className="text-lg font-bold">$449</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/collections/all" variant="outline" size="lg">
              View All Displays
            </Button>
          </div>
        </div>
      </section>

      {/* Features for Smoke Shops */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Built for Your Industry
            </span>
            <h2 className="heading-lg mt-2">Why Smoke Shops Choose Us</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure Storage',
                description: 'Integrated locking systems keep high-value vape products and CBD items secure while remaining easily accessible to staff.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'RGB Product Highlighting',
                description: 'Color-changing LED lighting makes vape products pop and helps customers easily spot their favorite brands and flavors.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
                title: 'Flexible Shelving',
                description: 'Adjustable glass shelves accommodate products of all sizes, from small vape pods to large hookahs and glass pieces.',
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
            <h2 className="heading-md mb-6">Display Solutions for Modern Smoke Shops</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                The vape and smoke shop industry requires specialized display solutions that balance 
                security with accessibility. Our display cases are designed with input from successful 
                smoke shop owners to address the unique challenges of retailing vape products, CBD items, 
                and smoking accessories.
              </p>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Perfect For</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Vape shops and vape lounges</li>
                <li>CBD and hemp stores</li>
                <li>Head shops and smoke shops</li>
                <li>Tobacco shops</li>
                <li>Convenience stores with vape sections</li>
              </ul>
              <h3 className="text-xl font-bold text-black mt-8 mb-4">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Locking doors for secure storage of high-value items</li>
                <li>RGB lighting to highlight product varieties</li>
                <li>Adjustable shelving for products of all sizes</li>
                <li>Easy-clean glass surfaces</li>
                <li>Professional appearance that elevates your brand</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Upgrade Your Smoke Shop Today</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Professional displays that increase sales and keep your products secure. 
              Get a custom quote for your smoke shop or vape store.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Get a Quote
              </Button>
              <Button href="/wholesale" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Wholesale Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}