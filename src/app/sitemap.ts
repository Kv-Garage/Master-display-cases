import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://masterdisplaycases.com';

  // Core pages with highest priority
  const corePages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/collections/rgb-displays', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/wholesale', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/buying-guide', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  // Solution pages
  const solutionPages = [
    { path: '/solutions/smoke-shops', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions/boutiques', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/solutions/electronics', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  // Collection pages
  const collectionPages = [
    { path: '/collections/counter-displays', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/collections/floor-displays', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/collections/retail-displays', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/collections/smoke-shop-displays', priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  // Product pages
  const productPages = [
    { path: '/products/led-retail-display-showcase', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  // Blog pages
  const blogPages = [
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
  ];

  // Policy pages (lower priority)
  const policyPages = [
    { path: '/policies/privacy', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/policies/terms', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/policies/refunds', priority: 0.3, changeFrequency: 'monthly' as const },
    { path: '/policies/shipping', priority: 0.3, changeFrequency: 'monthly' as const },
  ];

  const allPages = [
    ...corePages,
    ...solutionPages,
    ...collectionPages,
    ...productPages,
    ...blogPages,
    ...policyPages,
  ];

  return allPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}