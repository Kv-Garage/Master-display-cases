import { getProduct, getCollectionProducts, formatPrice } from '@/lib/shopify';
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
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  } catch {
    return { title: 'Product Not Found | Master Display Cases' };
  }
}

export async function generateStaticParams() {
  return [];
}

// Get collection handle from product tags
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
      featuredImage,
      images,
      priceRange,
      handle: productHandle,
    } = product;

    const price = priceRange?.minVariantPrice?.amount ? parseFloat(priceRange.minVariantPrice.amount) : 0;
    const mainImage = featuredImage?.url || images?.edges?.[0]?.node?.url;

    // Get related products from the same collection
    let relatedProducts: any[] = [];
    try {
      const collectionHandle = getCollectionHandle(product);
      const collectionProducts = await getCollectionProducts({ handle: collectionHandle });
      relatedProducts = collectionProducts
        .filter((p: any) => p.id !== product.id)
        .slice(0, 4);
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
            <Link href={`/collections/${getCollectionHandle(product)}`} className="hover:text-black capitalize">
              {getCollectionHandle(product).replace(/-/g, ' ')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black">{title}</span>
          </nav>
        </div>

        {/* Main Product Section */}
        <section className="container-custom pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <ProductGallery
              images={images?.edges?.map((img: any) => ({
                id: img.node.id || `img-${Math.random()}`,
                url: img.node.url,
                altText: img.node.altText,
                width: 800,
                height: 800,
              })) || []}
              title={title}
              hasDiscount={false}
              compareAtPrice={undefined}
              price={price}
            />

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  Master Display Cases
                </p>
                <h1 className="heading-lg mb-4">{title}</h1>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-black">
                    {formatPrice(price)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: description || '' }}
              />

              {/* CTA Buttons */}
              <div className="space-y-4">
                <AddToQuoteButton
                  product={{
                    id: product.id,
                    title: product.title,
                    handle: productHandle,
                    price: price,
                    featuredImage: featuredImage,
                  }}
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
                {relatedProducts.map((p: any) => (
                  <ProductCard 
                    key={p.id} 
                    product={{
                      id: p.id,
                      title: p.title,
                      handle: p.handle,
                      description: p.description,
                      featuredImage: p.featuredImage,
                      images: p.images,
                      priceRange: p.priceRange,
                    }} 
                  />
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
  } catch (error) {
    console.error('Product page error:', error);
    notFound();
  }
}