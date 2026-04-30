import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Electronics Stores | Secure Tech Display Solutions | Master Display Cases',
  description: 'Secure display cases for electronics retail with integrated security features. Perfect for phones, tablets, gaming accessories, and high-value tech products. Commercial-grade protection with modern aesthetics.',
  keywords: 'display cases for electronics, electronics display cases, phone display cases, tablet display cases, tech retail displays, secure electronics display, LED display cases for electronics',
  openGraph: {
    title: 'Display Cases for Electronics Stores | Master Display Cases',
    description: 'Secure display cases for electronics retail. Perfect for phones, tablets, and tech accessories with integrated security.',
    type: 'website',
  },
};

export default function ElectronicsUseCase() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/use-cases" className="hover:text-white">Use Cases</Link>
              <span className="mx-2">/</span>
              <span>Electronics</span>
            </nav>
            <h1 className="heading-xl mb-6">
              Secure Display Cases for Electronics Stores That Protect & Sell
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Commercial-grade glass display cases with integrated security systems 
              designed for high-value electronics. Showcase phones, tablets, and tech 
              accessories while preventing theft and damage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/collections/electronics-displays" variant="primary" size="lg">
                Shop Electronics Display Cases
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Challenges in Electronics Retail Display</h2>
            <p className="text-gray-600 mt-4">
              Electronics retailers face unique security and presentation challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'High Theft Risk',
                description: 'Small, high-value electronics like phones and earbuds are prime targets for theft, leading to significant losses.',
              },
              {
                title: 'Product Damage',
                description: 'Customers handling demo units can cause damage, reducing resale value and creating waste.',
              },
              {
                title: 'Poor Organization',
                description: 'Mixed product sizes and types create cluttered displays that confuse customers and hide inventory.',
              },
              {
                title: 'Outdated Presentation',
                description: 'Generic displays don\'t reflect the cutting-edge nature of tech products, reducing perceived innovation.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">How Our Display Cases Secure Electronics Retail</h2>
            <p className="text-gray-600 mt-4">
              Our security-focused display cases are engineered for high-value electronics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Integrated Security',
                description: 'Commercial-grade locking systems with tamper-resistant hardware protect high-value electronics from theft while maintaining easy staff access for customer assistance.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Tech-Forward Design',
                description: 'Modern aesthetics with RGB lighting that complements tech products and creates an environment that feels as innovative as the products you sell.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Flexible Configuration',
                description: 'Adjustable shelving and modular components accommodate devices of all sizes, from small earbuds to large tablets, with room for charging cables and accessories.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="text-blue-600 mb-4">{item.icon}</div>
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Benefits of Professional Electronics Displays</h2>
            <p className="text-gray-600 mt-4">
              Secure your inventory while creating an engaging tech shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Prevent theft with commercial-grade locking systems and tempered glass',
              'Protect demo units from damage while allowing customer interaction',
              'Organize products by category, brand, or price for easier shopping',
              'Modern LED lighting highlights product features and creates appeal',
              'Accommodate charging stations and cable management for demo units',
              'Flexible shelving adapts to new products and changing inventory',
              'Professional presentation increases perceived value and trust',
              'Reduce shrinkage and increase profitability with secure displays',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg">Trusted by Electronics Retailers</h2>
            <p className="text-gray-400 mt-4">
              Join tech stores that have secured their inventory and improved sales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
              <p className="text-gray-400">Stores Trust Us</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">5-Year</div>
              <p className="text-gray-400">Warranty Included</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Nationwide</div>
              <p className="text-gray-400">Freight Shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Push Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg">Recommended Display Cases for Electronics</h2>
            <p className="text-gray-600 mt-4">
              Explore our collection of secure display cases perfect for electronics retailers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">Secure Counter Display</h3>
              <p className="text-gray-600 mb-6">
                Lockable counter-top displays perfect for phones, tablets, and 
                high-value accessories. Ideal for checkout areas and customer service desks.
              </p>
              <Link 
                href="/collections/counter-displays" 
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
              >
                View Counter Displays
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">RGB LED Showcase</h3>
              <p className="text-gray-600 mb-6">
                Our flagship display with integrated security and RGB lighting, 
                perfect for showcasing premium electronics and creating buzz.
              </p>
              <Link 
                href="/products/led-retail-display-showcase" 
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
              >
                View Product Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/collections/retail-displays" 
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
            >
              Browse All Electronics Display Cases
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">
              Ready to Secure Your Electronics Display?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional display cases that protect your inventory, organize your 
              products, and create a modern shopping experience for tech customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/collections/retail-displays" variant="primary" size="lg">
                Shop Display Cases
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}