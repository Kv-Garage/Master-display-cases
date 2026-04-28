import { getProducts, getCollection, getCollectionProducts } from '@/lib/shopify';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'All Display Cases | RGB, LED & Commercial Display Cases | Master Display Cases',
  description: 'Browse our complete collection of commercial display cases. RGB LED displays, counter displays, floor showcases, and more. Freight shipping nationwide.',
  keywords: 'display cases, RGB display cases, LED display cases, commercial displays, retail displays, counter displays, floor displays',
  openGraph: {
    title: 'All Display Cases | Master Display Cases',
    description: 'Complete collection of commercial-grade display cases for retail stores.',
    type: 'website',
  },
};

// Revenue increase data
const REVENUE_DATA = [
  {
    metric: '+35%',
    label: 'Impulse Purchases',
    description: 'Professional displays trigger spontaneous buying decisions',
  },
  {
    metric: '+25%',
    label: 'Perceived Value',
    description: 'Products appear more premium in glass displays',
  },
  {
    metric: '+40%',
    label: 'Dwell Time',
    description: 'Customers spend more time engaging with displayed products',
  },
  {
    metric: '30-60',
    label: 'Day ROI',
    description: 'Most stores recover the investment in 1-2 months',
  },
];

export default async function AllDisplayCasesCollection() {
  // Try to get products from the rgb-display-cases collection first
  let products: any[] = [];
  let collection = null;
  
  try {
    collection = await getCollection('rgb-display-cases');
    if (collection) {
      products = await getCollectionProducts('rgb-display-cases');
    }
  } catch (error) {
    console.error('Error fetching rgb-display-cases collection:', error);
  }

  // Fallback to all products if collection is empty or doesn't exist
  if (products.length === 0) {
    try {
      products = await getProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Filter for RGB/LED products for the featured section
  const rgbProducts = products.filter((p: any) => 
    p.title.toLowerCase().includes('rgb') || 
    p.title.toLowerCase().includes('led') ||
    p.tags?.some((tag: string) => tag.toLowerCase().includes('rgb') || tag.toLowerCase().includes('led'))
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>All Display Cases</span>
            </nav>
            <h1 className="heading-xl mb-6">All Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Explore our complete collection of commercial-grade display cases. 
              From RGB LED showcases to countertop displays, find the perfect solution 
              to elevate your retail presentation.
            </p>
          </div>
        </div>
        {/* Gradient overlay for visual effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 pointer-events-none" />
      </section>

      {/* Benefits Bar */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏪', text: 'Commercial Grade' },
              { icon: '💡', text: 'LED/RGB Options' },
              { icon: '🚚', text: 'Freight Shipping' },
              { icon: '📈', text: 'Proven ROI' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "Why This Increases Revenue" Section */}
      <section className="py-12 bg-green-50 border-b border-green-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-100 px-4 py-1 rounded-full">
              Revenue Impact
            </span>
            <h2 className="heading-lg mt-4 text-green-900">Why Professional Displays Increase Revenue</h2>
            <p className="text-green-800 mt-4">
              Professional display cases aren't just furniture—they're proven sales drivers backed by retail psychology research.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {REVENUE_DATA.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm border border-green-100">
                <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">{item.metric}</div>
                <div className="font-semibold text-green-900 mb-1">{item.label}</div>
                <div className="text-xs text-green-700">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2 className="heading-md mb-4">Complete Display Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Browse our full range of commercial display cases. From RGB LED showcases with 
              customizable lighting to standard glass displays, find the perfect solution for 
              your retail space.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Products are being loaded. Please check back soon.</p>
              <Button href="/contact">Contact Us for Catalog</Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button href="/contact" variant="outline" size="lg">
              Request Full Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Built for Business
            </span>
            <h2 className="heading-lg mt-2">Why Choose Master Display Cases</h2>
            <p className="text-gray-600 mt-4">
              Our display cases are engineered for commercial use, designed to withstand 
              the demands of busy retail environments while maximizing product visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Commercial Grade Construction',
                description: 'Built with tempered glass, aluminum frames, and reinforced joints to withstand daily commercial use. Designed for longevity in high-traffic retail environments.',
                features: ['Tempered safety glass', 'Aluminum frames', 'Reinforced corners', 'Locking mechanisms'],
              },
              {
                title: 'Professional Lighting',
                description: 'Integrated LED and RGB lighting options provide optimal illumination for your products. Energy-efficient and long-lasting with customizable color temperatures.',
                features: ['LED strip lighting', 'RGB color options', 'Remote controls', 'Dimmable options'],
              },
              {
                title: 'Flexible Configurations',
                description: 'From countertop displays to floor-standing showcases, we offer sizes and configurations for every retail space. Custom dimensions available.',
                features: ['Countertop models', 'Floor-standing units', 'Wall-mounted options', 'Custom sizes'],
              },
              {
                title: 'Nationwide Delivery',
                description: 'LTL freight shipping to businesses across the continental US. Professional delivery with liftgate service and inside delivery options available.',
                features: ['LTL freight shipping', 'Liftgate service', 'Inside delivery', 'Tracking included'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Perfect For
            </span>
            <h2 className="heading-lg mt-2">Display Cases by Industry</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                industry: 'Vape & Smoke Shops',
                description: 'Secure display cases with locking mechanisms perfect for showcasing vaping products, accessories, and premium items.',
                color: 'from-purple-500 to-blue-500',
              },
              {
                industry: 'Jewelry Stores',
                description: 'Elegant glass displays with optimal lighting to showcase fine jewelry, watches, and luxury accessories.',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                industry: 'Electronics & Tech',
                description: 'Modern display solutions for smartphones, tablets, headphones, and other consumer electronics.',
                color: 'from-blue-500 to-cyan-500',
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${item.color}`} />
                <div className="p-8">
                  <h3 className="heading-sm mb-3">{item.industry}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Upgrade Your Store?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Professional display cases transform ordinary retail spaces into captivating 
              sales environments. Get a custom quote for your business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Get a Custom Quote
              </Button>
              <Button href="/buying-guide" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                View Buying Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}