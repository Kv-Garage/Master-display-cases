import { getBlogPosts } from '@/lib/shopify';
import { blogPosts as fallbackPosts } from '@/data/blog-posts';
import BlogListing from '@/components/blog/BlogListing';
import { Metadata } from 'next';

// Static metadata for SEO
export const metadata: Metadata = {
  title: 'Blog | Retail Display Insights & ROI Strategies | Master Display Cases',
  description:
    'Expert insights on retail display strategies, visual merchandising, and maximizing ROI with professional display cases. Learn how to increase store revenue.',
  openGraph: {
    title: 'Retail Display Blog | Master Display Cases',
    description: 'Expert insights on retail display strategies, visual merchandising, and maximizing ROI with professional display cases.',
    type: 'website',
  },
};

const categories = [
  'All',
  'ROI Strategy',
  'Lighting',
  'Industry Insights',
  'Visual Merchandising',
  'Shipping & Logistics',
];

export default async function BlogPage() {
  // Fetch from Shopify first (no arguments needed)
  const shopifyPosts = await getBlogPosts();
  const localPosts = fallbackPosts || [];
  
  // Merge: local posts first, then Shopify posts
  const posts = [...localPosts, ...shopifyPosts];

  return (
    <div className="bg-white">
      <BlogListing posts={posts} categories={categories} />
    </div>
  );
}
