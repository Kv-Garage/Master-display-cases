import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Convenience Stores | Durable Retail Display Solutions | Master Display Cases',
  description: 'Durable display cases built for high-traffic convenience stores. Maximize product visibility, organize inventory efficiently, and increase impulse purchases with professional retail displays.',
  keywords: 'display cases for convenience stores, convenience store displays, retail display cases, glass display cases for convenience stores, LED display cases, counter displays for convenience stores',
  openGraph: {
    title: 'Display Cases for Convenience Stores | Master Display Cases',
    description: 'Durable display cases built for high-traffic convenience stores. Maximize product visibility and increase impulse purchases.',
    type: 'website',
  },
};

export default function DisplayCasesForConvenienceStores() {
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
              <span>Convenience Stores</span>
            </nav>
            <h1 className="heading-xl mb-6">
              Durable Display Cases for Convenience Stores Built for High Traffic
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Commercial-grade glass display cases designed to withstand the demands 
              of high-traffic convenience stores. Maximize product visibility, organize 
              inventory efficiently, and increase impulse purchases.
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

      {/* Product Ad - AFTER HERO (Critical Placement) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              High-Traffic Retail Display
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              Commercial-grade display case perfect for checkout areas and high-traffic convenience store environments.
            </p>
          </div>
          <FeaturedProductAd variant="large" />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6">Why Display Matters in Convenience Stores</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                Convenience stores operate in a fast-paced environment where every square foot counts. 
                Your display setup directly impacts how efficiently customers can find what they need 
                and how much they end up buying.
              </p>
              <p className="mb-6">
                In convenience retail, impulse purchases drive significant revenue. Customers come in 
                for one item but leave with several. Strategic product placement in well-organized 
                display cases can dramatically increase basket size and overall sales.
              </p>
              <p>
                Professional display cases do more than hold products — they create an organized, 
                professional environment that encourages browsing and makes the shopping experience 
                faster and more enjoyable for your customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Challenges in Convenience Store Retail</h2>
            <p className="text-gray-600 mt-4">
              Convenience store owners face unique challenges in high-traffic environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'High Customer Traffic',
                description: "Constant customer flow puts wear and tear on displays, requiring durable solutions that can withstand heavy use without breaking down.",
              },
              {
                title: 'Limited Space',
                description: "Every square foot must work harder. Inefficient layouts waste valuable retail space and make it harder for customers to find products.",
              },
              {
                title: 'Fast Decision-Making',
                description: "Convenience store customers make quick decisions. Poor product visibility or disorganization can lead to abandoned purchases.",
              },
              {
                title: 'Product Security',
                description: "High-traffic environments increase the risk of theft. Valuable items need secure display without slowing down the shopping experience.",
              },
              {
                title: 'Inventory Management',
                description: "Mixed product types and sizes create organization challenges. Without proper shelving, inventory becomes chaotic and hard to manage.",
              },
              {
                title: 'Maintenance Demands',
                description: "Frequent cleaning and restocking require displays that are easy to access and maintain without disrupting store operations.",
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
              Our commercial-grade display cases are built for the demands of convenience retail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Commercial Durability',
                description: "Heavy-duty construction with tempered glass and reinforced frames designed to withstand high-traffic environments and constant use.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: 'Clear Product Visibility',
                description: "Crystal-clear glass and strategic lighting ensure products are easily visible, helping customers make fast decisions and reducing time spent searching.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Efficient Layout',
                description: "Modular design and adjustable shelving maximize every inch of space, accommodating products of all sizes and making restocking quick and easy.",
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
            <h2 className="heading-lg">Benefits of Professional Convenience Store Displays</h2>
            <p className="text-gray-600 mt-4">
              Upgrade your store with displays designed for high-traffic retail environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Increase impulse purchases with strategic product placement',
              'Withstand heavy daily use with commercial-grade construction',
              'Maximize limited space with efficient, modular layouts',
              'Speed up customer decisions with clear product visibility',
              'Reduce theft with secure locking options for high-value items',
              'Easy to clean and maintain in high-traffic environments',
              'Accommodate diverse product sizes with adjustable shelving',
              'Professional appearance enhances store credibility',
              'Faster restocking with easy-access designs',
              'Better inventory organization reduces waste and spoilage',
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

      {/* Product Ad - MID PAGE (After Benefits) */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="heading-lg">Maximize Your Checkout Area</h2>
            <p className="text-gray-600 mt-3">
              Increase impulse purchases with strategic product placement near the register.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Perfect For All Convenience Store Products</h2>
            <p className="text-gray-600 mt-4">
              Our display cases handle the diverse product range found in convenience stores.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Snacks & Candy', description: 'Organized displays for chips, candy bars, and grab-and-go items.' },
              { title: 'Beverages', description: 'Secure displays for premium drinks and energy products.' },
              { title: 'Tobacco Products', description: 'Lockable cases for cigarettes, cigars, and vaping products.' },
              { title: 'Lottery & Cards', description: 'Counter displays perfect for lottery tickets and greeting cards.' },
              { title: 'Phone Accessories', description: 'Secure cases for chargers, cases, and electronics.' },
              { title: 'Health & Beauty', description: 'Organized displays for OTC meds and personal care items.' },
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
            <h2 className="heading-lg">Trusted by Convenience Stores</h2>
            <p className="text-gray-400 mt-4">
              Join convenience store owners who have improved their retail operations.
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
            <h2 className="heading-lg">Recommended Display Cases for Convenience Stores</h2>
            <p className="text-gray-600 mt-4">
              Explore our collection of durable displays perfect for convenience retail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">48" Counter Display (RGB)</h3>
              <p className="text-gray-600 mb-6">
                Perfect for checkout areas, these compact displays maximize impulse 
                purchases of candy, gum, and small items near the register.
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
                Tall, high-capacity displays perfect for beverages, snacks, and 
                larger items. Maximize vertical space in tight retail environments.
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

      {/* Product Ad - END (Final CTA) */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="heading-lg">Ready to Upgrade Your Convenience Store?</h2>
            <p className="text-gray-600 mt-3 mb-8">
              Professional display cases that increase sales, improve organization, 
              and withstand the demands of high-traffic retail.
            </p>
          </div>
          <FeaturedProductAd variant="compact" />
          <div className="text-center mt-8">
            <Link 
              href={ROUTES.PRODUCTS.DISPLAY_48}
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              View Product Details
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Ready to Upgrade Your Convenience Store?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional display cases that increase sales, improve organization, 
              and withstand the demands of high-traffic retail.
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