import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Boutiques | Stylish Retail Display Solutions | Master Display Cases',
  description: 'Stylish display cases for boutiques that create an elevated shopping experience. Customizable RGB lighting, premium materials, and flexible configurations to match your brand aesthetic.',
  keywords: 'display cases for boutiques, boutique display cases, retail display cases, clothing display cases, accessory display cases, LED display cases for retail, boutique showcase',
  openGraph: {
    title: 'Display Cases for Boutiques | Master Display Cases',
    description: 'Stylish display cases for boutiques. Create an elevated shopping experience that reflects your brand aesthetic.',
    type: 'website',
  },
};

export default function DisplayCasesForBoutiques() {
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
              <span>Boutiques</span>
            </nav>
            <h1 className="heading-xl mb-6">
              Display Cases for Boutiques That Reflect Your Brand & Boost Sales
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Stylish glass display cases with customizable RGB lighting designed to 
              create an elevated shopping experience. Showcase your curated collection 
              in a way that perfectly matches your boutique's unique aesthetic.
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
              Stylish Boutique Display
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              Customizable RGB lighting to match your brand aesthetic, perfect for showcasing accessories and boutique items.
            </p>
          </div>
          <FeaturedProductAd variant="large" />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-lg mb-6">Why Display Matters in Boutiques</h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-6">
                Boutiques are more than just stores — they're curated experiences that reflect a 
                specific aesthetic and brand identity. Every element of your store, from the lighting 
                to the fixtures, contributes to the story you're telling.
              </p>
              <p className="mb-6">
                Your display cases play a crucial role in this narrative. They're not just functional 
                pieces; they're design elements that should complement your brand while showcasing 
                your merchandise in the best possible light.
              </p>
              <p>
                Professional display cases do more than hold products — they create an immersive 
                environment that makes customers feel connected to your brand and eager to explore 
                your collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Challenges in Boutique Retail Display</h2>
            <p className="text-gray-600 mt-4">
              Boutique owners need displays that enhance their brand while showcasing unique merchandise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Generic Displays',
                description: "Off-the-shelf display cases don't reflect your boutique's unique brand identity and aesthetic, creating a disconnect with customers.",
              },
              {
                title: 'Poor Product Highlighting',
                description: "Inadequate lighting fails to showcase the quality and details of your curated merchandise, making even beautiful pieces look ordinary.",
              },
              {
                title: 'Inflexible Layouts',
                description: "Fixed shelving can't accommodate diverse product types from handbags to accessories, limiting your ability to create dynamic displays.",
              },
              {
                title: 'Missed Branding',
                description: "Display cases that don't align with your brand miss opportunities to create memorable experiences that build customer loyalty.",
              },
              {
                title: 'Seasonal Challenges',
                description: "Static displays can't adapt to seasonal collections, requiring frequent and costly redesigns to stay current.",
              },
              {
                title: 'Space Inefficiency',
                description: "Poorly designed displays waste valuable retail space, reducing the amount of merchandise you can showcase effectively.",
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
            <h2 className="heading-lg">How Our Display Cases Elevate Boutiques</h2>
            <p className="text-gray-600 mt-4">
              Our customizable display cases are designed to complement your boutique's unique style.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Brand Alignment',
                description: "Customizable RGB lighting lets you match your brand colors and create the perfect ambiance. From warm, inviting tones to bold, energetic hues.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
              },
              {
                title: 'Elevated Presentation',
                description: "Premium materials and clean, modern design complement your curated merchandise and create a cohesive shopping environment.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
              },
              {
                title: 'Flexible Display',
                description: "Adjustable shelving accommodates everything from handbags and shoes to jewelry and accessories. Reconfigure as your collection evolves.",
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
            <h2 className="heading-lg">Benefits of Professional Boutique Displays</h2>
            <p className="text-gray-600 mt-4">
              Transform your boutique with displays that enhance your brand and merchandise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              'Match your brand colors with customizable RGB lighting systems',
              'Create Instagram-worthy displays that encourage social sharing',
              'Showcase accessories, handbags, and featured items beautifully',
              'Flexible shelving adapts to seasonal collections and trends',
              'Premium materials elevate the perceived value of your merchandise',
              'Clean, modern design complements any boutique aesthetic',
              'Increase dwell time with engaging, well-lit product displays',
              'Build a cohesive brand experience from entrance to checkout',
              'Easy reconfiguration for new arrivals and seasonal changes',
              'Professional presentation justifies premium pricing',
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
            <h2 className="heading-lg">Create Instagram-Worthy Displays</h2>
            <p className="text-gray-600 mt-3">
              Customizable lighting and premium materials that encourage social sharing.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg">Perfect For All Boutique Products</h2>
            <p className="text-gray-600 mt-4">
              Our display cases are designed to showcase every type of boutique merchandise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Handbags & Purses', description: 'Spacious displays with adjustable shelving for bags of all sizes.' },
              { title: 'Jewelry & Accessories', description: 'Organized compartments for necklaces, earrings, and bracelets.' },
              { title: 'Shoes', description: 'Tiered displays perfect for showcasing footwear collections.' },
              { title: 'Clothing', description: 'Elegant displays for featured pieces and seasonal items.' },
              { title: 'Scarves & Wraps', description: 'Draping options that showcase texture and pattern beautifully.' },
              { title: 'Seasonal Items', description: 'Flexible layouts that adapt to holiday and seasonal collections.' },
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
            <h2 className="heading-lg">Trusted by Boutique Owners</h2>
            <p className="text-gray-400 mt-4">
              Join stylish boutiques that have transformed their retail space.
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
            <h2 className="heading-lg">Recommended Display Cases for Boutiques</h2>
            <p className="text-gray-600 mt-4">
              Explore our collection of display cases perfect for fashion and accessory boutiques.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-4">48" Counter Display (RGB)</h3>
              <p className="text-gray-600 mb-6">
                Elegant counter-top display with customizable RGB lighting, perfect for 
                showcasing jewelry, accessories, and small boutique items.
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
                Tall, elegant floor display ideal for showcasing handbags, shoes, 
                and larger accessories. Make a statement in your boutique.
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
            <h2 className="heading-lg">Ready to Elevate Your Boutique?</h2>
            <p className="text-gray-600 mt-3 mb-8">
              Professional display cases that reflect your brand, showcase your 
              merchandise beautifully, and create memorable shopping experiences.
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
              Ready to Elevate Your Boutique?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Professional display cases that reflect your brand, showcase your 
              merchandise beautifully, and create memorable shopping experiences.
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