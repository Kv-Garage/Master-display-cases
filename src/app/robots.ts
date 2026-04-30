import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Block Shopify admin and checkout paths if they're somehow indexed
        disallow: [
          '/admin',
          '/cart',
          '/checkout',
          '/account',
        ],
      },
    ],
    sitemap: 'https://masterdisplaycases.com/sitemap.xml',
  };
}