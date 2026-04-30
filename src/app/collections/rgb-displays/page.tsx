'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { addToCartWithDetails } from '@/lib/cart-utils';

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

interface StoreSize {
  id: 'small' | 'medium' | 'large';
  name: string;
  description: string;
  recommendation: string;
  icon: string;
}

const storeSizes: StoreSize[] = [
  { id: 'small', name: 'Small Store', description: 'Under 1,000 sq ft', recommendation: '48" Counter', icon: '🏪' },
  { id: 'medium', name: 'Medium Store', description: '1,000 - 3,000 sq ft', recommendation: '70" Showcase', icon: '🏬' },
  { id: 'large', name: 'Large Store', description: 'Over 3,000 sq ft', recommendation: '72" Floor Standing', icon: '🏢' },
];

// Product Card Component - Clean, fast, conversion-focused
function ProductCard({ 
  product, 
  onAddToCart,
  onViewDetails 
}: { 
  product: Product; 
  onAddToCart: (variant: any) => void;
  onViewDetails: (product: Product) => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.id || '');

  const currentPrice = product.variants.find(v => v.id === selectedVariant)?.price || product.price;
  const currentVariant = product.variants.find(v => v.id === selectedVariant);

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-400 transition-all duration-300">
      {/* Image - Link to product page */}
      <Link href={`/products/${product.handle}`} className="block relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
          <span className="text-sm font-bold text-gray-900">${currentPrice.toLocaleString()}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/products/${product.handle}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem] hover:text-gray-600 transition-colors">
            {product.title.replace(/"/g, '"').replace(/"/g, '"')}
          </h3>
        </Link>

        {/* Variant Selector */}
        {product.variants.length > 1 && (
          <div className="mb-4 space-y-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedVariant === variant.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{variant.title}</span>
                <span className={selectedVariant === variant.id ? 'text-white/80' : 'text-gray-500'}>
                  ${variant.price.toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => currentVariant && onAddToCart(currentVariant)}
            className="flex-1 bg-black text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add to Cart
          </button>
          <button
            onClick={() => onViewDetails(product)}
            className="px-4 py-3 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Sticky Add to Cart Bar
function StickyCartBar({ 
  product, 
  isVisible, 
  onAddToCart 
}: { 
  product: Product | null; 
  isVisible: boolean; 
  onAddToCart: () => void;
}) {
  if (!isVisible || !product) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 px-4 py-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden hidden sm:block">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{product.title.replace(/"/g, '"').replace(/"/g, '"')}</p>
            <p className="text-sm text-gray-500">${product.price.toLocaleString()}</p>
          </div>
        </div>
        <button
          onClick={onAddToCart}
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function RGBDisplaysCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStoreSize, setSelectedStoreSize] = useState<string | null>(null);
  const [stickyProduct, setStickyProduct] = useState<Product | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/collections');
        const data = await response.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Handle scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show sticky bar when scrolled past hero but products are visible
      if (scrollY > 400 && scrollY < windowHeight * 2) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (variant: any, product: Product) => {
    addItem({
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      image: { url: product.image, altText: product.title },
      productHandle: product.handle,
    });
  };

  const handleViewDetails = (product: Product) => {
    // Scroll to product and highlight
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1 && productRefs.current[index]) {
      productRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setStickyProduct(product);
    }
  };

  const handleStoreSizeSelect = (size: StoreSize) => {
    setSelectedStoreSize(size.id);
    // Find and scroll to recommended product
    const targetSize = size.recommendation.split('"')[0];
    const index = products.findIndex(p => p.title.includes(targetSize));
    if (index !== -1 && productRefs.current[index]) {
      setTimeout(() => {
        productRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setStickyProduct(products[index]);
      }, 100);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading displays...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* ===== HERO SECTION (Simplified) ===== */}
      <section className="relative bg-black text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/In-store Shop Display 2.jpeg"
            alt="RGB Display Cases"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              RGB Display Cases
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Professional-grade display systems that increase perceived value and drive impulse purchases. 
              Pays for itself in 30–60 days.
            </p>
            <Button 
              href="#products" 
              variant="primary" 
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
            >
              Shop Display Systems
            </Button>
          </div>
        </div>
      </section>

      {/* ===== QUICK SHOP GRID (Top Priority) ===== */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Display</h2>
            <p className="text-gray-600">Select a size and add to cart in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div key={product.id} ref={el => { productRefs.current[index] = el; }}>
                  <ProductCard
                    product={product}
                    onAddToCart={(variant) => handleAddToCart(variant, product)}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))
            ) : (
              // Fallback products
              [
                { id: '1', title: '48" LED Retail Wrap Counter with RGB Lighting', handle: '48-counter', image: '/SEO 1.jpeg', price: 899, variantId: 'v1', variants: [{ id: 'v1', title: 'Standard RGB', price: 899, available: true }, { id: 'v2', title: 'Premium + Lock', price: 1099, available: true }], images: [] },
                { id: '2', title: '70" LED Retail Display Showcase with RGB Lighting', handle: '70-showcase', image: '/In-store Shop Display 2.jpeg', price: 1149, variantId: 'v1', variants: [{ id: 'v1', title: 'Standard RGB', price: 1149, available: true }, { id: 'v2', title: 'Premium + Lock', price: 1349, available: true }], images: [] },
                { id: '3', title: '72" LED Retail Display Case with RGB Lighting', handle: '72-display', image: '/UGC content.jpeg', price: 1399, variantId: 'v1', variants: [{ id: 'v1', title: 'Standard RGB', price: 1399, available: true }, { id: 'v2', title: 'Premium + Lock', price: 1599, available: true }], images: [] },
              ].map((product, index) => (
                <div key={product.id} ref={el => { productRefs.current[index] = el; }}>
                  <ProductCard
                    product={product as unknown as Product}
                    onAddToCart={() => {}}
                    onViewDetails={() => {}}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== STORE SIZE SELECTOR ===== */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Not sure which size?</h2>
            <p className="text-gray-600">Tell us about your store and we'll recommend the perfect display.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {storeSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => handleStoreSizeSelect(size)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedStoreSize === size.id
                    ? 'border-black bg-gray-900 text-white'
                    : 'border-gray-200 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="text-3xl mb-3">{size.icon}</div>
                <h3 className={`font-bold text-lg mb-1 ${selectedStoreSize === size.id ? 'text-white' : 'text-gray-900'}`}>
                  {size.name}
                </h3>
                <p className={`text-sm mb-3 ${selectedStoreSize === size.id ? 'text-gray-400' : 'text-gray-500'}`}>
                  {size.description}
                </p>
                <div className={`text-sm font-medium ${selectedStoreSize === size.id ? 'text-green-400' : 'text-black'}`}>
                  → {size.recommendation}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER (Compact) ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-200 rounded-xl p-6">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Before</span>
              <p className="text-gray-700 mt-2">Products lost on standard shelves. Low perceived value. Missed impulse sales.</p>
            </div>
            <div className="bg-black rounded-xl p-6 text-white">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">After</span>
              <p className="text-gray-300 mt-2">Products command attention. 40% higher perceived value. 35% more impulse purchases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROI SECTION (Simplified) ===== */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pays for Itself in 30–60 Days</h2>
            <p className="text-gray-600 mb-10">Professional displays aren't an expense — they're an investment.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">+35%</p>
                <p className="text-gray-600">More impulse purchases</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">+40%</p>
                <p className="text-gray-600">Higher perceived value</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">30-60</p>
                <p className="text-gray-600">Days to full ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Upgrade Your Store Display Today</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of retailers who have transformed their stores with professional RGB display cases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#products" variant="primary" size="lg" className="bg-white text-black hover:bg-gray-200">
              Shop Displays
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Get Quote
            </Button>
          </div>
        </div>
      </section>

      {/* ===== STICKY CART BAR ===== */}
      <StickyCartBar 
        product={stickyProduct}
        isVisible={showStickyBar && !!stickyProduct}
        onAddToCart={() => stickyProduct && handleAddToCart(stickyProduct.variants[0], stickyProduct)}
      />
    </main>
  );
}