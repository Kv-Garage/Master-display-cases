import { getCollection, getCollectionProducts, getProducts, formatPrice } from '@/lib/shopify';
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
  const collection = await getCollection(resolvedParams.handle);

  if (!collection) {
    return {
      title: 'Collection Not Found | Master Display Cases',
    };
  }

  return {
    title: `${collection.title} | Master Display Cases`,
    description: collection.description,
  };
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
  
  let collection = null;
  let collectionError = null;
  
  try {
    collection = await getCollection(resolvedParams.handle);
  } catch (error: any) {
    collectionError = error.message;
  }

  // If collection not found (or API not configured), use a fallback
  if (!collection) {
    collection = {
      id: resolvedParams.handle,
      title: resolvedParams.handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: collectionError 
        ? `SHOPIFY CONNECTION FAILED — ${collectionError}` 
        : 'Browse our collection of premium display cases.',
      handle: resolvedParams.handle,
    };
  }

  // Get products for this collection
  let products: Product[] = [];
  let isLoading = false;

  try {
    products = await getCollectionProducts(resolvedParams.handle);

    // If no products from collection, try general products
    if (products.length === 0) {
      products = await getProducts();
    }
  } catch {
    // Use sample products
    isLoading = true;
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

  // Filter products (client-side filtering for demo)
  const filteredProducts = products.filter((product) => {
    if (currentType !== 'All') {
      const typeMatch = product.tags.some(
        (tag) => tag.toLowerCase().includes(currentType.toLowerCase())
      );
      if (!typeMatch) return false;
    }
    if (currentLighting !== 'All') {
      const lightingMatch = product.tags.some(
        (tag) => tag.toLowerCase().includes(currentLighting.toLowerCase())
      );
      if (!lightingMatch && currentLighting !== 'No Lighting') return false;
      if (currentLighting === 'No Lighting' && product.tags.some(t => t === 'LED' || t === 'RGB')) return false;
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
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  No products match your filters.
                </p>
                <Button href={`/collections/${resolvedParams.handle}`}>
                  Clear Filters
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