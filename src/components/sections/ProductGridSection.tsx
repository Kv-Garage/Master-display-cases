import { Product } from '@/types';
import ProductCard, { ProductCardSkeleton } from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';

interface ProductGridSectionProps {
  products?: Product[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  showEmptyState?: boolean;
}

export default function ProductGridSection({
  products,
  isLoading = false,
  title = 'Featured Display Cases',
  subtitle = 'Explore our most popular commercial display systems',
  viewAllHref = '/collections/display-cases',
  showEmptyState = false,
}: ProductGridSectionProps) {
  // If no products provided and not loading, optionally show empty state
  if (!products || products.length === 0) {
    if (!isLoading && showEmptyState) {
      return (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Products Coming Soon
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're currently setting up our product catalog. Check back soon for our premium display cases.
              </p>
              <Button href="/contact" variant="outline">
                Contact Us for Updates
              </Button>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Our Products
            </span>
            <h2 className="heading-lg mt-2">{title}</h2>
            <p className="text-gray-600 mt-2 max-w-xl">{subtitle}</p>
          </div>
          <Button href={viewAllHref} variant="outline">
            View All Products
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? // Show skeletons while loading
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center lg:hidden">
          <Button href={viewAllHref} variant="outline" fullWidth>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}

// Featured products section with larger cards
export function FeaturedProductsSection({
  products,
  isLoading = false,
}: {
  products?: Product[];
  isLoading?: boolean;
}) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Premium Selection
          </span>
          <h2 className="heading-lg mt-2">Best-Selling Display Systems</h2>
          <p className="text-gray-600 mt-2">
            Our most popular commercial display cases, trusted by retailers
            nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
        </div>
      </div>
    </section>
  );
}