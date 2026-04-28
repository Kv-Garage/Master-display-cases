import { blogPosts } from '@/data/blog-posts';
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

export default function BlogPage() {
  return (
    <div className="bg-white">
      <BlogListing posts={blogPosts} categories={categories} />
    </div>
  );
}