'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedProductAd from '@/components/sections/FeaturedProductAd';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: string;
  href: string;
}

interface BlogListingProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogListing({ posts, categories }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Insights & Strategies
            </span>
            <h1 className="heading-lg mt-4 mb-6">Retail Display Blog</h1>
            <p className="body-lg text-gray-600">
              Expert insights on maximizing retail revenue through professional 
              display strategies, visual merchandising, and data-driven store design.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 py-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredPosts.length > 0 && (
            <>
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <Link href={filteredPosts[0].href} className="block group">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {filteredPosts[0].category}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-black bg-gray-100 px-3 py-1">
                      {filteredPosts[0].category}
                    </span>
                    <span className="text-sm text-gray-500">{filteredPosts[0].readTime}</span>
                  </div>
                  <h2 className="heading-lg">
                    <Link href={filteredPosts[0].href} className="hover:text-gray-600 transition-colors">
                      {filteredPosts[0].title}
                    </Link>
                  </h2>
                  <p className="text-gray-600">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">M</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{filteredPosts[0].author}</p>
                      <p className="text-sm text-gray-500">{filteredPosts[0].publishedAt}</p>
                    </div>
                  </div>
                  <Link
                    href={filteredPosts[0].href}
                    className="inline-flex items-center text-black font-semibold hover:text-gray-600 transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Post Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <article key={post.id} className="group">
                    <Link href={post.href} className="block">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                      <h3 className="heading-sm group-hover:text-gray-600 transition-colors">
                        <Link href={post.href}>{post.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <p>{post.publishedAt}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length <= 1 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No more articles in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product Ad - AFTER FIRST SECTION */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Recommended Display Setup
            </span>
            <h2 className="heading-lg mt-2">48" LED Retail Wrap Counter (RGB)</h2>
            <p className="text-gray-600 mt-3">
              The professional display solution trusted by successful retailers nationwide.
            </p>
          </div>
          <FeaturedProductAd variant="default" />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-4">Get Retail Insights Delivered</h2>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter for the latest strategies on visual merchandising, 
              store design, and maximizing retail ROI.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Product Ad - END OF BLOG */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="heading-lg">Ready to Transform Your Store?</h2>
            <p className="text-gray-600 mt-3 mb-8">
              Apply these retail strategies with professional display cases designed for maximum impact.
            </p>
          </div>
          <FeaturedProductAd variant="compact" />
          <div className="text-center mt-8">
            <Link 
              href="/products/products-48-led-retail-wrap-counter-rgb"
              className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              View Product Details
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}