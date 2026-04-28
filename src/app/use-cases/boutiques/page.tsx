import Button from '@/components/ui/Button';
import Link from 'next/link';

export const metadata = {
  title: 'Display Cases for Boutiques | Master Display Cases',
  description: 'Stylish display cases for boutiques. Create an elevated shopping experience that reflects your brand aesthetic.',
};

export default function BoutiquesUseCase() {
  return (
    <main className="min-h-screen">
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products/led-retail-display-showcase" className="hover:text-white">Use Cases</Link>
              <span className="mx-2">/</span>
              <span>Boutiques</span>
            </nav>
            <h1 className="heading-xl mb-6">Display Solutions for Boutiques</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Create an elevated shopping experience that reflects your brand aesthetic. 
              Our displays combine style with functionality.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Why This Display Works for Boutiques</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { title: 'Brand Alignment', description: 'Customizable RGB lighting to match your brand colors and create the perfect ambiance.' },
              { title: 'Elevated Presentation', description: 'Premium materials and clean design that complements your curated merchandise.' },
              { title: 'Flexible Display', description: 'Adjustable shelving to showcase accessories, handbags, or featured items beautifully.' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8">
                <h3 className="heading-sm mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Elevate Your Boutique?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/products/led-retail-display-showcase" variant="primary" size="lg">View RGB Display Case</Button>
              <Button href="/contact" variant="secondary" size="lg">Get a Quote</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}