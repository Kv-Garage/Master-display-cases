'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';
import { useState, useCallback } from 'react';

interface BundleItem {
  item: string;
  description: string;
}

interface BundleSpecs {
  dimensions: string;
  lighting: string;
  glass: string;
  lock: string;
}

interface Bundle {
  id: string;
  name: string;
  tagline: string;
  price: string;
  originalPrice: string | null;
  savings: string;
  popular: boolean;
  productId: string | null;
  variantId: string | null;
  bundlePrice: number | null;
  includes: BundleItem[];
  specs: BundleSpecs;
}

interface AddOn {
  id: string;
  variantId: string | null;
  name: string;
  description: string;
  price: string;
  numericPrice: number | null;
  originalPrice: string | null;
  features: string[];
  link: string;
  disabled?: boolean;
}

interface BundleSectionProps {
  bundles: Bundle[];
  addOns: AddOn[];
  featuredProducts: any[];
}

export default function BundleSection({ bundles, addOns, featuredProducts }: BundleSectionProps) {
  const { addItem, goToCheckout } = useCart();
  const [addingBundle, setAddingBundle] = useState<string | null>(null);
  const [addingAddon, setAddingAddon] = useState<string | null>(null);

  // Handle adding a bundle to cart
  const handleAddBundle = useCallback((bundle: Bundle) => {
    if (!bundle.productId || !bundle.variantId) return;
    
    setAddingBundle(bundle.id);
    addItem({
      variantId: bundle.variantId, // Use full GID format directly
      productId: bundle.productId,
      title: bundle.name,
      productHandle: 'bundles',
      variantTitle: bundle.name,
      price: bundle.bundlePrice || 0,
      image: { url: '/placeholder.jpg' },
    });
    setTimeout(() => setAddingBundle(null), 500);
  }, [addItem]);

  // Handle adding an addon to cart
  const handleAddAddon = useCallback((addon: AddOn) => {
    if (!addon.variantId || !addon.numericPrice) return;
    
    setAddingAddon(addon.id);
    addItem({
      variantId: addon.variantId, // Use full GID format directly
      productId: addon.id,
      title: addon.name,
      productHandle: 'addons',
      variantTitle: addon.name,
      price: addon.numericPrice,
      image: { url: '/placeholder.jpg' },
    });
    setTimeout(() => setAddingAddon(null), 500);
  }, [addItem]);

  // Handle checkout redirect - use the goToCheckout function from cart context
  const handleCheckout = useCallback(async () => {
    await goToCheckout();
  }, [goToCheckout]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 lg:py-32 overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Bundle & Save
            </span>
            <h1 className="heading-xl mb-6">
              Pre-Configured Display Bundles
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get everything you need in one package. Our bundles combine displays, assembly, and warranties 
              at prices you can't get buying individually. Shipping calculated at checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#bundles" variant="primary" size="lg">
                View All Bundles
              </Button>
              <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                Custom Bundle Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bundles Section */}
      <section className="bg-gray-50 py-12 border-b">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-md">Why Buy a Bundle?</h2>
            <p className="text-gray-600 mt-4">
              Bundles are designed to give you the best value while ensuring you have everything needed for a successful setup.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Save Money',
                description: 'Bundles save you 10-30% compared to buying items individually.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Save Time',
                description: 'No need to research and select each component separately.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Everything Included',
                description: 'All necessary components, assembly, and support in one order.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Options */}
      <section id="bundles" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Choose Your Package
            </span>
            <h2 className="heading-lg mt-2">Bundle Options</h2>
            <p className="text-gray-600 mt-4">
              Select the bundle that best fits your store size and growth stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className={`relative rounded-lg overflow-hidden ${
                  bundle.popular
                    ? 'border-2 border-black shadow-xl'
                    : 'border border-gray-200 shadow-sm'
                }`}
              >
                {bundle.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-black text-white text-xs font-bold px-4 py-2 rounded-bl-lg uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                  <p className="text-gray-600 mb-6">{bundle.tagline}</p>
                  
                  <div className="mb-8">
                    {bundle.originalPrice && (
                      <p className="text-gray-400 line-through text-lg">${bundle.originalPrice}</p>
                    )}
                    <p className="text-4xl font-bold text-black">
                      {bundle.price}
                    </p>
                    <p className="text-green-600 font-medium mt-2">
                      Save {bundle.savings}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {bundle.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">{item.item}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Specifications</p>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Dimensions</dt>
                        <dd className="font-medium">{bundle.specs.dimensions}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Lighting</dt>
                        <dd className="font-medium">{bundle.specs.lighting}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Glass</dt>
                        <dd className="font-medium">{bundle.specs.glass}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Lock</dt>
                        <dd className="font-medium">{bundle.specs.lock}</dd>
                      </div>
                    </dl>
                  </div>

                  {bundle.productId ? (
                    <button
                      onClick={() => handleAddBundle(bundle)}
                      disabled={addingBundle === bundle.id}
                      className={`w-full py-3 px-6 font-semibold uppercase tracking-wide transition-colors rounded-none text-sm ${
                        bundle.popular
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'border-2 border-black text-black hover:bg-black hover:text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {addingBundle === bundle.id ? '✓ Added!' : bundle.name === 'Enterprise Bundle' ? 'Request Quote' : 'Add to Cart'}
                    </button>
                  ) : (
                    <Link
                      href="/contact"
                      className="block w-full border-2 border-black text-black text-center px-6 py-3 font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-colors rounded-none text-sm"
                    >
                      Request Quote
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Enhance Your Bundle
            </span>
            <h2 className="heading-lg mt-2">Premium Add-Ons</h2>
            <p className="text-gray-600 mt-4">
              Customize your bundle with these popular upgrades and services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={addon.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{addon.name}</h3>
                    {addon.disabled && (
                      <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{addon.description}</p>
                  <div className="mb-6">
                    <p className="text-2xl font-bold">{addon.price}</p>
                    {addon.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">${addon.originalPrice}</p>
                    )}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {addon.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {addon.variantId ? (
                    <button
                      onClick={() => handleAddAddon(addon)}
                      disabled={addingAddon === addon.id || addon.disabled}
                      className="w-full border-2 border-black text-black py-3 rounded-none font-semibold hover:bg-black hover:text-white transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingAddon === addon.id ? '✓ Added!' : addon.disabled ? 'Notify When Available' : 'Add to Bundle'}
                    </button>
                  ) : (
                    <Link
                      href={addon.link}
                      className="block w-full border-2 border-black text-black text-center px-6 py-3 font-semibold hover:bg-black hover:text-white transition-colors rounded-none text-sm"
                    >
                      {addon.disabled ? 'Notify When Available' : 'Learn More'}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Side by Side
            </span>
            <h2 className="heading-lg mt-2">Bundle Comparison</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 border-b border-r font-semibold">Feature</th>
                  <th className="text-center p-4 border-b border-r font-semibold">Starter</th>
                  <th className="text-center p-4 border-b border-r font-semibold bg-gray-100">Growth</th>
                  <th className="text-center p-4 border-b font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-r">Display Units</td>
                  <td className="p-4 border-b border-r text-center">2</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">3</td>
                  <td className="p-4 border-b text-center">5+</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-r">Assembly Service</td>
                  <td className="p-4 border-b border-r text-center">Standard</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">Priority</td>
                  <td className="p-4 border-b text-center">White-Glove</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-r">Warranty</td>
                  <td className="p-4 border-b border-r text-center">2 Years</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">3 Years</td>
                  <td className="p-4 border-b text-center">Custom</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-r">Shipping</td>
                  <td className="p-4 border-b border-r text-center">Standard</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">Expedited</td>
                  <td className="p-4 border-b text-center">White-Glove</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-r">Account Manager</td>
                  <td className="p-4 border-b border-r text-center">—</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">✓</td>
                  <td className="p-4 border-b text-center">✓ Dedicated</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-r">Customization</td>
                  <td className="p-4 border-b border-r text-center">Limited</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">Some</td>
                  <td className="p-4 border-b text-center">Full</td>
                </tr>
                <tr>
                  <td className="p-4 border-r">Payment Terms</td>
                  <td className="p-4 border-b border-r text-center">Prepaid</td>
                  <td className="p-4 border-b border-r text-center bg-gray-50">Prepaid</td>
                  <td className="p-4 border-b text-center">Net 30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Customer Stories
            </span>
            <h2 className="heading-lg mt-2">What Bundle Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "The Growth Bundle was exactly what we needed for our three new locations. Everything arrived on time and the installation team was professional.",
                author: "Sarah M.",
                title: "Owner, Vapor Palace",
                rating: 5,
              },
              {
                quote: "We saved over $500 with the Starter Bundle compared to buying everything separately. The assembly service was worth every penny.",
                author: "Mike T.",
                title: "Manager, Downtown Smoke Shop",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Outfit Your Store?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Choose a bundle and get everything you need in one order. 
              Shipping calculated at checkout. 30-day satisfaction guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCheckout}
                className="bg-white text-black px-8 py-4 font-semibold uppercase tracking-wide hover:bg-gray-200 transition-colors rounded-none"
              >
                Shop All Bundles
              </button>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-colors rounded-none text-center"
              >
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}