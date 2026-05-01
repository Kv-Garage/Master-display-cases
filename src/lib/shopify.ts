/**
 * Shopify Storefront API Integration
 * Safe data flow with null handling - never crashes
 */

import { shopifyFetch } from './shopify-client';

/**
 * Check if Shopify API is configured
 */
export function isShopifyConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
}

/**
 * Normalize product data for consistent UI rendering
 */
export function normalizeProduct(product: any) {
  const firstVariant = product.variants?.edges?.[0]?.node;
  const firstImage = product.images?.edges?.[0]?.node;
  const price = parseFloat(firstVariant?.price?.amount || '0');
  
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description || '',
    image: firstImage?.url || '',
    images: (product.images?.edges || []).map(({ node }: any) => ({
      url: node.url,
      altText: node.altText,
    })),
    price: price,
    priceFormatted: formatPrice(price),
    compareAtPrice: firstVariant?.compareAtPrice?.amount ? parseFloat(firstVariant.compareAtPrice.amount) : null,
    currency: firstVariant?.price?.currencyCode || 'USD',
    variantId: firstVariant?.id,
    variants: (product.variants?.edges || []).map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price?.amount || '0'),
      available: node.availableForSale,
    })),
    minPrice: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
    maxPrice: parseFloat(product.priceRange?.maxVariantPrice?.amount || '0'),
    tags: product.tags || [],
    productType: product.productType,
    vendor: product.vendor,
    availableForSale: (product.variants?.edges || []).some(({ node }: any) => node.availableForSale),
  };
}

/**
 * Get products from Shopify (SIMPLIFIED QUERY - safe null handling)
 */
export async function getProducts() {
  const data = await shopifyFetch(`
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node { url }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  if (!data || !data.products) {
    console.error("No product data returned from getProducts()");
    return [];
  }

  return data.products.edges.map((edge: any) => {
    const p = edge.node;
    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      image: p.images?.edges?.[0]?.node?.url || "",
      price: parseFloat(p.variants?.edges?.[0]?.node?.price?.amount || "0"),
      variantId: p.variants?.edges?.[0]?.node?.id,
      variants: (p.variants?.edges || []).map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: parseFloat(v.node.price?.amount || "0"),
        available: v.node.availableForSale,
      })),
      images: (p.images?.edges || []).map((img: any) => ({
        url: img.node.url,
        altText: img.node.altText,
      })),
    };
  });
}

/**
 * Get a single product by handle (SIMPLIFIED QUERY - safe null handling)
 */
export async function getProduct(handle: string) {
  const data = await shopifyFetch(`
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              availableForSale
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
          }
        }
      }
    }
  `, { handle });

  if (!data || !data.product) {
    console.error(`No product data returned for handle: ${handle}`);
    return null;
  }

  return normalizeProduct(data.product);
}

/**
 * Get collections (SIMPLIFIED QUERY - safe null handling)
 */
export async function getCollections() {
  const data = await shopifyFetch(`
    {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `);

  if (!data || !data.collections) {
    console.error("No collections data returned");
    return [];
  }

  return data.collections.edges.map((edge: any) => edge.node);
}

/**
 * Get a single collection by handle
 */
export async function getCollection(handle: string) {
  const data = await shopifyFetch(`
    query ($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
      }
    }
  `, { handle });

  if (!data || !data.collection) {
    console.error(`No collection data returned for handle: ${handle}`);
    return null;
  }

  return data.collection;
}

/**
 * Get blog posts from Shopify (safe - uses blogs/articles query)
 */
export async function getBlogPosts() {
  try {
    const data = await shopifyFetch(`
      query {
        blogs(first: 1) {
          edges {
            node {
              articles(first: 10) {
                edges {
                  node {
                    id
                    title
                    handle
                    excerpt
                    contentHtml
                    publishedAt
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    if (!data || !data.blogs?.edges?.length) {
      console.warn("Shopify blogs not found");
      return [];
    }

    const articles = data.blogs.edges[0]?.node?.articles?.edges || [];

    return articles.map((edge: any) => {
      const a = edge.node;
      return {
        id: a.id,
        title: a.title,
        handle: a.handle,
        href: `/blog/${a.handle}`,
        excerpt: a.excerpt || "",
        content: a.contentHtml || "",
        image: a.image?.url || "",
        imageAlt: a.title,
        publishedAt: a.publishedAt,
        author: 'Master Display Cases Team',
        tags: [],
        category: 'General',
        readTime: `${Math.max(1, Math.ceil((a.contentHtml?.length || 0) / 600))} min read`,
        metaTitle: a.title,
        metaDescription: a.excerpt || "",
        source: "shopify"
      };
    });
  } catch (err) {
    console.error("Failed to fetch Shopify blog posts:", err);
    return [];
  }
}

/**
 * Get a single blog post by handle from Shopify
 */
export async function getBlogPost(handle: string) {
  try {
    const data = await shopifyFetch(`
      query {
        blogs(first: 1) {
          edges {
            node {
              articles(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                    contentHtml
                    image {
                      url
                    }
                    publishedAt
                  }
                }
              }
            }
          }
        }
      }
    `);

    if (!data || !data.blogs?.edges?.length) {
      console.warn("No Shopify blogs found");
      return null;
    }

    const articles = data.blogs.edges[0].node.articles.edges;
    const found = articles.find((a: any) => a.node.handle === handle);

    if (!found) {
      console.warn("Shopify blog post not found:", handle);
      return null;
    }

    const post = found.node;
    return {
      id: post.id,
      title: post.title,
      handle: post.handle,
      href: `/blog/${post.handle}`,
      content: post.contentHtml,
      excerpt: "",
      image: post.image?.url || "",
      imageAlt: post.title,
      publishedAt: post.publishedAt,
      author: 'Master Display Cases Team',
      tags: [],
      category: 'General',
      readTime: `${Math.max(1, Math.ceil((post.contentHtml?.length || 0) / 600))} min read`,
      metaTitle: post.title,
      metaDescription: "",
      source: "shopify"
    };
  } catch (err) {
    console.error("Failed to fetch Shopify blog post:", err);
    return null;
  }
}

/**
 * Get collection products (SIMPLIFIED QUERY - safe null handling)
 */
export async function getCollectionProducts(handle: string) {
  const data = await shopifyFetch(`
    query getCollectionProducts($handle: String!) {
      collection(handle: $handle) {
        products(first: 12) {
          edges {
            node {
              id
              handle
              title
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { handle });

  if (!data || !data.collection || !data.collection.products) {
    console.error(`No collection products returned for handle: ${handle}`);
    return [];
  }

  return data.collection.products.edges.map((edge: any) => {
    const p = edge.node;
    return {
      id: p.id,
      title: p.title,
      handle: p.handle,
      image: p.images?.edges?.[0]?.node?.url || "",
      price: parseFloat(p.variants?.edges?.[0]?.node?.price?.amount || "0"),
      variantId: p.variants?.edges?.[0]?.node?.id,
      variants: (p.variants?.edges || []).map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: parseFloat(v.node.price?.amount || "0"),
        available: v.node.availableForSale,
      })),
    };
  });
}

/**
 * Format price
 */
export function formatPrice(price: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

// Default export for convenience
export default {
  getProducts,
  getProduct,
  getCollections,
  getCollection,
  getCollectionProducts,
  formatPrice,
  normalizeProduct,
  isShopifyConfigured,
};