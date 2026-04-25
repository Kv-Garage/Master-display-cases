import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProductGridSection from '@/components/sections/ProductGridSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { getProducts } from '@/lib/shopify';
import { Product } from '@/types';

// Sample display case products for demo when Shopify is not configured
const sampleProducts: Product[] = [
  {
    id: 'demo-1',
    title: '70" LED Retail Display Showcase - RGB',
    handle: '70-led-retail-display-showcase-rgb',
    description: 'Professional 70" LED retail display showcase with RGB lighting system. Perfect for high-end retail environments and product exhibitions.',
    price: 1899,
    compareAtPrice: 2299,
    images: [
      {
        id: 'img-1',
        url: 'https://cdn.shopify.com/s/files/1/0001/0001/products/display-case-70-rgb.jpg',
        altText: '70" LED Retail Display Showcase - RGB',
        width: 800,
        height: 800,
      },
    ],
    variants: [
      { id: 'var-1', title: 'Black', price: 1899, compareAtPrice: 2299, availableForSale: true, sku: 'LED-70-RGB-BLK', inventoryQuantity: 12, optionValues: [{ name: 'Color' }], image: undefined },
      { id: 'var-2', title: 'White', price: 1899, compareAtPrice: 2299, availableForSale: true, sku: 'LED-70-RGB-WHT', inventoryQuantity: 8, optionValues: [{ name: 'Color' }], image: undefined },
    ],
    vendor: 'Master Display Cases',
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Floor Standing', 'Retail', '70"', 'display-cases'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [{ id: 'opt-1', name: 'Color', values: ['Black', 'White'] }],
  },
  {
    id: 'demo-2',
    title: '48" LED Retail Display Showcase - RGB',
    handle: '48-led-retail-display-showcase-rgb',
    description: 'Compact 48" LED retail display showcase with RGB lighting. Ideal for smaller retail spaces and countertop displays.',
    price: 1299,
    compareAtPrice: 1599,
    images: [
      {
        id: 'img-2',
        url: 'https://cdn.shopify.com/s/files/1/0001/0001/products/display-case-48-rgb.jpg',
        altText: '48" LED Retail Display Showcase - RGB',
        width: 800,
        height: 800,
      },
    ],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Countertop',
    tags: ['LED', 'RGB', 'Countertop', 'Retail', '48"', 'countertop'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
  {
    id: 'demo-3',
    title: '72" LED Retail Display Case - RGB',
    handle: '72-led-retail-display-case-rgb',
    description: 'Large 72" LED retail display case with premium RGB lighting system. Maximum visibility for high-value products.',
    price: 2499,
    compareAtPrice: 2999,
    images: [
      {
        id: 'img-3',
        url: 'https://cdn.shopify.com/s/files/1/0001/0001/products/display-case-72-rgb.jpg',
        altText: '72" LED Retail Display Case - RGB',
        width: 800,
        height: 800,
      },
    ],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Floor Standing', 'Retail', '72"', 'display-cases'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
  {
    id: 'demo-4',
    title: '48" LED Retail Wrap Counter - RGB',
    handle: '48-led-retail-wrap-counter-rgb',
    description: '48" LED retail wrap counter with RGB lighting. Perfect for checkout areas and product showcases.',
    price: 1699,
    compareAtPrice: 1999,
    images: [
      {
        id: 'img-4',
        url: 'https://cdn.shopify.com/s/files/1/0001/0001/products/wrap-counter-48-rgb.jpg',
        altText: '48" LED Retail Wrap Counter - RGB',
        width: 800,
        height: 800,
      },
    ],
    variants: [],
    vendor: 'Master Display Cases',
    productType: 'Countertop',
    tags: ['LED', 'RGB', 'Wrap Counter', 'Retail', '48"', 'countertop'],
    availableForSale: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    options: [],
  },
];

export default async function HomePage() {
  // Fetch products from Shopify, fall back to sample products
  let products: Product[] = sampleProducts;

  try {
    const shopifyProducts = await getProducts(8);
    if (shopifyProducts && shopifyProducts.length > 0) {
      products = shopifyProducts;
    }
  } catch (error) {
    // Use sample products if Shopify API is not configured
    console.log('Using sample products - Shopify API may not be configured');
  }

  return (
    <>
      <HeroSection />
      <TrustBar />
      <BenefitsSection />
      <ProductGridSection 
        products={products} 
        showEmptyState={false}
      />
      <UseCasesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}