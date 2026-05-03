import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Jewelry Stores | Luxury Jewelry Display Cases | Master Display Cases',
  description: 'Premium display cases for jewelry stores with enhanced LED lighting and secure locking. Create an elevated shopping experience that increases perceived value and drives higher-margin sales.',
  keywords: 'display cases for jewelry stores, jewelry display cases, glass display cases for jewelry, LED display cases for jewelry, secure jewelry display, luxury retail displays, jewelry showcase',
  openGraph: {
    title: 'Display Cases for Jewelry Stores | Master Display Cases',
    description: 'Luxury display cases for jewelry stores with enhanced LED lighting and secure locking. Create an elevated shopping experience that increases perceived value.',
    type: 'website',
  },
};

export default function DisplayCasesForJewelryStores() {
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
              <span>Jewelry Stores</span>
            </nav>
            <h1 className="heading-xl mb-6">
              Premium Display Cases for Jewelry Stores That Elevate Your Brand
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Luxury glass display cases with enhanced LED lighting designed to make 
              diamonds sparkle and gold shine. Create an elevated shopping experience 
              that increases perceived value and drives higher-margin sales.
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
              Premium Jewelry Display
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              Perfect for showcasing engagement rings, watches, and fine jewelry with adjustable LED lighting.
            </p>
          </div>
          <FeaturedProductAd variant="large" />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6">Why Display Matters in Jewelry Stores</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                Jewelry is all about presentation. Even the most exquisite pieces can lose their 
                appeal if displayed poorly. The way you showcase your jewelry directly impacts 
                how customers perceive its value and quality.
              </p>
              <p className="mb-6">
                In the jewelry business, first impressions are everything. When a customer walks 
                into your store, they should immediately feel the luxury and elegance that your 
                brand represents. Professional display cases do more than hold jewelry — they 
                create an atmosphere of sophistication that justifies premium pricing.
              </p>
              <p>
                The right lighting can make diamonds sparkle brilliantly, enhance the warm glow 
                of gold, and bring out the unique characteristics of every piece in your collection. 
                Without proper display, even the finest jewelry can appear ordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Challenges in Jewelry Retail Display</h2>
            <p className="text-gray-600 mt-4">
              Jewelry retailers face unique challenges when showcasing high-value items.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Poor Lighting',
                description: "Inadequate lighting fails to capture the brilliance of diamonds and the luster of precious metals, making pieces look dull and unremarkable.",
              },
              {
                title: 'Security Concerns',
                description: "High-value jewelry requires robust security without compromising the elegant presentation customers expect from a luxury jewelry store.",
              },
              {
                title: 'Lack of Elegance',
                description: "Generic display cases don't reflect the luxury and sophistication that jewelry customers expect, diminishing the overall brand experience.",
              },
              {
                title: 'Low Conversion',
                description: "Poor presentation reduces perceived value, making it harder to justify premium pricing and close high-ticket sales.",
              },
              {
                title: 'Inadequate Protection',
                description: "Without proper security features, valuable inventory is at risk of theft or damage, leading to significant financial losses.",
              },
              {
                title: 'Brand Misalignment',
                description: "Display cases that don't match your brand aesthetic create a disconnect that can confuse customers and weaken brand perception.",
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
            <h2 className="heading-lg">How Our Display Cases Transform Jewelry Retail</h2>
            <p className="text-gray-600 mt-4">
              Our luxury display cases are engineered to showcase fine jewelry at its best.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Enhanced LED Lighting',
                description: "RGB lighting with warm tones to enhance gold and cool whites to make diamonds sparkle. Adjustable color temperature ensures every piece looks its absolute best.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Premium Security',
                description: "Commercial-grade locking systems protect high-value inventory while maintaining the elegant aesthetics your customers expect from a luxury jewelry store.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: 'Luxury Presentation',
                description: "Crystal-clear tempered glass and premium finishes create an elevated shopping experience that reflects the quality and value of your jewelry collection.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
            <h2 className="heading-lg">Benefits of Professional Jewelry Displays</h2>
            <p className="text-gray-600 mt-4">
              Transform your jewelry store with displays designed for luxury retail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Maximize diamond brilliance with adjustable cool-white LED lighting',
              'Enhance gold and rose gold with warm-tone lighting options',
              'Secure high-value inventory with commercial-grade locking systems',
              'Create a luxury shopping experience that justifies premium pricing',
              'Crystal-clear glass provides unobstructed views of every piece',
              'Customizable shelving for rings, necklaces, bracelets, and watches',
              'Professional presentation builds trust and credibility',
              'Increase average transaction value through better product presentation',
              'Protect delicate pieces from damage and tarnishing',
              'Create Instagram-worthy displays that attract social media attention',
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
            <h2 className="heading-lg">Transform Your Jewelry Display</h2>
            <p className="text-gray-600 mt-3">
              Professional display cases that enhance brilliance and increase perceived value.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Perfect For All Jewelry Types</h2>
            <p className="text-gray-600 mt-4">
              Our display cases are designed to showcase every type of fine jewelry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Engagement Rings', description: 'Focused lighting highlights diamond brilliance and setting details.' },
              { title: 'Necklaces & Pendants', description: 'Elegant draping options for chains and statement pieces.' },
              { title: 'Watches', description: 'Secure displays with cushioned inserts for luxury timepieces.' },
              { title: 'Earrings', description: 'Organized compartments for studs, hoops, and dangles.' },
              { title: 'Bracelets', description: 'Curved displays perfect for bangles and charm bracelets.' },
              { title: 'Fine Gemstones', description: 'Color-enhancing lighting for precious and semi-precious stones.' },
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
            <h2 className="heading-lg">Trusted by Jewelry Retailers</h2>
            <p className="text-gray-400 mt-4">
              Join prestigious jewelry stores that have elevated their display game.
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
            <h2 className="heading-lg">Recommended Display Cases for Jewelry Stores</h2>
            <p className="text-gray-600 mt-4">
              Explore our collection of luxury display cases perfect for jewelry retailers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">48" Counter Display (RGB)</h3>
              <p className="text-gray-600 mb-6">
                Elegant counter-top display with adjustable LED lighting, perfect for 
                engagement rings, wedding bands, and high-end watches.
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
                Full-height luxury showcase with crystal-clear glass and premium lighting, 
                ideal for displaying complete jewelry collections.
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
            <h2 className="heading-lg">Ready to Elevate Your Jewelry Store?</h2>
            <p className="text-gray-600 mt-3 mb-8">
              Professional display cases that enhance beauty, increase perceived value, 
              and create a luxury shopping experience.
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
              Ready to Elevate Your Jewelry Store?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional display cases that enhance beauty, increase perceived value, 
              and create a luxury shopping experience your customers will remember.
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