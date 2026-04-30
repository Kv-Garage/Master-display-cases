import { getCollection, getCollectionProducts, getProducts, formatPrice, isShopifyConfigured } from '@/lib/shopify';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Product } from '@/types';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  
  try {
    const collection = await getCollection(resolvedParams.handle);
    if (!collection) {
      return {
        title: 'Collection Not Found | Master Display Cases',
      };
    }

    return {
      title: `${collection.title} | Master Display Cases`,
      description: collection.description || `Browse our ${collection.title} collection`,
    };
  } catch {
    return {
      title: 'Collection | Master Display Cases',
    };
  }
}

export async function generateStaticParams() {
  // Return empty array - pages will be generated on-demand
  return [];
}

// Filter options
const filterOptions = [
  {
    id: 'type',
    label: 'Type',
    values: ['All', 'Countertop', 'Floor Standing', 'Wall Mounted', 'Showcase'],
  },
  {
    id: 'lighting',
    label: 'Lighting',
    values: ['All', 'LED', 'RGB', 'No Lighting'],
  },
  {
    id: 'size',
    label: 'Size',
    values: ['All', 'Small (under 4ft)', 'Medium (4-6ft)', 'Large (over 6ft)'],
  },
];

const sortOptions = [
  { value: 'manual', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'created-desc', label: 'Newest First' },
];

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  // Check if Shopify is configured
  const shopifyConfigured = isShopifyConfigured();
  
  let collection = null;
  let collectionError = null;
  
  try {
    collection = await getCollection(resolvedParams.handle);
  } catch (error: any) {
    collectionError = error.message;
    console.error('Collection fetch error:', error);
  }

  // Format collection title from handle if no collection data
  const formattedTitle = resolvedParams.handle
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // If collection not found (or API not configured), use a fallback
  if (!collection) {
    collection = {
      id: resolvedParams.handle,
      title: formattedTitle,
      description: !shopifyConfigured 
        ? 'Shopify Storefront API is not configured. Please set NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN.'
        : collectionError 
          ? `Error loading collection: ${collectionError}` 
          : 'Browse our collection of premium display cases.',
      handle: resolvedParams.handle,
    };
  }

  // Get products for this collection
  let products: Product[] = [];
  let apiError = null;

  try {
    const collectionProducts = await getCollectionProducts(resolvedParams.handle);
    products = collectionProducts || [];
    console.log(`Loaded ${products.length} products for collection: ${resolvedParams.handle}`);
  } catch (error: any) {
    apiError = error.message;
    console.error('Collection products fetch error:', error);
    
    // Fallback to general products
    try {
      const generalProducts = await getProducts();
      products = generalProducts || [];
      console.log(`Fallback: Loaded ${products.length} general products`);
    } catch (fallbackError: any) {
      console.error('Fallback products fetch error:', fallbackError);
      apiError = fallbackError.message;
      products = []; // Ensure products is always an array
    }
  }

  // Get string values from search params
  const getStringParam = (param: string | string[] | undefined, defaultVal: string): string => {
    if (typeof param === 'string') return param;
    return defaultVal;
  };

  const currentSort = getStringParam(resolvedSearchParams.sort, 'manual');
  const currentType = getStringParam(resolvedSearchParams.type, 'All');
  const currentLighting = getStringParam(resolvedSearchParams.lighting, 'All');
  const currentSize = getStringParam(resolvedSearchParams.size, 'All');

  // Filter products (client-side filtering)
  const filteredProducts = products.filter((product) => {
    // Type filter
    if (currentType !== 'All') {
      const typeMatch = product.tags?.some(
        (tag) => tag.toLowerCase().includes(currentType.toLowerCase())
      );
      if (!typeMatch) return false;
    }
    
    // Lighting filter
    if (currentLighting !== 'All') {
      const lightingTags = product.tags || [];
      if (currentLighting === 'No Lighting') {
        // Exclude products with LED or RGB tags
        if (lightingTags.some(t => t.toUpperCase() === 'LED' || t.toUpperCase() === 'RGB')) {
          return false;
        }
      } else {
        const lightingMatch = lightingTags.some(
          (tag) => tag.toLowerCase().includes(currentLighting.toLowerCase())
        );
        if (!lightingMatch) return false;
      }
    }
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (currentSort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'created-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{collection.title}</span>
        </nav>
      </div>

      {/* Collection Header */}
      <section className="container-custom pb-8">
        <div className="max-w-3xl">
          <h1 className="heading-lg mb-4">{collection.title}</h1>
          {collection.description && (
            <p className="body-lg text-gray-600">{collection.description}</p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container-custom pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Sort */}
            <div>
              <label className="block text-sm font-medium mb-3">Sort By</label>
              <select
                className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-black"
                defaultValue={currentSort}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Groups */}
            {filterOptions.map((filter) => (
              <div key={filter.id}>
                <label className="block text-sm font-medium mb-3">
                  {filter.label}
                </label>
                <div className="space-y-2">
                  {filter.values.map((value) => (
                    <Link
                      key={value}
                      href={{
                        pathname: `/collections/${resolvedParams.handle}`,
                        query: {
                          ...resolvedSearchParams,
                          [filter.id]: value === 'All' ? undefined : value,
                        },
                      }}
                      className={`block text-sm py-1 ${
                        (value === 'All' && !resolvedSearchParams[filter.id]) ||
                        resolvedSearchParams[filter.id] === value
                          ? 'text-black font-medium'
                          : 'text-gray-500 hover:text-black'
                      }`}
                    >
                      {value}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Clear Filters */}
            <Button
              href={`/collections/${resolvedParams.handle}`}
              variant="outline"
              fullWidth
              size="sm"
            >
              Clear All Filters
            </Button>

            {/* Help Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">
                Need help choosing?
              </p>
              <Button href="/contact" variant="outline" fullWidth size="sm">
                Contact Us
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Products */}
            {!shopifyConfigured ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Shopify Not Configured</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  The Shopify Storefront API token is not set. Products cannot be loaded.
                </p>
                <Button href="/contact" variant="outline">
                  Contact Support
                </Button>
              </div>
            ) : apiError && sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Unable to Load Products</h3>
                <p className="text-gray-600 mb-2 max-w-md mx-auto">
                  There was an error connecting to Shopify: {apiError}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Please try again later or contact us for assistance.
                </p>
                <Button href="/contact" variant="outline">
                  Contact Us
                </Button>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4">
                  No products found in this collection.
                </p>
                <Button href="/">
                  Browse All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      {collection.description && (
        <section className="bg-gray-50 section-padding">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h2 className="heading-md mb-4">About {collection.title}</h2>
              <div
                className="prose prose-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: collection.description }}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}