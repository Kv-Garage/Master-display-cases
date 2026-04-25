import HeroSection from '@/components/sections/HeroSection';
import TrustBar from '@/components/sections/TrustBar';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProductGridSection from '@/components/sections/ProductGridSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import { getProducts, testShopifyConnection } from '@/lib/shopify';

// STEP 5: Call connection test on homepage
async function getHomePageProducts() {
  try {
    await testShopifyConnection();
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error('Shopify connection failed:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getHomePageProducts();

  return (
    <>
      <HeroSection />
      <TrustBar />
      <BenefitsSection />
      <ProductGridSection 
        products={products} 
        showEmptyState={products.length === 0}
      />
      <UseCasesSection />
      <FAQSection />
      <CTASection />
    </>
  );
}