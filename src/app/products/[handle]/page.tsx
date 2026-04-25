import { getProduct, getProducts, getCollectionProducts, formatPrice } from '@/lib/shopify';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ShippingCalculator from '@/components/sections/ShippingCalculator';
import AddToQuoteButton from '@/components/ui/AddToQuoteButton';
import ProductGallery from '@/components/sections/ProductGallery';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

// Sample products for fallback when Shopify API fails
// Images use placeholder - real products will use Shopify CDN URLs from API
const sampleProducts: Record<string, Product> = {
  '70-led-retail-display-showcase-rgb': {
    id: 'demo-1',
    title: '70" LED Retail Display Showcase - RGB',
    handle: '70-led-retail-display-showcase-rgb',
    description: 'Professional 70" LED retail display showcase with RGB lighting system.',
    price: 1899,
    compareAtPrice: 2299,
    images: [{ id: 'img-1', url: '/placeholder.jpg', altText: '70" LED Display Showcase', width: 800, height: 800 }],
    variants: [
      { id: 'var-1', title: 'Black', price: 1899, compareAtPrice: 2299, availableForSale: true, sku: 'LED-70-RGB-BLK', inventoryQuantity: 12, optionValues: [{ name: 'Black' }], image: undefined },
      { id: 'var-2', title: 'White', price: 1899, compareAtPrice: 2299, availableForSale: true, sku: 'LED-70-RGB-WHT', inventoryQuantity: 8, optionValues: [{ name: 'White' }], image: undefined },
    ],
    vendor: 'Master Display Cases',
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Floor Standing', 'Retail'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [{ id: 'opt-1', name: 'Color', values: ['Black', 'White'] }],
  },
  '48-led-retail-display-showcase-rgb': {
    id: 'demo-2',
    title: '48" LED Retail Display Showcase - RGB',
    handle: '48-led-retail-display-showcase-rgb',
    description: 'Compact 48" LED retail display showcase with RGB lighting.',
    price: 1299,
    compareAtPrice: 1599,
    images: [{ id: 'img-2', url: '/placeholder.jpg', altText: '48" LED Display Showcase', width: 800, height: 800 }],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Countertop',
    tags: ['LED', 'RGB', 'Countertop', 'Retail'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
  '72-led-retail-display-case-rgb': {
    id: 'demo-3',
    title: '72" LED Retail Display Case - RGB',
    handle: '72-led-retail-display-case-rgb',
    description: 'Large 72" LED retail display case with premium RGB lighting.',
    price: 2499,
    compareAtPrice: 2999,
    images: [{ id: 'img-3', url: '/placeholder.jpg', altText: '72" LED Display Case', width: 800, height: 800 }],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Floor Standing', 'Retail'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
  '48-led-retail-wrap-counter-rgb': {
    id: 'demo-4',
    title: '48" LED Retail Wrap Counter - RGB',
    handle: '48-led-retail-wrap-counter-rgb',
    description: '48" LED retail wrap counter with RGB lighting.',
    price: 1699,
    compareAtPrice: 1999,
    images: [{ id: 'img-4', url: '/placeholder.jpg', altText: '48" LED Wrap Counter', width: 800, height: 800 }],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Countertop',
    tags: ['LED', 'RGB', 'Wrap Counter', 'Retail'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
};

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  let product;
  try {
    product = await getProduct(resolvedParams.handle);
  } catch {
    product = null;
  }

  if (!product) {
    return {
      title: 'Product Not Found | Master Display Cases',
    };
  }

  return {
    title: `${product.title} | Master Display Cases`,
    description: product.description,
    openGraph: {
      type: 'website',
      title: product.title,
      description: product.description,
      images: product.images.map((img: { url: string }) => img.url).filter(Boolean),
    },
  };
}

// Sample product handles for fallback when Shopify isn't configured
const sampleProductHandles = [
  '70-led-retail-display-showcase-rgb',
  '48-led-retail-display-showcase-rgb',
  '72-led-retail-display-case-rgb',
  '48-led-retail-wrap-counter-rgb',
];

export async function generateStaticParams() {
  try {
    const products = await getProducts(50);
    if (products && products.length > 0) {
      return products.map((product: { handle: string }) => ({
        handle: product.handle,
      }));
    }
  } catch {
    // Use sample product handles as fallback
  }
  
  // Return sample product handles when Shopify isn't configured
  return sampleProductHandles.map((handle) => ({ handle }));
}

// Map product types to collection handles
const productTypeToCollection: Record<string, string> = {
  'Display Case': 'display-cases',
  'Countertop': 'countertop',
  'Floor Standing': 'floor-standing',
  'Wall Mounted': 'wall-mounted',
  'Showcase': 'showcase',
  'Store Package': 'store-packages',
};

// Get collection handle from product
function getCollectionHandle(product: Product): string {
  // First, try to match by product type
  const typeKey = Object.keys(productTypeToCollection).find(
    (key) => product.productType.toLowerCase().includes(key.toLowerCase())
  );
  if (typeKey) {
    return productTypeToCollection[typeKey];
  }

  // Then, try to match by tags
  const tagCollections = ['display-cases', 'countertop', 'floor-standing', 'wall-mounted', 'showcase', 'store-packages'];
  for (const tag of product.tags) {
    const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
    if (tagCollections.includes(normalizedTag)) {
      return normalizedTag;
    }
  }

  // Default to display-cases
  return 'display-cases';
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  
  // Try to fetch from Shopify, fall back to sample data
  let product: Product | null = null;
  try {
    product = await getProduct(resolvedParams.handle);
  } catch {
    // Use sample product as fallback
    product = sampleProducts[resolvedParams.handle] || null;
  }

  // If still no product, check sample products
  if (!product) {
    product = sampleProducts[resolvedParams.handle] || null;
  }

  if (!product) {
    notFound();
  }

  const {
    title,
    description,
    price,
    compareAtPrice,
    images,
    variants,
    options,
    tags,
    vendor,
    productType,
    handle: productHandle,
  } = product;

  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const mainImage = images[0];
  const collectionHandle = getCollectionHandle(product);

  // Get related products from the same collection
  let relatedProducts: Product[] = [];
  try {
    const collectionProducts = await getCollectionProducts({
      handle: collectionHandle,
      first: 8,
    });
    relatedProducts = (collectionProducts as Product[])
      .filter((p: Product) => p.id !== product.id)
      .slice(0, 4);

    // If not enough related products, add some general products
    if (relatedProducts.length < 4) {
      const allProducts = await getProducts(8);
      const additionalProducts = (allProducts as Product[])
        .filter((p: Product) => p.id !== product.id && !relatedProducts.find(rp => rp.id === p.id))
        .slice(0, 4 - relatedProducts.length);
      relatedProducts = [...relatedProducts, ...additionalProducts];
    }
  } catch {
    // No related products
  }

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

      {/* Main Product Section */}
      <section className="container-custom pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery with all photos */}
          <ProductGallery
            images={images}
            title={title}
            hasDiscount={!!hasDiscount}
            compareAtPrice={compareAtPrice}
            price={price}
          />

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {vendor}
              </p>
              <h1 className="heading-lg mb-4">{title}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-black">
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(compareAtPrice!)}
                    </span>
                    <span className="text-sm font-medium text-black bg-gray-100 px-2 py-1">
                      {Math.round(
                        ((compareAtPrice! - price) / compareAtPrice!) * 100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Variant Options - Show variants from Shopify */}
            {variants.length > 0 && (
              <div className="space-y-6">
                {options.map((option: { id: string; name: string; values: string[] }) => (
                  <div key={option.id}>
                    <label className="block text-sm font-medium mb-3">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {option.values.map((value) => {
                        const variant = variants.find((v: { optionValues: { name: string }[] }) =>
                          v.optionValues.some((ov: { name: string }) => ov.name === value)
                        );
                        const isAvailable = variant?.availableForSale;
                        return (
                          <button
                            key={value}
                            disabled={!isAvailable}
                            className={`px-4 py-2 border text-sm transition-colors ${
                              isAvailable 
                                ? 'border-gray-300 hover:border-black' 
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {value}
                            {!isAvailable && ' (Sold Out)'}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                {/* Show variant price and availability */}
                {variants.length > 0 && (
                  <div className="text-sm text-gray-600">
                    {variants.some((v: { sku: string }) => v.sku) && (
                      <p>SKU: <span className="font-medium">{variants[0].sku}</span></p>
                    )}
                    {variants.some((v: { inventoryQuantity: number }) => v.inventoryQuantity > 0) && (
                      <p>Availability: <span className="font-medium text-green-600">In Stock</span></p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Product Specifications from Shopify */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-black">Specifications</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {productType && (
                  <p><span className="font-medium">Type:</span> {productType}</p>
                )}
                {vendor && (
                  <p><span className="font-medium">Brand:</span> {vendor}</p>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs bg-white border border-gray-200 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <AddToQuoteButton
                product={product}
                fullWidth
              />
              <Button href={`/contact?product=${productHandle}`} fullWidth size="lg">
                Get a Quote
              </Button>
              <Button
                href={`/contact?product=${productHandle}&bulk=true`}
                variant="secondary"
                fullWidth
                size="lg"
              >
                Request Bulk Pricing
              </Button>
            </div>

            {/* Shipping Calculator */}
            <ShippingCalculator price={price} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-md mb-8">Related Display Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schema.org Product markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: title,
            description: description,
            image: mainImage?.url,
            brand: {
              '@type': 'Brand',
              name: vendor,
            },
            offers: {
              '@type': 'Offer',
              price: price,
              priceCurrency: 'USD',
              availability: product.availableForSale
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          }),
        }}
      />
    </div>
  );
}