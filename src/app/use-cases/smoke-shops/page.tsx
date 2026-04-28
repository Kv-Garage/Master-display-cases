import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Smoke Shops | Vape Shop Displays | Master Display Cases',
  description: 'Purpose-built display cases for smoke shops and vape stores. Secure locking, RGB lighting, and flexible shelving for vape products and accessories.',
  keywords: 'smoke shop displays, vape shop displays, vape counter displays, CBD display cases',
};

export default function SmokeShopsUseCase() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products/led-retail-display-showcase" className="hover:text-white">Use Cases</Link>
              <span className="mx-2">/</span>
              <span>Smoke Shops</span>
            </nav>
            <h1 className="heading-xl mb-6">Display Solutions for Smoke Shops & Vape Stores</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Secure, well-lit displays designed specifically for vape products, CBD items, 
              and smoking accessories. Increase impulse purchases while keeping high-value 
              inventory protected.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Why This Display Works for Smoke Shops</h2>
            <p className="text-gray-600 mt-4">
              The unique needs of vape and smoke retail require specialized display solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Secure Vape Storage',
                description: 'Integrated locking systems keep high-value vape devices and premium e-liquids secure while remaining easily accessible to staff.',
              },
              {
                title: 'RGB Product Highlighting',
                description: 'Color-changing LED lighting makes e-liquid colors pop and helps customers easily spot their favorite brands and flavors.',
              },
              {
                title: 'Flexible Shelving',
                description: 'Adjustable glass shelves accommodate products of all sizes, from small vape pods to large hookahs and glass pieces.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Upgrade Your Smoke Shop?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional displays that increase sales and keep your products secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/products/led-retail-display-showcase" variant="primary" size="lg">
                View RGB Display Case
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}