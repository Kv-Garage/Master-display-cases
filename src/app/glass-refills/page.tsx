import Button from '@/components/ui/Button';
import Link from 'next/link';

// SEO Metadata
export const metadata = {
  title: 'Glass Refills & Replacement - Coming Soon | Master Display Cases',
  description: 'Replacement glass panels for all Master Display Cases products. Tempered glass, laminated glass, and UV-protective options. Sign up for notifications when available.',
  keywords: 'display case glass replacement, tempered glass panels, showcase glass refills, display case repair parts, laminated glass displays',
  openGraph: {
    title: 'Glass Refills & Replacement - Coming Soon | Master Display Cases',
    description: 'High-quality replacement glass for your display cases. Sign up to be notified when available.',
    type: 'website',
  },
};

const glassOptions = [
  {
    name: 'Tempered Glass Panel',
    description: 'Standard replacement glass for all display cases',
    thickness: '1/4" (6mm)',
    features: [
      '5x stronger than regular glass',
      'Safety tempered - shatters safely',
      'Crystal clear visibility',
      'Scratch-resistant coating',
    ],
    price: 'From $149',
  },
  {
    name: 'Laminated Glass Panel',
    description: 'Enhanced security with UV protection',
    thickness: '1/4" (6mm) laminated',
    features: [
      'Holds together when broken',
      '99% UV protection',
      'Sound dampening',
      'Anti-theft properties',
    ],
    price: 'From $249',
  },
  {
    name: 'Low-Iron Ultra Clear Glass',
    description: 'Maximum clarity for premium displays',
    thickness: '1/4" (6mm) low-iron',
    features: [
      '91% light transmittance',
      'No green tint',
      'Perfect for jewelry displays',
      'Museum-quality clarity',
    ],
    price: 'From $299',
  },
];

const compatibleModels = [
  '48" LED Counter Display',
  '70" Floor Standing Showcase',
  'RGB Wall Display System',
  'Countertop Jewelry Display',
  'Floor Standing Retail Case',
  'Custom Display Units',
];

export default function GlassRefillsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Coming Soon */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-sm font-semibold uppercase tracking-wider mb-6 text-green-400">
              Coming Soon
            </span>
            <h1 className="heading-xl mb-6">
              Glass Refills & Replacement Panels
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              High-quality replacement glass for all Master Display Cases products. 
              Tempered, laminated, and UV-protective options coming soon.
            </p>
            
            {/* Notify Form */}
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-none text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
                />
                <Button type="submit" variant="primary" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Notify Me
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                Be the first to know when glass refills become available. Expected Q2 2024.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Glass Refills Matter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Protection & Maintenance
            </span>
            <h2 className="heading-lg mt-2">Why Have Replacement Glass?</h2>
            <p className="text-gray-600 mt-4">
              Accidents happen. Having access to replacement glass ensures your display stays operational 
              and your merchandise remains protected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Quick Replacement',
                description: 'Get replacement glass shipped fast so your display is back in service within days, not weeks.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.545-2.727a9 9 0 00-1.145-4.865l-.175-.35a2.225 2.225 0 00-1.984-1.208h-.927a2.225 2.225 0 00-1.984 1.208l-.175.35a9 9 0 00-1.145 4.865m10.09-4.146c.402.204.773.462 1.108.764.42.379.787.81 1.09 1.282.303.472.54.984.703 1.522.164.538.25 1.1.25 1.674 0 .574-.086 1.136-.25 1.674a6.96 6.96 0 01-.703 1.522 6.693 6.693 0 01-1.09 1.282 6.643 6.643 0 01-1.108.764" />
                  </svg>
                ),
                title: 'Perfect Fit Guaranteed',
                description: 'Every glass panel is precision-cut to match your specific display case model.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Cost-Effective',
                description: 'Replace just the glass instead of the entire display case. Save hundreds on repairs.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glass Options Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Product Range
            </span>
            <h2 className="heading-lg mt-2">Glass Options Coming Soon</h2>
            <p className="text-gray-600 mt-4">
              Choose from multiple glass types to match your security and display needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {glassOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden opacity-75">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                  <p className="text-xs text-gray-400 mb-4">Thickness: {option.thickness}</p>
                  <ul className="space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">{option.price}</p>
                    <p className="text-xs text-gray-300 mt-1">Coming Soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Models */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Compatibility
            </span>
            <h2 className="heading-lg mt-2">Compatible Display Models</h2>
            <p className="text-gray-600 mt-4">
              Glass refills will be available for all current and legacy Master Display Cases products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {compatibleModels.map((model, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{model}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Service */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Professional Service
                  </span>
                  <h2 className="heading-md mt-2 mb-4">Optional Installation Service</h2>
                  <p className="text-gray-600 mb-6">
                    Don't want to install the glass yourself? Our certified technicians can replace your 
                    display case glass quickly and safely.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Available in all 50 states
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Same-day service available
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Old glass disposal included
                    </li>
                  </ul>
                  <Button href="/contact" variant="outline">
                    Learn More
                  </Button>
                </div>
                <div className="bg-gray-200 min-h-[300px] flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Need Glass Replacement Now?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              While our glass refill program launches, contact us for assistance with your 
              display case glass needs. We may be able to help with custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg">
                Contact Us for Help
              </Button>
              <Link href="/" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors rounded-none">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}