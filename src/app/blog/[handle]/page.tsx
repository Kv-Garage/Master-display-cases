import { getBlogPost, getBlogPosts } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.handle);

  if (!post) {
    return {
      title: 'Article Not Found | Master Display Cases',
    };
  }

  return {
    title: `${post.title} | Master Display Cases`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.featuredImage ? [post.featuredImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const data = await getBlogPosts();
    const articles = data?.edges || [];
    return articles.map((article: { handle: string }) => ({
      handle: article.handle,
    }));
  } catch {
    return [];
  }
}

// Sample full content for demo posts
const sampleContent: Record<string, string> = {
  'best-display-cases-smoke-shops-2024': `
    <h2>Why Display Cases Matter for Smoke Shops</h2>
    <p>Smoke shops face unique challenges when it comes to product display. You need to showcase often small, high-value items while maintaining security and complying with regulations. The right display case solution can make all the difference.</p>
    
    <h2>Key Features to Look For</h2>
    <h3>1. Security Features</h3>
    <p>Look for cases with integrated locking systems, tempered glass, and optional alarm integration. Your display should protect inventory without sacrificing visibility.</p>
    
    <h3>2. Proper Lighting</h3>
    <p>LED lighting is essential for showcasing products. Consider cases with adjustable lighting to highlight different product categories.</p>
    
    <h3>3. Flexible Shelving</h3>
    <p>Adjustable shelves allow you to accommodate products of various sizes, from small vape cartridges to larger hookahs.</p>
    
    <h2>Top Recommendations for 2024</h2>
    <p>Based on our experience working with hundreds of smoke shop owners, we recommend floor-standing display cases with RGB lighting for maximum visual impact. Countertop cases work well for high-margin impulse items near the register.</p>
    
    <h2>Conclusion</h2>
    <p>Investing in quality display cases is one of the highest-ROI improvements you can make to your smoke shop. Contact our team for personalized recommendations.</p>
  `,
  'increase-retail-sales-better-displays': `
    <h2>The Science Behind Display-Driven Sales</h2>
    <p>Research consistently shows that product presentation directly impacts purchasing decisions. In this article, we break down the data behind display case effectiveness.</p>
    
    <h2>Key Findings</h2>
    <ul>
      <li>Products in well-lit display cases see up to 34% higher perceived value</li>
      <li>Strategic placement near checkout increases impulse purchases by 23%</li>
      <li>Professional displays increase customer trust and time spent in store</li>
    </ul>
    
    <h2>Implementation Strategies</h2>
    <p>The key is to think of your display cases as active sales tools, not passive furniture. Position them to guide customer flow and highlight your highest-margin products.</p>
  `,
  'display-case-buying-guide': `
    <h2>Complete Buying Guide for Commercial Display Cases</h2>
    <p>Choosing the right display case for your retail environment requires careful consideration of several factors. This guide covers everything you need to know.</p>
    
    <h2>Sizing Considerations</h2>
    <p>Measure your available space carefully. Consider both the footprint of the case and the space needed for doors to open fully. Leave at least 36 inches of clearance for customer viewing.</p>
    
    <h2>Lighting Options</h2>
    <p>LED lighting is the standard for modern display cases. RGB options allow you to change colors for seasonal promotions or to match your brand.</p>
    
    <h2>Security Features</h2>
    <p>Tempered glass, quality locks, and optional alarm integration protect your inventory. Consider your loss prevention needs when selecting features.</p>
    
    <h2>Budget Planning</h2>
    <p>Quality commercial display cases range from $600 to $3,000+ depending on size and features. Factor in freight shipping costs ($349-$459) and potential assembly services.</p>
  `,
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  // Try to fetch from Shopify, fall back to sample data
  let post = await getBlogPost(resolvedParams.handle);
  
  // If no post found from Shopify, check if it is a sample post
  if (!post) {
    const samplePosts = [
      {
        id: '1',
        title: 'Best Display Cases for Smoke Shops in 2024',
        handle: 'best-display-cases-smoke-shops-2024',
        excerpt:
          'Discover the top display case solutions for smoke shops. Learn about security features, lighting options, and how to maximize product visibility while protecting inventory.',
        content: sampleContent['best-display-cases-smoke-shops-2024'] || 'Content not available.',
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
        content: sampleContent['increase-retail-sales-better-displays'] || 'Content not available.',
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
        content: sampleContent['display-case-buying-guide'] || 'Content not available.',
        author: { name: 'Master Display Cases' },
        publishedAt: '2024-01-05',
        featuredImage: {
          url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
          altText: 'Display case buying guide',
        },
        tags: ['Buying Guide', 'Commercial', 'Tips'],
      },
    ];
    
    post = samplePosts.find(p => p.handle === resolvedParams.handle) || null;
  }

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-black">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <section className="container-custom pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="heading-lg mb-6">{post.title}</h1>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
            <span>{post.author.name}</span>
            <span>•</span>
            <span>{publishedDate}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>

          {post.featuredImage && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 mb-12">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.altText || post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Box */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">MD</span>
              </div>
              <div>
                <p className="font-medium text-black">Master Display Cases</p>
                <p className="text-sm text-gray-500">
                  Premium commercial display systems for retail stores
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-md mb-4">
              Ready to Upgrade Your Display Cases?
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our commercial-grade display systems designed to increase
              your store revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/collections/display-cases">View Products</Button>
              <Button href="/contact" variant="outline">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}