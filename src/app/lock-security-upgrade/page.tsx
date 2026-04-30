import Link from 'next/link';
import Button from '@/components/ui/Button';

// SEO Metadata
export const metadata = {
  title: 'Lock & Security Upgrade - Prevent Theft | Master Display Cases',
  description: 'Upgrade to commercial-grade locking systems. Choose from keyed locks, combination locks, or electronic locks to protect your high-value inventory.',
  keywords: 'display case lock, security upgrade, retail security, keyed lock, combination lock, electronic lock, inventory protection',
  openGraph: {
    title: 'Lock & Security Upgrade - Prevent Theft | Master Display Cases',
    description: 'Commercial-grade locking systems to protect your high-value inventory.',
    type: 'website',
  },
};

export default function LockSecurityUpgradePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Security Upgrade
            </span>
            <h1 className="heading-xl mb-6">
              Lock Your Inventory. Prevent Theft. Sleep Better.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Every display case includes a standard lock. Upgrade to commercial-grade security systems designed for high-traffic retail environments.
            </p>
          </div>
        </div>
      </section>

      {/* Why Locks Matter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Why Locks Matter</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Retail theft costs businesses billions annually. A quality lock isn't just about security — it's about peace of mind and protecting your livelihood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Deterrence</h3>
              <p className="text-gray-600">
                Visible, quality locks discourage opportunistic theft. Most retail theft is crimes of opportunity — don't give them the chance.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Protection</h3>
              <p className="text-gray-600">
                Commercial-grade locks resist tampering, prying, and forced entry. Your inventory stays secure even during unattended hours.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black text-white flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Control</h3>
              <p className="text-gray-600">
                Manage who has access to your products. Electronic locks let you track access and change codes without re-keying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">What the Upgrade Includes</h2>
            <p className="text-gray-600 mt-4">
              Replace standard locks with commercial-grade hardware designed for demanding retail environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-6">Standard Lock (Included)</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Basic keyed lock</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Single key provided</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600">Standard duty cycle</span>
                </li>
              </ul>
            </div>

            <div className="bg-black text-white rounded-lg p-8 shadow-lg">
              <h3 className="heading-sm mb-6">Upgrade (Commercial Grade)</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Heavy-duty keyed, combination, or electronic lock</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Reinforced mounting hardware</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Tamper-resistant design</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Multiple keys or backup access methods</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Extended warranty on lock mechanism</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lock Options */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Choose Your Lock Type</h2>
            <p className="text-gray-600 mt-4">
              Three commercial-grade options to match your security needs and workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plunger Lock - The Only Upgrade Option */}
            <div className="bg-white rounded-lg overflow-hidden border-2 border-black shadow-lg md:col-span-3 md:max-w-2xl md:mx-auto">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 text-xs font-semibold uppercase tracking-wider z-10">
                Only Lock Upgrade Available
              </div>
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src="/SEO 3.jpeg"
                  alt="Plunger Lock with 2 Keys"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-3">Plunger Lock with 2 Keys</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Commercial-grade plunger lock with reinforced housing. This is our only lock upgrade option — a heavy-duty keyed lock designed for high-traffic retail environments.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>2 keys included</strong> — one for daily use, one as backup</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>High-security plunger mechanism</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Drill-resistant and tamper-proof</span>
                  </li>
                  <li className="flex items-start space-x-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Reinforced mounting hardware included</span>
                  </li>
                </ul>
                <Link href="/products/products-48-led-retail-display-showcase-rgb" className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:underline">
                  Add to Order →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Who Needs a Security Upgrade?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-6 flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Upgrade Recommended For:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    <strong>Smoke Shops & Vape Stores</strong> — High-value, small items that are easy to pocket
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    <strong>Jewelry Stores</strong> — Premium inventory requiring maximum security
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    <strong>Electronics Retailers</strong> — Expensive, easily resold merchandise
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    <strong>High-Traffic Locations</strong> — Malls, airports, tourist areas with heavy foot traffic
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-700">
                    <strong>Unattended Hours</strong> — Stores in 24-hour buildings or with overnight access
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="heading-sm mb-6 flex items-center">
                <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Standard Lock May Be Sufficient For:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-gray-600">
                    <strong>Boutiques</strong> — Clothing and accessories with lower theft risk
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-600">
                    <strong>Low-Traffic Stores</strong> — Locations with consistent staff presence
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-600">
                    <strong>Small Town Shops</strong> — Close-knit communities with lower crime rates
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-600">
                    <strong>Supervised Displays</strong> — Cases always within staff line of sight
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-gray-600">
                    <strong>Budget-Conscious Starters</strong> — New stores testing the market
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Real-World Use Cases</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Smoke Shop</h3>
              <p className="text-gray-600 text-sm">
                "We upgraded all 6 displays with electronic locks. Being able to track who accessed what and when has been invaluable for inventory control."
              </p>
              <p className="text-xs text-gray-500 mt-4">— Marcus T., Detroit, MI</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Jewelry Store</h3>
              <p className="text-gray-600 text-sm">
                "Combination locks were perfect. No keys for employees to lose or copy, and we can change the code anytime without calling a locksmith."
              </p>
              <p className="text-xs text-gray-500 mt-4">— Sarah L., Chicago, IL</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="heading-sm mb-3">Electronics Store</h3>
              <p className="text-gray-600 text-sm">
                "High-security keyed locks for our premium earbuds and accessories. The drill-resistant cylinder gives us confidence during overnight hours."
              </p>
              <p className="text-xs text-gray-500 mt-4">— David K., Atlanta, GA</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Secure Your Inventory Today</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Don't wait until after an incident. Upgrade your security now and protect what matters most to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/products/products-48-led-retail-display-showcase-rgb" variant="primary" size="lg">
                Shop Display Cases
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              Not sure which lock type is right for you? <Link href="/contact" className="text-black font-semibold underline">Contact our security team</Link> for a personalized recommendation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}