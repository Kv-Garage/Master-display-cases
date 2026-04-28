import { getProducts } from '@/lib/shopify';
import BundleSection from './BundleSection';

// SEO Metadata
export const metadata = {
  title: 'Bulk Bundles - Save More with Display Case Packages | Master Display Cases',
  description: 'Pre-configured display case bundles for maximum savings. Starter packs, growth bundles, and complete store setups with assembly and warranty included.',
  keywords: 'display case bundles, bulk display packages, store display kits, retail bundle deals, display case starter pack',
  openGraph: {
    title: 'Bulk Bundles - Pre-Packaged Display Solutions | Master Display Cases',
    description: 'Save up to $1,200+ with our pre-configured display case bundles. Perfect for new stores or expansions.',
    type: 'website',
  },
};

const bundles = [
  {
    id: 'starter',
    name: 'Starter Bundle',
    tagline: 'Perfect for new stores or small expansions',
    price: '$1,198',
    originalPrice: '$1,348',
    savings: '$150',
    popular: false,
    productId: 'bundle-starter-2x48',
    variantId: 'bundle-starter-variant',
    bundlePrice: 1198,
    includes: [
      { item: '2x 48" LED Counter Display', description: 'RGB lighting, tempered glass' },
      { item: 'Professional Assembly Service', description: 'Save 2-3 hours of labor' },
      { item: 'Freight Shipping Coordinated', description: 'Nationwide delivery arranged' },
      { item: '2-Year Warranty', description: 'Full coverage on all components' },
    ],
    specs: {
      dimensions: '48"W x 18"D x 42"H each',
      lighting: 'RGB LED with remote',
      glass: 'Tempered safety glass',
      lock: 'Keyed lock included',
    },
  },
  {
    id: 'growth',
    name: 'Growth Bundle',
    tagline: 'Best for expanding multi-location businesses',
    price: '$2,697',
    originalPrice: '$3,097',
    savings: '$400',
    popular: true,
    productId: 'bundle-growth-3x70',
    variantId: 'bundle-growth-variant',
    bundlePrice: 2697,
    includes: [
      { item: '3x 70" Floor Standing Showcase', description: 'Full-height, maximum visibility' },
      { item: 'Priority Assembly & Installation', description: 'White-glove setup service' },
      { item: 'Extended 3-Year Warranty', description: 'Premium protection plan' },
      { item: 'Freight Shipping Coordinated', description: 'Expedited delivery arranged' },
    ],
    specs: {
      dimensions: '70"W x 18"D x 78"H each',
      lighting: 'RGB LED with app control',
      glass: 'Tempered + laminated option',
      lock: 'Electronic lock upgrade',
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise Bundle',
    tagline: 'Complete store setup for large retailers',
    price: 'Custom Quote',
    originalPrice: null,
    savings: '$1,200+',
    popular: false,
    productId: null,
    variantId: null,
    bundlePrice: null,
    includes: [
      { item: '5+ Custom Display Units', description: 'Tailored to your space' },
      { item: 'White-Glove Installation', description: 'Full setup and positioning' },
      { item: 'Custom Branding Options', description: 'Logo, colors, finishes' },
      { item: 'Dedicated Account Manager', description: 'Single point of contact' },
      { item: 'Net 30 Payment Terms', description: 'Flexible business financing' },
    ],
    specs: {
      dimensions: 'Fully customizable',
      lighting: 'Custom RGB/LED configurations',
      glass: 'Premium options available',
      lock: 'Commercial-grade security',
    },
  },
];

const addOns = [
  {
    id: 'assembly-addon',
    variantId: 'assembly-premium-addon',
    name: 'Professional Assembly',
    description: 'Expert assembly by our certified technicians',
    price: '$149',
    numericPrice: 149,
    originalPrice: '$199',
    features: [
      'Unboxing and inspection',
      'Full assembly and setup',
      'Positioning in your space',
      'Debris removal',
    ],
    link: '/assembly-options',
  },
  {
    id: 'lock-addon',
    variantId: 'lock-electronic-addon',
    name: 'Lock Security Upgrade',
    description: 'Upgrade to commercial-grade security',
    price: '$99',
    numericPrice: 99,
    originalPrice: '$149',
    features: [
      'Electronic keypad lock',
      'Master key system',
      'Reinforced hinges',
      'Tamper alerts',
    ],
    link: '/lock-security-upgrade',
  },
  {
    id: 'glass-addon',
    variantId: null,
    name: 'Glass Refill Protection',
    description: 'Replacement glass coverage plan',
    price: 'Coming Soon',
    numericPrice: null,
    originalPrice: null,
    features: [
      'One-time glass replacement',
      'Fast shipping on claims',
      'Professional installation option',
      '5-year coverage term',
    ],
    link: '/glass-refills',
    disabled: true,
  },
];

export default async function BulkBundlesPage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen">
      <BundleSection bundles={bundles} addOns={addOns} featuredProducts={featuredProducts} />
    </main>
  );
}