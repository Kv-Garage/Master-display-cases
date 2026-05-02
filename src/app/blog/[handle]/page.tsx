import { getBlogPost, getBlogPosts } from '@/lib/shopify';
import { getBlogPostByHandle, getRelatedPosts, blogPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { Metadata } from 'next';
import { processProductLinks } from '@/lib/shopify-urls';

interface BlogPostPageProps {
  params: Promise<{ handle: string }>;
}

// Generate static params for all blog posts (fallback for SEO)
export async function generateStaticParams() {
  // Use hardcoded posts for static generation (fallback)
  return blogPosts.map((post) => ({
    handle: post.handle,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Try Shopify first, then fallback to hardcoded data
  let post: any = await getBlogPost(resolvedParams.handle);
  if (!post) {
    const fallback = getBlogPostByHandle(resolvedParams.handle);
    if (fallback) {
      // Add missing fields from local post
      post = {
        ...fallback,
        source: 'local'
      };
    }
  }

  if (!post) {
    return {
      title: 'Article Not Found | Master Display Cases',
    };
  }

  return {
    title: `${post.metaTitle || post.title}`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// JSON-LD structured data for SEO
function generateStructuredData(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Master Display Cases',
      logo: {
        '@type': 'ImageObject',
        url: '/Master-display-cases-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://masterdisplaycases.com${post.href}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  
  // Try Shopify first, then fallback to hardcoded data
  let post: any = await getBlogPost(resolvedParams.handle);
  if (!post) {
    const fallback = getBlogPostByHandle(resolvedParams.handle);
    if (fallback) {
      // Add missing fields from local post
      post = {
        ...fallback,
        source: 'local'
      };
    }
  }

  if (!post) {
    notFound();
  }

  // Get related posts (merge Shopify + local)
  let relatedPosts: any[] = [];
  try {
    const shopifyPosts = await getBlogPosts();
    const localPosts = getRelatedPosts(post.handle, 3);
    const allPosts = [...localPosts, ...(shopifyPosts || [])];
    relatedPosts = allPosts
      .filter((p: any) => p.handle !== post.handle && p.category === post.category)
      .slice(0, 3);
  } catch {
    relatedPosts = getRelatedPosts(post.handle, 3);
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const structuredData = generateStructuredData(post);

  return (
    <div className="bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-black transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <section className="container-custom pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs bg-black text-white px-3 py-1 uppercase tracking-wider font-semibold">
              {post.category}
            </span>
            {post.tags.slice(1).map((tag: string) => (
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
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">MD</span>
              </div>
              <span className="font-medium text-black">{post.author}</span>
            </div>
            <span>•</span>
            <span>{publishedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100 mb-12 shadow-lg">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none"
            style={{ maxWidth: '800px', margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: processProductLinks(post.content) }}
          />

          {/* Author Box */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">MD</span>
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

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-md mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={relatedPost.href}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        fill
                        sizes="33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-black bg-gray-100 px-2 py-1 rounded">
                        {relatedPost.category}
                      </span>
                      <h3 className="heading-sm mt-3 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500">{relatedPost.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-black text-white section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">
              Ready to Upgrade Your Display Cases?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Explore our commercial-grade display systems designed to increase
              your store revenue with premium LED lighting and robust security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.COLLECTION} className="bg-white text-black hover:bg-gray-200">
                View Products
              </Button>
              <Button href={ROUTES.CONTACT} variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}