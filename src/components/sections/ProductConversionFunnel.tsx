import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import Link from 'next/link';

interface ProductConversionFunnelProps {
  product: {
    title: string;
    handle: string;
    price: number;
    description: string;
    image: string;
    images: Array<{ url: string; altText?: string }>;
  };
}

export default function ProductConversionFunnel({ product }: ProductConversionFunnelProps) {
  const bundles = [
    {
      name: 'Starter Setup',
      units: 1,
      discount: 0,
      price: product.price,
      description: 'Perfect for small stores getting started',
      popular: false,
    },
    {
      name: 'Growth Setup',
      units: 3,
      discount: 10,
      price: product.price * 3 * 0.9,
      description: 'Most popular - Save 10%',
      popular: true,
    },
    {
      name: 'Full Store Setup',
      units: 5,
      discount: 15,
      price: product.price * 5 * 0.85,
      description: 'Maximize revenue - Save 15%',
      popular: false,
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. ABOVE THE FOLD - Critical First Impression */}
      <section className="container-custom py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Limited Stock
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
              Turn Your Display Into a <span className="text-green-600">Revenue Driver</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Designed to increase perceived value, boost impulse purchases, and grow store revenue.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">+30%</div>
                <div className="text-xs text-gray-600">Avg Order Value</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl font-bold text-black">Grade A</div>
                <div className="text-xs text-gray-600">Commercial Build</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl font-bold text-black">USA</div>
                <div className="text-xs text-gray-600">Nationwide Freight</div>
              </div>
            </div>
            <div className="mb-6">
              <div className="text-4xl font-bold text-black">${product.price.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">+ Freight shipping calculated at checkout</div>
            </div>
            <div className="space-y-3 mb-6">
              <Link href={`/contact?product=${product.handle}&action=quote`} className="block w-full bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Add to Quote / Get Pricing
              </Link>
              <Link href={`/contact?product=${product.handle}&bulk=true`} className="block w-full border-2 border-black text-black text-center py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
                View Bulk Discounts
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-orange-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Limited stock available for this model</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ROI / VALUE BLOCK */}
      <section className="bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">This Isnt Furniture. Its a Sales Tool.</h2>
              <p className="text-gray-400">Customers spend more when products look premium. This display pays for itself through increased sales.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-green-400 mb-2">25-40%</div>
                <div className="text-white font-medium mb-1">Higher Perceived Value</div>
                <div className="text-sm text-gray-400">Products look more premium</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-green-400 mb-2">+30%</div>
                <div className="text-white font-medium mb-1">Average Order Increase</div>
                <div className="text-sm text-gray-400">Customers buy more</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                <div className="text-4xl font-bold text-green-400 mb-2">3x</div>
                <div className="text-white font-medium mb-1">More Product Visibility</div>
                <div className="text-sm text-gray-400">Eye-level = Buy-level</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEFORE vs AFTER */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-black mb-3">Same Products. Higher Perceived Value. More Revenue.</h2>
            <p className="text-gray-600">See the transformation thats changing retail stores nationwide.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="/Before and after of 48%22.png"
              afterImage="/Before and after of 72%22.png"
              beforeLabel="Standard Setup"
              afterLabel="Master Display System"
              calloutText="Same products. Higher perceived value."
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURE STACK */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-12">Built to Sell More, Not Just Hold Products</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">Commercial Tempered Glass</h3>
                <p className="text-gray-600 text-sm mt-1">Showcase products like luxury items - customers instantly perceive higher value.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">RGB Lighting System</h3>
                <p className="text-gray-600 text-sm mt-1">Grab attention instantly - color psychology drives emotional purchases.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">Lockable Security Doors</h3>
                <p className="text-gray-600 text-sm mt-1">Protect high-value inventory while keeping products visible and desirable.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-black">Adjustable Glass Shelves</h3>
                <p className="text-gray-600 text-sm mt-1">Flexible merchandising - adapt your display for any product size or season.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUNDLE / AOV SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-4">Smart Retailers Buy in Bundles</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">Multi-unit setups increase store consistency and perceived professionalism - plus you save significantly.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bundles.map((bundle, index) => (
              <div key={index} className={`relative rounded-xl p-6 ${bundle.popular ? 'bg-black text-white ring-4 ring-green-500' : 'bg-white border border-gray-200'}`}>
                {bundle.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                )}
                <h3 className={`text-xl font-bold ${bundle.popular ? 'text-white' : 'text-black'}`}>{bundle.name}</h3>
                <div className="text-sm mt-1 mb-4 opacity-80">{bundle.units} Unit{bundle.units > 1 ? 's' : ''}</div>
                <div className="mb-4">
                  <div className="text-3xl font-bold">${bundle.price.toLocaleString()}</div>
                  {bundle.discount > 0 && <div className="text-sm opacity-80">Save {bundle.discount}% (${(product.price * bundle.units - bundle.price).toLocaleString()})</div>}
                </div>
                <p className={`text-sm mb-6 ${bundle.popular ? 'text-gray-300' : 'text-gray-600'}`}>{bundle.description}</p>
                <Link href={`/contact?product=${product.handle}&units=${bundle.units}`} className={`block w-full py-3 rounded-lg font-semibold text-center transition-colors ${bundle.popular ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Get This Bundle</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-12">Retailers Are Seeing Real Results</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "Within 30 days, we saw a noticeable increase in higher-ticket purchases. The RGB lighting is a game-changer.", author: "Marcus T.", store: "Cloud 9 Smoke Shop", location: "Detroit, MI" },
              { quote: "Customers constantly compliment the presentation. Our jewelry looks like it belongs in a high-end boutique now.", author: "Sarah L.", store: "Bella Boutique", location: "Chicago, IL" },
              { quote: "Best investment we made. These displays are sturdy, look professional, and freight shipping was smooth.", author: "David K.", store: "Tech Hub Electronics", location: "Atlanta, GA" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4"><svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg></div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="font-bold text-black">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.store}</div>
                  <div className="text-xs text-gray-400">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST + RISK REVERSAL */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: 'shield', label: '5-Year Warranty', desc: 'Structural coverage' },
              { icon: 'building', label: 'Commercial Grade', desc: 'High-traffic rated' },
              { icon: 'truck', label: 'Nationwide Freight', desc: 'Secure delivery' },
              { icon: 'tag', label: 'Bulk Discounts', desc: 'Up to 20% off' },
            ].map((item, index) => (
              <div key={index} className="text-center p-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon === 'shield' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                    {item.icon === 'building' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                    {item.icon === 'truck' && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1M5 17a2 2 0 104 0 2 2 0 00-4 0z" /></>}
                    {item.icon === 'tag' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />}
                  </svg>
                </div>
                <div className="font-bold text-black">{item.label}</div>
                <div className="text-sm text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8 font-medium">Built for high-traffic retail environments</p>
        </div>
      </section>

      {/* 8. SHIPPING TRANSPARENCY */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container-custom max-w-3xl">
          <h2 className="text-xl font-bold text-black mb-6 text-center">Shipping and Delivery</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <div>
                <span className="font-medium text-black">Freight Shipping Required</span>
                <p className="text-sm text-gray-600">Due to size and weight, these units ship via LTL freight for safe delivery.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <div>
                <span className="font-medium text-black">Typical Delivery: 7-14 Business Days</span>
                <p className="text-sm text-gray-600">From order confirmation to curbside delivery at your business address.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <div>
                <span className="font-medium text-black">White Glove and Inside Delivery Available</span>
                <p className="text-sm text-gray-600">Upgrade options available at checkout for an additional fee.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Why is shipping not free?', a: 'These are commercial-grade units weighing 150-300+ lbs. Freight shipping ensures safe delivery and is standard for retail fixtures of this size. We negotiate competitive rates and pass the savings to you.' },
              { q: 'How long does delivery take?', a: 'Typically 7-14 business days from order confirmation. You will receive tracking information and a delivery appointment window.' },
              { q: 'Does it come assembled?', a: 'Units ship knocked down (KD) for safe transport. Assembly takes 30-45 minutes with basic tools. Professional assembly is available for bulk orders.' },
              { q: 'Can I customize the lighting color?', a: 'Yes! Our RGB lighting systems include a remote with 16 colors and multiple modes (fade, flash, strobe). Set any static color to match your brand.' },
              { q: 'Do you offer bulk pricing?', a: 'Yes! Orders of 3+ units receive 10% off, 5+ units get 15% off. Contact us for custom quotes on larger orders.' },
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-lg border border-gray-200">
                <summary className="p-4 font-medium cursor-pointer hover:bg-gray-50 flex items-center justify-between">{faq.q}<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></summary>
                <div className="px-4 pb-4 text-gray-600 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Upgrade Your Store. Increase Your Revenue.</h2>
          <p className="text-gray-400 mb-8 text-lg">Serious retailers are upgrading their displays - do not get left behind.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/contact?product=${product.handle}&action=quote`} className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">Get Pricing</Link>
            <Link href={`/contact?product=${product.handle}&bulk=true`} className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">Request Bulk Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}