import Button from '@/components/ui/Button';
import BuyNowButton from '@/components/ui/BuyNowButton';
import Image from 'next/image';
import { ROUTES, getProductUrl } from '@/lib/routes';
import { getProducts } from '@/lib/shopify';
import { blogPosts } from '@/data/blog-posts';

// SEO Metadata
export const metadata = {
  title: 'Display Cases for Smoke Shops | LED Retail Cases | Master Display Cases',
  description:
    'Premium LED display cases designed specifically for smoke shops. Increase sales with better product visibility, reduce theft with secure locking, and create a premium shopping experience.',
  keywords:
    'display cases for smoke shops, vape shop displays, LED display cases, smoke shop display cases, retail display cases, secure display cases, glass display cases',
  openGraph: {
    title: 'Display Cases for Smoke Shops | Master Display Cases',
    description:
      'Premium LED display cases designed specifically for smoke shops. Increase sales, improve security, and create a premium shopping experience.',
    type: 'website',
  },
};

interface Product {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: number;
  variantId: string;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    available: boolean;
  }>;
  images: Array<{ url: string; altText?: string }>;
}

// Featured blog posts for the resources section
const FEATURED_BLOG_POSTS = blogPosts.slice(0, 4);

// ─────────────────────────────────────────────────────────────
//  Product card used in the featured products grid (Section 4)
// ─────────────────────────────────────────────────────────────
function FeaturedProductCard({
  product,
  badge,
}: {
  product: Product;
  badge?: string;
}) {
  const description =
    product.title.includes('48') || product.title.includes('Counter')
      ? 'Perfect for checkout counters. RGB lighting drives impulse buys. Ideal for vape products and accessories.'
      : product.title.includes('70') || product.title.includes('72')
      ? 'Full-height showcase that commands attention. Store your entire premium collection with maximum visibility.'
      : 'Professional LED display case with RGB lighting for maximum product visibility and security.';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative">
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="aspect-video relative bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span className="text-lg font-medium">Display Case</span>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
          <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{product.title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{description}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <BuyNowButton variantId={product.variantId} className="text-base py-4">
            Buy Now — Fast Checkout
          </BuyNowButton>
          <Button
            href={getProductUrl(product.handle)}
            variant="outline"
            size="md"
            fullWidth
            className="text-sm"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Compact product card used inside the hero panel
// ─────────────────────────────────────────────────────────────
function HeroProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-black rounded-xl p-4 flex gap-4 hover:bg-gray-800 transition-colors group">
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={96}
            height={96}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
            {product.title.includes('48')
              ? 'Best Seller'
              : product.title.includes('70') || product.title.includes('72')
              ? 'Most Popular'
              : 'Premium'}
          </span>
        </div>
        <h4 className="font-semibold text-white mb-1 truncate text-sm">
          {product.title.split('|')[0].trim()}
        </h4>
        <p className="text-sm text-gray-400 mb-2 line-clamp-1">
          {product.title.includes('48') || product.title.includes('Counter')
            ? 'Perfect for checkout counters'
            : product.title.includes('70') || product.title.includes('72')
            ? 'Full-height floor showcase'
            : 'Professional LED display'}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-white">${product.price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-2">
          <BuyNowButton variantId={product.variantId} className="text-xs px-3 py-1.5 flex-1">
            Buy Now
          </BuyNowButton>
          <Button
            href={getProductUrl(product.handle)}
            variant="outline"
            size="sm"
            className="text-xs px-3 py-1.5 flex-1 bg-transparent border-gray-600 text-white hover:border-white hover:bg-white hover:text-black"
          >
            View Display
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────
export default async function DisplayCasesForSmokeShops() {
  // Fetch products from Shopify server-side
  const allProducts = await getProducts();

  // Prioritize 48" and 70"/72" displays for smoke shops
  const prioritizedProducts = allProducts
    .filter(
      (p: Product) =>
        p.title.includes('48') || p.title.includes('70') || p.title.includes('72'),
    )
    .slice(0, 3);

  // Get remaining products
  const remainingProducts = allProducts.filter(
    (p: Product) =>
      !p.title.includes('48') && !p.title.includes('70') && !p.title.includes('72'),
  );

  // Combine: prioritized first, then remaining
  const displayProducts = [...prioritizedProducts, ...remainingProducts].slice(0, 4);

  // Hero showcase uses top 3 prioritized products
  const heroProducts = prioritizedProducts.slice(0, 3);

  // Best-seller product card (first prioritized product)
  const bestSellerProduct: Product | undefined = prioritizedProducts[0];

  return (
    <main className="min-h-screen">
      {/* ══════════════════════════════════════════════════════════
          SECTION 1: HERO — Above the Fold
          2-Column: Left = copy + CTAs, Right = featured product card
          ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-black text-white py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Headline / subheadline / bullets / CTAs ── */}
            <div>
              {/* H1 — primary SEO target */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Increase Store Sales by 30% With Premium LED Display Cases Built for Smoke
                Shops
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Secure high-value products, improve visibility, and create a premium in-store
                experience that drives more purchases.
              </p>

              {/* Benefit Bullets */}
              <ul className="mb-10 space-y-4 max-w-xl">
                {[
                  'Lockable, secure glass',
                  'Designed for high-ticket product display',
                  'Modern LED lighting increases perceived value',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>

              {/* Primary + Secondary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  href={ROUTES.COLLECTION}
                  variant="primary"
                  size="lg"
                  className="text-lg px-10 py-5 bg-white text-black hover:bg-gray-200 border-transparent"
                >
                  Shop Display Cases
                </Button>
                <Button
                  href="/wholesale"
                  variant="secondary"
                  size="lg"
                  className="text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-black"
                >
                  Get Wholesale Pricing
                </Button>
              </div>

              {/* Social proof micro-text */}
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Trusted by retail store owners across the U.S.
              </p>
            </div>

            {/* ── RIGHT: Featured product card ── */}
            <div>
              {bestSellerProduct ? (
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                  {/* Product image */}
                  <div className="relative aspect-video bg-gray-800">
                    {bestSellerProduct.image ? (
                      <Image
                        src={bestSellerProduct.image}
                        alt={bestSellerProduct.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-medium">
                        Display Case
                      </div>
                    )}
                    {/* Best Seller badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Best Seller
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {bestSellerProduct.title.split('|')[0].trim()}
                    </h3>

                    {/* Starting at price */}
                    <p className="text-3xl font-extrabold text-white mb-1">
                      Starting at ${bestSellerProduct.price.toLocaleString()}
                    </p>

                    {/* Social proof tag */}
                    <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Used by retail stores nationwide
                    </p>

                    <div className="flex flex-col gap-3">
                      <Button
                        href={getProductUrl(bestSellerProduct.handle)}
                        variant="primary"
                        size="lg"
                        fullWidth
                        className="bg-white text-black hover:bg-gray-200 border-transparent text-base py-4"
                      >
                        View Product
                      </Button>
                      <BuyNowButton
                        variantId={bestSellerProduct.variantId}
                        className="text-base py-4"
                      >
                        Buy Now — Fast Checkout
                      </BuyNowButton>
                    </div>
                  </div>
                </div>
              ) : (
                /* Fallback when products are loading */
                <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Featured Display Cases</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Top Picks
                    </span>
                  </div>
                  <div className="space-y-4">
                    {heroProducts.length > 0 ? (
                      heroProducts.map((product: Product) => (
                        <HeroProductCard key={product.id} product={product} />
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        Loading featured products...
                      </div>
                    )}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <p className="text-red-400 text-sm font-medium flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Limited inventory due to high demand
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 2: TRUST BAR — Horizontal credibility strip
          ══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 border-y border-gray-200 py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6 mx-auto mb-2 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                label: 'Commercial Grade',
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 mx-auto mb-2 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                    />
                  </svg>
                ),
                label: '5-Year Warranty',
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 mx-auto mb-2 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
                label: 'Nationwide Shipping',
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6 mx-auto mb-2 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                ),
                label: 'Built for Retail Stores',
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                {item.icon}
                <span className="text-sm font-semibold uppercase tracking-wider text-black">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 3: VISUAL COMPARISON — Before vs After
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="heading-lg mb-4">What's Your Store Saying Right Now?</h2>
            <p className="text-gray-600 text-lg">
              Customers judge product quality by how it's presented. Here's the difference
              a professional display setup makes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Setup — LEFT */}
            <div className="rounded-2xl overflow-hidden border-2 border-red-200 bg-red-50">
              <div className="bg-red-500 text-white text-center py-3">
                <span className="font-bold uppercase tracking-wider text-sm">
                  ✗ Standard Store Setup
                </span>
              </div>
              <div className="p-8 space-y-4">
                {[
                  { icon: '😟', text: 'Cluttered shelves hide products' },
                  { icon: '🔦', text: 'Low visibility, products look cheap' },
                  { icon: '💸', text: 'Weak presentation = lower perceived value' },
                  { icon: '🚪', text: 'Customers leave without buying' },
                  { icon: '📉', text: 'Missed impulse purchase opportunities' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Optimized Setup — RIGHT */}
            <div className="rounded-2xl overflow-hidden border-2 border-green-300 bg-green-50">
              <div className="bg-green-600 text-white text-center py-3">
                <span className="font-bold uppercase tracking-wider text-sm">
                  ✓ Optimized Display Setup
                </span>
              </div>
              <div className="p-8 space-y-4">
                {[
                  { icon: '💡', text: 'LED lighting makes every product pop' },
                  { icon: '🗂️', text: 'Organized products are easy to browse' },
                  { icon: '✨', text: 'Premium look justifies premium pricing' },
                  { icon: '🔒', text: 'Lockable glass secures high-value inventory' },
                  { icon: '📈', text: 'Higher conversions & impulse purchases' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              href={ROUTES.COLLECTION}
              variant="primary"
              size="lg"
              className="text-lg px-10 py-5"
            >
              Upgrade Your Setup →
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 4: FEATURED PRODUCTS — Grid with labels + CTAs
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Top Display Cases for Smoke Shops</h2>
            <p className="text-gray-600 text-lg">
              Professional-grade <strong>LED display cases</strong> and{' '}
              <strong>glass display cases</strong> with secure locking and commercial
              construction. Buy directly with fast checkout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {displayProducts.length > 0 ? (
              displayProducts.map((product: Product, index: number) => {
                const badge =
                  index === 0
                    ? 'Best Seller'
                    : index === 1
                    ? 'Most Popular for Smoke Shops'
                    : undefined;
                return (
                  <FeaturedProductCard key={product.id} product={product} badge={badge} />
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 mb-6">Loading products...</p>
                <Button href={ROUTES.COLLECTION} variant="primary" size="lg">
                  Browse All Display Cases
                </Button>
              </div>
            )}
          </div>

          {/* Not sure which? link to buyer guide */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Not sure which display fits your store?</p>
            <Button href={ROUTES.BUYING_GUIDE} variant="outline" size="md">
              Use the Buyer's Guide
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 5: ROI — Turn Your Display Into a Revenue Driver
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Turn Your Display Into a Revenue Driver
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Better displays don't just look good — they directly impact how much your
                customers spend.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-14">
              {/* Impulse Purchases */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">↑ Impulse Purchases</h3>
                <p className="text-gray-400 leading-relaxed">
                  LED-lit glass displays at checkout put your best products directly in the
                  customer's line of sight — driving unplanned add-on buys on every
                  transaction.
                </p>
              </div>

              {/* Perceived Value */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">↑ Perceived Value</h3>
                <p className="text-gray-400 leading-relaxed">
                  Research shows that professional display lighting can increase perceived
                  product value by up to 34%. Customers expect — and pay — more when
                  products look premium.
                </p>
              </div>

              {/* Store Professionalism */}
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">↑ Store Professionalism</h3>
                <p className="text-gray-400 leading-relaxed">
                  A well-displayed store signals quality to customers and justifies higher
                  prices. It also builds trust — leading to repeat customers and positive
                  word-of-mouth.
                </p>
              </div>
            </div>

            {/* ROI Claim */}
            <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-2xl p-8 md:p-12 text-center border border-green-700">
              <div className="flex justify-center mb-4">
                <span className="text-5xl">💰</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-3">
                Most store owners see ROI within 30–60 days
              </p>
              <p className="text-green-200 text-lg max-w-2xl mx-auto">
                When customers see your products better, they buy more. The math is simple —
                better displays pay for themselves quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EXISTING SEO SECTION: PROBLEM → SOLUTION (preserved)
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-4">
              Why Most Smoke Shops Lose Sales (And How to Fix It)
            </h2>
            <p className="text-gray-600 text-lg">
              Poor display setup is costing you customers and revenue every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Problem Cards */}
            {[
              {
                title: 'Poor Product Visibility',
                desc: 'Products get lost on dark shelves. Customers cannot see what you have.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ),
              },
              {
                title: 'Inventory Theft',
                desc: 'Open displays invite shoplifters. High-value items disappear.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                ),
              },
              {
                title: 'Cheap-Looking Setup',
                desc: 'Poor presentation makes products look cheap. You cannot charge premium prices.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-red-50 rounded-xl p-8 border-l-4 border-red-500"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Arrow Divider */}
          <div className="flex justify-center mb-16">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Solution Cards */}
            {[
              {
                title: 'LED-Lit Displays',
                desc: 'LED-lit glass displays increase attention and impulse buys.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                ),
              },
              {
                title: 'Lockable Security',
                desc: 'Lockable, secure display systems protect high-margin items.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                ),
              },
              {
                title: 'Premium Experience',
                desc: 'Modern displays increase perceived value and pricing power.',
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-green-50 rounded-xl p-8 border-l-4 border-green-500"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button href={ROUTES.COLLECTION} variant="primary" size="lg" className="text-lg px-10 py-5">
              See Display Options
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 6: EMAIL CAPTURE — 10% Off + Free Guide
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-black rounded-2xl p-8 md:p-12 border border-gray-800">
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Get 10% Off + Free Display Optimization Guide
              </h2>
              <p className="text-gray-400 mb-3">
                Join smoke shop owners who are growing their revenue with better displays.
              </p>
              <ul className="text-gray-300 text-sm mb-8 space-y-1">
                <li>✔ Instant 10% discount code sent to your inbox</li>
                <li>✔ Free Display Optimization Guide (PDF)</li>
                <li>✔ Exclusive tips for smoke shop owners</li>
              </ul>

              <form
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                onSubmit={undefined}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 border-transparent whitespace-nowrap"
                >
                  Unlock Offer
                </Button>
              </form>

              <p className="text-gray-500 text-sm mt-4">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EXISTING SEO SECTION: EXPERT BLOG GUIDES (preserved)
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Expert Guides for Smoke Shop Owners</h2>
            <p className="text-gray-600 text-lg">
              Learn how to maximize your store's potential with our comprehensive guides on{' '}
              <a href={ROUTES.BUYING_GUIDE} className="text-black underline hover:no-underline">
                retail display cases
              </a>
              , LED lighting, and visual merchandising.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {FEATURED_BLOG_POSTS.map((post) => (
              <a
                key={post.id}
                href={post.href}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="aspect-video relative bg-gray-200 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-black group-hover:text-blue-600 transition-colors">
                    Read Article
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/blog" variant="secondary" size="lg">
              View All Articles →
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          EXISTING SEO SECTION: TRUST BUILDING + TESTIMONIAL (preserved)
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">
                Trusted by Smoke Shops, Vape Stores &amp; Retail Brands
              </h2>
              <p className="text-gray-600 text-lg">
                Join hundreds of store owners who have transformed their retail experience with
                professional{' '}
                <a
                  href={ROUTES.COLLECTION}
                  className="text-black underline hover:no-underline"
                >
                  LED retail display cases
                </a>
                .
              </p>
            </div>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Secure Checkout',
                  desc: '256-bit SSL encryption on all orders',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  ),
                },
                {
                  title: 'Premium Materials',
                  desc: 'Commercial-grade construction',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                },
                {
                  title: 'Fast U.S. Shipping',
                  desc: 'Nationwide freight delivery',
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="text-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200">
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl md:text-2xl italic mb-6 text-center max-w-3xl mx-auto">
                "These display cases completely transformed our store. Sales are up 40% and
                customers constantly comment on how professional everything looks."
              </p>
              <div className="text-center">
                <p className="font-bold text-gray-900">— Mike R.</p>
                <p className="text-gray-600 text-sm">Smoke Shop Owner, Texas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA — Close the Page
          ══════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Upgrade Your Store Today</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Turn your display into a high-converting sales tool. Increase visibility, improve
              security, and boost revenue with professional{' '}
              <strong>LED display cases for smoke shops</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                href={ROUTES.COLLECTION}
                variant="primary"
                size="lg"
                className="text-lg px-10 py-5 bg-white text-black hover:bg-gray-200 border-transparent"
              >
                Shop Display Cases
              </Button>
              <Button
                href="/wholesale"
                variant="secondary"
                size="lg"
                className="text-lg px-10 py-5 border-white text-white hover:bg-white hover:text-black"
              >
                Get Bulk Pricing
              </Button>
            </div>
            <p className="text-gray-500 text-sm">
              Free shipping nationwide · 5-Year Warranty · Easy assembly
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
