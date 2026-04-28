import { getProducts } from '@/lib/shopify';
import { getAllFallbackProducts } from '@/data/fallback-products';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'RGB LED Display Cases | Color-Changing Retail Displays | Master Display Cases',
  description: 'RGB LED display cases with customizable lighting. Create dynamic product presentations with 16 million colors and remote/app control.',
  keywords: 'RGB display cases, LED display cases, color changing displays, smart display cases, app controlled displays',
  openGraph: {
    title: 'RGB LED Display Cases | Master Display Cases',
    description: 'Transform your retail space with customizable RGB lighting. 16 million colors, app control, and energy-efficient LEDs.',
    type: 'website',
  },
};

// Revenue increase data
const REVENUE_DATA = [
  {
    metric: '+35%',
    label: 'Impulse Purchases',
    description: 'Dynamic lighting triggers spontaneous buying decisions',
  },
  {
    metric: '+25%',
    label: 'Perceived Value',
    description: 'Products appear more premium under RGB lighting',
  },
  {
    metric: '+40%',
    label: 'Dwell Time',
    description: 'Customers spend more time engaging with illuminated displays',
  },
  {
    metric: '30-60',
    label: 'Day ROI',
    description: 'Most stores recover the investment in 1-2 months',
  },
];

export default async function RGBDisplaysCollection() {
  let products: any[] = [];
  let useFallback = false;
  
  try {
    products = await getProducts();
    if (!products || products.length === 0) {
      useFallback = true;
    }
  } catch (error) {
    // Expected behavior when Storefront API is not enabled - use fallback products
    useFallback = true;
  }
  
  // Use fallback products if API failed
  if (useFallback) {
    products = getAllFallbackProducts();
  }
  
  // Show ALL display products (not just RGB/LED tagged ones)
  const allProducts = products.slice(0, 12);
  
  // Filter for RGB display products for the featured section
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
              <span>RGB Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">RGB LED Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Transform your retail space with customizable RGB lighting. Create dynamic product 
              presentations that capture attention and drive sales with 16 million color options.
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
              { icon: '🎨', text: '16M Color Options' },
              { icon: '📱', text: 'App Control' },
              { icon: '⚡', text: 'Energy Efficient' },
              { icon: '📈', text: '+40% Dwell Time' },
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
            <h2 className="heading-lg mt-4 text-green-900">Why This Increases Revenue</h2>
            <p className="text-green-800 mt-4">
              RGB lighting isn't just aesthetic—it's a proven sales driver backed by retail psychology research.
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
            <h2 className="heading-md mb-4">RGB Display Collection</h2>
            <p className="text-gray-600 max-w-3xl">
              Our RGB LED display cases combine premium construction with smart lighting technology. 
              Control colors, brightness, and effects remotely or through our mobile app to create 
              the perfect ambiance for your products.
            </p>
          </div>

          {/* Show all products if RGB products are available, otherwise show all products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(rgbProducts.length > 0 ? rgbProducts : allProducts).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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
              Smart Lighting Technology
            </span>
            <h2 className="heading-lg mt-2">Why RGB Lighting Matters</h2>
            <p className="text-gray-600 mt-4">
              Studies show that dynamic lighting increases customer dwell time by up to 40% 
              and can significantly boost impulse purchases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: '16 Million Colors',
                description: 'Choose from 16 million color combinations to match your brand, products, or seasonal themes. Create custom color profiles for different times of day or special events.',
                features: ['Full spectrum RGB', 'Custom color presets', 'Fade transitions', 'Static or dynamic modes'],
              },
              {
                title: 'Smart Control',
                description: 'Control your displays from anywhere using our mobile app or included remote. Set schedules, create scenes, and sync multiple displays for a cohesive look.',
                features: ['Mobile app control', 'Voice assistant compatible', 'Scheduling features', 'Multi-display sync'],
              },
              {
                title: 'Energy Efficient',
                description: 'LED technology uses 80% less energy than traditional lighting while providing brighter, more consistent illumination. Long-lasting LEDs reduce maintenance costs.',
                features: ['80% energy savings', '50,000 hour lifespan', 'Low heat output', 'Eco-friendly'],
              },
              {
                title: 'Increase Sales',
                description: 'Strategic lighting can highlight specific products, create mood, and guide customer attention. RGB lighting has been proven to increase perceived product value.',
                features: ['Highlight products', 'Create ambiance', 'Seasonal themes', 'Brand consistency'],
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
            <h2 className="heading-lg mt-2">RGB Displays by Industry</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                industry: 'Vape Shops',
                description: 'Create an eye-catching display that matches your brand aesthetic. RGB lighting highlights product varieties and creates a modern, tech-forward atmosphere.',
                color: 'from-purple-500 to-blue-500',
              },
              {
                industry: 'Jewelry Stores',
                description: 'Use warm amber tones to enhance gold pieces or cool whites to make diamonds sparkle. Change lighting to match different collections or seasons.',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                industry: 'Electronics',
                description: 'Create a futuristic display environment that complements tech products. Use dynamic color cycles to draw attention to new arrivals and featured items.',
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
            <h2 className="heading-lg mb-6">Ready to Light Up Your Store?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              RGB display cases transform ordinary retail spaces into captivating experiences. 
              Contact us for a custom lighting consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Get a Quote
              </Button>
              <Button href="/buying-guide" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Lighting Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}