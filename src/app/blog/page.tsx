import { getBlogPosts } from '@/lib/shopify';
import { BlogPost } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Retail Display Tips & Industry Insights | Master Display Cases',
  description:
    'Expert advice on retail display cases, store layout optimization, and maximizing sales through better product presentation. From Grand Rapids, Michigan.',
};

// Sample blog posts for demo (would come from Shopify in production)
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Best Display Cases for Smoke Shops in 2024',
    handle: 'best-display-cases-smoke-shops-2024',
    excerpt:
      'Discover the top display case solutions for smoke shops. Learn about security features, lighting options, and how to maximize product visibility while protecting inventory.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2024-01-15',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      altText: 'Smoke shop display case',
    },
    tags: ['Smoke Shop', 'Security', 'Display Cases'],
  },
  {
    id: '2',
    title: 'How to Increase Retail Sales with Better Displays',
    handle: 'increase-retail-sales-better-displays',
    excerpt:
      'Learn how strategic display case placement and lighting can increase your average transaction value by up to 34%. Real data from retail stores that upgraded their displays.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2024-01-10',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      altText: 'Retail store display',
    },
    tags: ['Retail Tips', 'Sales', 'Store Layout'],
  },
  {
    id: '3',
    title: 'Display Case Buying Guide: Everything You Need to Know',
    handle: 'display-case-buying-guide',
    excerpt:
      'A comprehensive guide to choosing the right display case for your store. Covers sizing, lighting, security, and budget considerations for commercial retail environments.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2024-01-05',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      altText: 'Display case buying guide',
    },
    tags: ['Buying Guide', 'Commercial', 'Tips'],
  },
  {
    id: '4',
    title: 'Retail Store Layout Optimization: A Data-Driven Approach',
    handle: 'retail-store-layout-optimization',
    excerpt:
      'Optimize your store layout to maximize foot traffic and sales. Learn about the decompression zone, power walls, and strategic display placement.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2023-12-28',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
      altText: 'Store layout optimization',
    },
    tags: ['Store Layout', 'Optimization', 'Retail Design'],
  },
  {
    id: '5',
    title: 'LED vs RGB Lighting for Display Cases: Which is Right for You?',
    handle: 'led-vs-rgb-lighting-display-cases',
    excerpt:
      'Compare LED and RGB lighting options for your display cases. Understand the benefits of each, cost considerations, and which products benefit most from each type.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2023-12-20',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      altText: 'LED lighting display',
    },
    tags: ['Lighting', 'LED', 'RGB', 'Technical'],
  },
  {
    id: '6',
    title: 'Security Best Practices for Retail Display Cases',
    handle: 'security-best-practices-retail-display',
    excerpt:
      'Protect your valuable inventory with these security best practices. Learn about locking mechanisms, glass types, and alarm integration for display cases.',
    content: 'Full article content...',
    author: { name: 'Master Display Cases' },
    publishedAt: '2023-12-15',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      altText: 'Secure display case',
    },
    tags: ['Security', 'Loss Prevention', 'Commercial'],
  },
];

export default async function BlogPage() {
  // Try to fetch from Shopify, fall back to sample data
  let posts = samplePosts;
  try {
    const articles = await getBlogPosts();
    if (articles && articles.length > 0) {
      // Transform Shopify articles to BlogPost format
      posts = articles.map((edge: { node: any }) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        excerpt: edge.node.excerpt || '',
        content: 'Full article content...',
        author: edge.node.author || { name: 'Master Display Cases' },
        publishedAt: edge.node.publishedAt,
        featuredImage: edge.node.featuredImage ? {
          url: edge.node.featuredImage.url,
          altText: edge.node.featuredImage.altText,
        } : undefined,
        tags: edge.node.tags || [],
      }));
    }
  } catch {
    // Use sample posts
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Insights & Tips
            </span>
            <h1 className="heading-lg mt-4 mb-6">
              Retail Display Blog
            </h1>
            <p className="body-lg text-gray-600">
              Expert advice on display cases, store layout, and maximizing sales
              through better product presentation. From our team in Grand Rapids,
              Michigan.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {posts.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <Link
              href={`/blog/${posts[0].handle}`}
              className="group block"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  {posts[0].featuredImage && (
                    <Image
                      src={posts[0].featuredImage.url}
                      alt={posts[0].featuredImage.altText || posts[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Featured
                  </span>
                  <h2 className="heading-md group-hover:text-gray-600 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{posts[0].author.name}</span>
                    <span>•</span>
                    <span>
                      {new Date(posts[0].publishedAt).toLocaleDateString(
                        'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read Article
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-md mb-8">Latest Articles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.handle}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.featuredImage.altText || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="heading-sm group-hover:text-gray-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="text-xs text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-black text-white section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-md mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-8">
              Get the latest retail display tips and industry insights delivered
              to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}