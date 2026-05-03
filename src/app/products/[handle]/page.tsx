import { getProduct, getProducts, formatPrice } from '@/lib/shopify';
import ProductConfigurator from '@/components/sections/ProductConfigurator';
import ProductGallery from '@/components/sections/ProductGallery';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import FAQSection from '@/components/sections/FAQSection';
import UGCGallery from '@/components/sections/UGCGallery';
import ProductPageReviews from '@/components/sections/ProductReviews';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Conversion-focused section component - compact supporting block
function WhyUpgradeSection() {
  return (
    <div className="py-6 border-b border-gray-100">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-lg font-bold text-black mb-3">
            Why Stores Upgrade to LED Display Counters
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Increase impulse purchases with better visibility</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Secure high-value products with lockable glass</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-700">Instantly upgrade store appearance (higher perceived value)</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start md:items-end justify-center gap-3">
          <p className="text-green-700 font-semibold text-sm bg-green-50 px-4 py-2 rounded-lg">
            💰 Most stores recover this investment in 30–60 days
          </p>
          <Link
            href="/collections/rgb-displays"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            View Displays
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  try {
    const product = await getProduct(resolvedParams.handle);
    if (!product) {
      return { title: 'Product Not Found | Master Display Cases' };
    }

    return {
      title: `${product.title} | Master Display Cases`,
      description: product.description,
      openGraph: {
        type: 'website',
        title: product.title,
        description: product.description,
        images: product.image ? [product.image] : [],
      },
    };
  } catch {
    return { title: 'Product Not Found | Master Display Cases' };
  }
}

export async function generateStaticParams() {
  return [];
}

function getCollectionHandle(product: any): string {
  if (product.tags) {
    const tagCollections = ['display-cases', 'countertop', 'floor-standing', 'wall-mounted', 'showcase', 'store-packages'];
    for (const tag of product.tags) {
      const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
      if (tagCollections.includes(normalizedTag)) {
        return normalizedTag;
      }
    }
  }
  return 'display-cases';
}

const ROI_DATA = [
  { label: 'Avg. Sales Increase', value: '35%', description: 'Stores see 35% more impulse purchases' },
  { label: 'Payback Period', value: '30-60', description: 'Days to recover investment' },
  { label: 'Customer Attention', value: '3x', description: 'More eyes on featured products' },
];

const BEFORE_AFTER_DATA = [
  {
    before: '/Before and after of 48".png',
    after: '/Before and after of 48".png',
    title: '48" Display Case',
  },
  {
    before: '/Before and after of 72".png',
    after: '/Before and after of 72".png',
    title: '72" Display Case',
  },
  {
    before: '/Before and after of the 70W.png',
    after: '/Before and after of the 70W.png',
    title: '70W Display Case',
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  try {
    const product = await getProduct(resolvedParams.handle);
    if (!product) {
      notFound();
    }

    const {
      title,
      description,
      image,
      images,
      price,
      handle: productHandle,
      variants,
      variantId,
      productType,
      id: productId,
    } = product;

    const mainImage = image || images?.[0]?.url;
    const collectionHandle = getCollectionHandle(product);

    // Get all products for the configurator (for mixed-product bundles)
    let allProducts: any[] = [];
    try {
      allProducts = await getProducts();
    } catch {
      // Fallback to empty array
    }

    // Format products for configurator with variant data
    const configuratorProducts = allProducts.map((p: any) => ({
      id: p.id,
      name: p.title,
      handle: p.handle,
      price: p.price,
      image: p.image || p.images?.[0]?.url || '',
      variantId: p.variantId || p.variants?.[0]?.id || '',
      variants: (p.variants as Array<{ id: string; title: string; price: number; availableForSale: boolean }>)?.map((v: { id: string; title: string; price: number; availableForSale: boolean }) => ({
        id: v.id,
        title: v.title,
        price: v.price,
        available: v.availableForSale,
      })) || [],
    }));

    // Check if current product has variants with different prices
    const hasVariantPricing = variants && variants.length > 1 && 
      variants.some((v: { price: number }) => v.price !== variants[0]?.price);

    // Get default variant
    const defaultVariant = variants?.find((v: { id: string }) => v.id === variantId) || variants?.[0];

    return (
      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="container-custom py-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/collections/${collectionHandle}`} className="hover:text-black capitalize">
              {collectionHandle.replace(/-/g, ' ')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{title}</span>
          </nav>
        </div>

        {/* HERO SECTION: 2-Column Layout - Gallery Left, Configurator Right */}
        <section className="py-8">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* LEFT: Product Gallery */}
              <div>
                <ProductGallery
                  images={images}
                  title={title}
                  hasDiscount={!!product.compareAtPrice && product.compareAtPrice > price}
                  compareAtPrice={product.compareAtPrice}
                  price={price}
                  description={description}
                  productType={productType}
                  variants={variants?.map((v: { title: string; price: number }) => ({ title: v.title, price: v.price })) || []}
                />
                
                {/* Quick Product Info (below gallery on mobile) */}
                <div className="mt-6 lg:hidden">
                  <h1 className="text-2xl font-bold text-black mb-2">{title}</h1>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-2xl font-bold text-black">
                      {hasVariantPricing 
                        ? `From ${formatPrice(product.minPrice || price)}`
                        : formatPrice(price)
                      }
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > price && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT: Product Configurator */}
              <div>
                {/* Product Title (desktop only) */}
                <div className="hidden lg:block mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-black mb-2">{title}</h1>
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl font-bold text-black">
                      {hasVariantPricing 
                        ? `From ${formatPrice(product.minPrice || price)}`
                        : formatPrice(price)
                      }
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > price && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                          Save {formatPrice(product.compareAtPrice - price)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Conversion Support Section - Added between title and configurator */}
                <div className="mb-6">
                  <WhyUpgradeSection />
                </div>

                {/* Main Configurator - handles variant selection + bundle */}
                <ProductConfigurator
                  products={configuratorProducts}
                  currentProductHandle={productHandle}
                  // Pass the current product as the "base" product
                  baseProduct={{
                    id: productId,
                    name: title,
                    handle: productHandle,
                    price: defaultVariant?.price || price,
                    image: image || images?.[0]?.url || '',
                    variantId: defaultVariant?.id || variantId || '',
                    variants: variants?.map((v: { id: string; title: string; price: number; availableForSale: boolean }) => ({
                      id: v.id,
                      title: v.title,
                      price: v.price,
                      available: v.availableForSale,
                    })) || [],
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-12 bg-gray-50 border-y border-gray-200">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-black text-center mb-8">
              Why Retailers Choose Our Display Cases
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {ROI_DATA.map((item, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-4xl font-bold text-black mb-2">{item.value}</div>
                  <div className="font-semibold text-black mb-1">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-black text-center mb-8">
              See the Difference
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {BEFORE_AFTER_DATA.map((item, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                  <BeforeAfterSlider
                    beforeImage={item.before}
                    afterImage={item.after}
                    altText={item.title}
                    showCallout={false}
                  />
                  <div className="p-3 text-center font-medium text-black">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UGC Gallery Section - Real Store Photos */}
        <UGCGallery />

        {/* Product Reviews Section - Store Owner Testimonials */}
        <ProductPageReviews />

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom max-w-4xl">
            <FAQSection />
          </div>
        </section>

        {/* Schema.org Product markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: title,
              description: description,
              image: mainImage,
              brand: {
                '@type': 'Brand',
                name: 'Master Display Cases',
              },
              offers: {
                '@type': 'Offer',
                price: price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      </div>
    );
  } catch {
    notFound();
  }
}