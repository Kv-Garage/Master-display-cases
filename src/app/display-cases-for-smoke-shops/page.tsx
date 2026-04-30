import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Smoke Shops | Vape Shop & CBD Store Displays | Master Display Cases',
  description: 'Premium display cases designed specifically for smoke shops, vape stores, and CBD retailers. Secure locking systems, RGB lighting, and flexible shelving for vape products, glass pieces, and accessories. Increase sales and security today.',
  keywords: 'display cases for smoke shops, vape shop displays, CBD display cases, smoke shop display cases, vape counter displays, glass display cases for vape products, LED display cases for smoke shops, secure vape display, vape product showcase',
  openGraph: {
    title: 'Display Cases for Smoke Shops | Master Display Cases',
    description: 'Purpose-built display cases for smoke shops and vape stores. Secure locking, RGB lighting, and flexible shelving for vape products and accessories.',
    type: 'website',
  },
};

export default function DisplayCasesForSmokeShops() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/buying-guide" className="hover:text-white">Buying Guide</Link>
              <span className="mx-2">/</span>
              <span>Smoke Shops</span>
            </nav>
            <h1 className="heading-xl mb-6">
              Best Display Cases for Smoke Shops That Increase Sales & Security
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Purpose-built glass display cases with LED lighting and secure locking systems 
              designed specifically for vape products, CBD items, and smoking accessories. 
              Transform your smoke shop into a high-conversion retail environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                Shop Display Cases
              </Button>
              <Button href={ROUTES.CONTACT} variant="secondary" size="lg">
                Get a Free Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6">Why Display Matters in Smoke Shops</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                Running a successful smoke shop isn't just about having the right products — it's about 
                how those products are presented. From vape devices and cartridges to glass pieces and 
                accessories, your display setup directly impacts how customers perceive your store, how 
                long they stay, and how much they spend.
              </p>
              <p className="mb-6">
                If your products are hidden, cluttered, or poorly lit, you are losing sales daily. 
                Customers in smoke shops want to see products clearly before buying. They want to 
                examine vape devices, compare e-liquid colors, and inspect glass pieces for quality. 
                A clean, well-lit display case makes this possible while also protecting your inventory.
              </p>
              <p>
                Professional display cases do more than just hold products — they create an environment 
                of trust and professionalism that encourages customers to spend more time (and money) 
                in your store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Common Problems in Smoke Shop Retail</h2>
            <p className="text-gray-600 mt-4">
              Smoke shop owners face unique challenges when it comes to product display and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Poor Product Visibility',
                description: 'Small vape products and colorful e-liquids get lost on dark shelves, making it hard for customers to find what they want. Without proper lighting, the vibrant colors that attract customers are invisible.',
              },
              {
                title: 'Theft & Security Concerns',
                description: 'High-value vape devices and premium products are targets for theft, leading to significant inventory shrinkage. Open displays make it easy for shoplifters to grab and go.',
              },
              {
                title: 'Cluttered Counter Space',
                description: 'Disorganized displays create a chaotic shopping experience that undermines your brand credibility. When products are piled together, nothing looks appealing.',
              },
              {
                title: 'Low Perceived Value',
                description: "Products displayed without proper lighting or organization appear less premium, reducing customers' willingness to pay top dollar for quality items.",
              },
              {
                title: 'Difficult Product Comparison',
                description: "When products aren't displayed properly, customers can't easily compare options, leading to decision fatigue and abandoned purchases.",
              },
              {
                title: 'Brand Credibility Issues',
                description: 'A disorganized or poorly lit store suggests low-quality products. First impressions matter, and your display setup sets the tone for the entire shopping experience.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">How Our Display Cases Solve These Problems</h2>
            <p className="text-gray-600 mt-4">
              Our LED display cases are engineered specifically for smoke shop environments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'RGB LED Lighting',
                description: 'Color-changing LED lighting makes e-liquid colors pop and helps customers easily spot their favorite brands and flavors. Create eye-catching displays that draw attention from across the store.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Secure Locking Systems',
                description: 'Commercial-grade locking systems keep high-value vape devices and premium e-liquids secure while remaining easily accessible to staff during busy periods.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Flexible Shelving',
                description: 'Adjustable glass shelves accommodate products of all sizes, from small vape pods to large hookahs and glass pieces. Reconfigure as your inventory changes.',
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

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Benefits of Professional Smoke Shop Displays</h2>
            <p className="text-gray-600 mt-4">
              Upgrade your store with display cases designed for maximum conversion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Boost product visibility with built-in LED lighting that makes colors pop',
              'Secure high-value items with lockable tempered glass doors',
              'Create a premium in-store experience that justifies higher prices',
              'Maximize counter space with customizable configurations',
              'Increase impulse purchases with eye-catching product placement',
              'Protect inventory from theft while maintaining easy staff access',
              'Enhance brand perception with professional, clean presentation',
              'Accommodate all product sizes from vape pods to large glass pieces',
              'Make product comparison easy for customers',
              'Reduce inventory shrinkage with secure locking systems',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Perfect For All Smoke Shop Products</h2>
            <p className="text-gray-600 mt-4">
              Our display cases are designed to showcase every type of smoke shop product.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Vape Devices & Mods', description: 'Secure display for high-value vape devices and box mods.' },
              { title: 'E-Liquids & Cartridges', description: 'RGB lighting makes e-liquid colors pop and easy to identify.' },
              { title: 'Glass Pipes & Bongs', description: 'Adjustable shelving accommodates pieces of all sizes.' },
              { title: 'CBD Products', description: 'Professional presentation for oils, edibles, and topicals.' },
              { title: 'Accessories', description: 'Organized display for papers, lighters, and grinders.' },
              { title: 'Hookahs', description: 'Large displays perfect for hookahs and shisha products.' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg">Trusted by Smoke Shops Nationwide</h2>
            <p className="text-gray-400 mt-4">
              Join hundreds of successful smoke shop owners who have transformed their retail space.
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

      {/* Product Recommendations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg">Recommended Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 mt-4">
              Explore our collection of display cases perfect for vape shops and smoke stores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">48" Counter Display (RGB)</h3>
              <p className="text-gray-600 mb-6">
                Perfect for checkout areas. RGB lighting increases impulse purchases. 
                Ideal for vape products, accessories, and small items.
              </p>
              <Link 
                href={ROUTES.PRODUCTS.DISPLAY_48} 
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
              >
                View Product Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">70" Floor Display (RGB)</h3>
              <p className="text-gray-600 mb-6">
                Full-height showcase with maximum visibility. Commands attention and 
                stores your entire premium collection of vape products and glass pieces.
              </p>
              <Link 
                href={ROUTES.PRODUCTS.DISPLAY_70} 
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
              href={ROUTES.COLLECTION} 
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
            >
              Browse All Display Cases
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
              Ready to Upgrade Your Smoke Shop Display?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional display cases that increase sales, improve security, and create a 
              premium shopping experience for your customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                Shop Display Cases
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