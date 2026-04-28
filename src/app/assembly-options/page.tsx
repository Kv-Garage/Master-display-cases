import Link from 'next/link';
import Button from '@/components/ui/Button';

// SEO Metadata
export const metadata = {
  title: 'Assembly Options - Save Time or Save Money | Master Display Cases',
  description: 'Choose between Tier 1 (self assembly with included kit) and Tier 2 (pre-assembled and delivered ready to use). Learn which option is right for your store.',
  keywords: 'display case assembly, pre-assembled display case, self assembly display, retail display setup',
  openGraph: {
    title: 'Assembly Options - Save Time or Save Money | Master Display Cases',
    description: 'Choose between self assembly or pre-assembled delivery for your display cases.',
    type: 'website',
  },
};

export default function AssemblyOptionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Assembly Options
            </span>
            <h1 className="heading-xl mb-6">
              Save Time or Save Money — Your Choice
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Every display case ships with assembly options. Choose Tier 1 to save on cost, or Tier 2 to save on time and labor.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Two Tiers, One Goal: Get You Selling Faster</h2>
            <p className="text-gray-600 mt-4">
              Both options include the same premium display case. The difference is in how it arrives at your store.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 bg-black text-white text-sm font-semibold uppercase tracking-wider rounded-full mb-3">
                  Tier 1 — Self Assembly
                </span>
                <h3 className="heading-md">Save Money</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Display case ships 90% pre-assembled</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Final assembly takes 15-30 minutes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">All tools and hardware included</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Step-by-step video instructions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Lowest total cost</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Best for:</p>
                <p className="text-sm text-gray-600">Store owners who have basic tools and want to save on upfront cost.</p>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-white rounded-lg p-8 border-2 border-black shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
              <div className="text-center mb-6">
                <span className="inline-block px-4 py-1 bg-black text-white text-sm font-semibold uppercase tracking-wider rounded-full mb-3">
                  Tier 2 — Pre-Assembled
                </span>
                <h3 className="heading-md">Save Time</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Arrives 100% fully assembled</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Zero assembly required</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Factory quality control inspection</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Unbox and start selling immediately</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Worth it if your time is valuable</span>
                </li>
              </ul>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Best for:</p>
                <p className="text-sm text-gray-600">Multi-location owners, busy store openings, or anyone who values their time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time vs Cost Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Time Savings vs Cost Savings</h2>
            <p className="text-gray-600 mt-4">
              Here's the real breakdown to help you decide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black mb-2">15-30 min</div>
                <p className="text-gray-500">Assembly time with Tier 1</p>
              </div>
              <p className="text-gray-600 text-center">
                Most store owners complete final assembly in under 30 minutes with our included tools and video guide. If you can use a screwdriver, you can do this.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black mb-2">0 min</div>
                <p className="text-gray-500">Assembly time with Tier 2</p>
              </div>
              <p className="text-gray-600 text-center">
                Your display arrives ready to plug in and fill with products. For store openings or multi-unit orders, this can save hours of labor across your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg">Which Should You Choose?</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8 mb-6">
              <h3 className="heading-sm mb-4">Choose Tier 1 (Self Assembly) if:</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">You're ordering a single display case</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">You have basic tools and DIY confidence</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">You want the lowest upfront cost</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">You're not in a rush to set up</span>
                </li>
              </ul>
            </div>

            <div className="bg-black text-white rounded-lg p-8">
              <h3 className="heading-sm mb-4">Choose Tier 2 (Pre-Assembled) if:</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">You're ordering multiple display cases</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">You have a store opening deadline</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">You don't have tools or assembly help</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Your time is worth more than the upgrade cost</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Choose Your Display?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Both tiers include the same premium display case with the same warranty. The only difference is how it arrives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/products/48-led-counter-display" variant="primary" size="lg">
                Shop 48" Counter Display
              </Button>
              <Button href="/products/70-led-retail-display-showcase" variant="secondary" size="lg">
                Shop 70" Full Showcase
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              Questions? <Link href="/contact" className="text-black font-semibold underline">Contact our team</Link> for help choosing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}