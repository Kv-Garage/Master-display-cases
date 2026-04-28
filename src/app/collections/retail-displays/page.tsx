import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Retail Display Cases | Store Display Solutions | Master Display Cases',
  description: 'Professional retail display cases for all store types. From boutiques to electronics stores, find the perfect display solution for your products.',
  keywords: 'retail display cases, store displays, product showcases, retail fixtures, commercial displays',
  openGraph: {
    title: 'Retail Display Cases | Master Display Cases',
    description: 'Professional display solutions for all retail environments. Increase sales with better product presentation.',
    type: 'website',
  },
};

const retailTypes = [
  {
    name: 'Boutiques',
    description: 'Elegant displays for fashion, accessories, and luxury goods.',
    icon: '👗',
  },
  {
    name: 'Electronics',
    description: 'Secure displays for phones, tablets, and tech accessories.',
    icon: '📱',
  },
  {
    name: 'Jewelry Stores',
    description: 'Premium showcases with enhanced lighting for fine jewelry.',
    icon: '💎',
  },
  {
    name: 'Convenience Stores',
    description: 'High-traffic solutions for quick-service retail environments.',
    icon: '🏪',
  },
  {
    name: 'Beauty & Cosmetics',
    description: 'Stylish displays for makeup, skincare, and beauty products.',
    icon: '💄',
  },
  {
    name: 'Art Galleries',
    description: 'Museum-quality displays for art and collectibles.',
    icon: '🎨',
  },
];

export default function RetailDisplaysCollection() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span>Retail Displays</span>
            </nav>
            <h1 className="heading-xl mb-6">Retail Display Cases</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Professional display solutions for every type of retail environment. 
              From boutique shops to large retail chains, our displays help you 
              showcase products beautifully and securely.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '+35%', label: 'More Sales' },
              { value: '1000+', label: 'Stores Equipped' },
              { value: '50+', label: 'Retail Types' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Solutions by Industry
            </span>
            <h2 className="heading-lg mt-2">Displays for Every Retail Type</h2>
            <p className="text-gray-600 mt-4">
              Whatever you sell, we have display solutions designed specifically for your industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {retailTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4 block">{type.icon}</span>
                <h3 className="heading-sm mb-3">{type.name}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Why Choose Us
            </span>
            <h2 className="heading-lg mt-2">The Retail Display Experts</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Custom Solutions',
                description: 'We offer custom sizes, colors, and configurations to match your brand and space perfectly.',
              },
              {
                title: 'Fast Delivery',
                description: 'Most orders ship within 5-7 business days. Expedited options available for urgent needs.',
              },
              {
                title: 'Expert Support',
                description: 'Our retail display specialists help you choose the right solutions for your specific needs.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Find the Right Display for Your Store</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Whether you need a single display or outfitting an entire store, 
              our team is ready to help you find the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Get a Quote
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