// Shopify Storefront API Configuration (Headless Storefront)
// Debug: Check environment variables
console.log("DOMAIN:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log("TOKEN:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.slice(0, 10) + "...");

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
  throw new Error("Missing Shopify environment variables. Please check .env.local");
}

const domain = SHOPIFY_DOMAIN;
const token = SHOPIFY_TOKEN;

// Fixed shopifyFetch function - STEP 1 & 2: Fix endpoint and headers
export async function shopifyFetch(query: string, variables = {}) {
  // STEP 1: Fix endpoint - use 2023-10 (NOT 2024-01)
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      // STEP 2: Fix headers - exact format
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();

  console.log("SHOPIFY RESPONSE:", JSON.stringify(json, null, 2));

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "Shopify error");
  }

  return json.data;
}

// Test function to verify connection
export async function testShopifyConnection() {
  return shopifyFetch(`{ shop { name } }`);
}

// STEP 3: Get products - fixed query with proper fields for images and description
export async function getProducts(first: number = 10) {
  // STEP 3: Fixed product query - this fixes images + description
  const query = `{
    products(first: ${first}) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }`;

  const result = await shopifyFetch(query);

  // Transform Storefront API response to match our Product type
  if (result && result.products && result.products.edges) {
    return result.products.edges.map((edge: any) => {
      const product = edge.node;

      // STEP 4: Fix image rendering - use proper fallback
      const image = product.featuredImage?.url || product.images?.edges?.[0]?.node?.url;

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || '',
        price: product.priceRange?.minVariantPrice?.amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
        images: product.images.edges.map((img: any) => ({
          id: img.node.id || `img-${Math.random()}`,
          url: img.node.url,
          altText: img.node.altText,
          width: 800,
          height: 800,
        })),
        vendor: 'Master Display Cases',
        productType: 'Display Case',
        tags: [],
        availableForSale: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        options: [],
        variants: [],
      };
    });
  }

  return [];
}

// Get single product - fixed query with proper fields
export async function getProduct(handle: string) {
  const query = `{
    product(handle: "${handle}") {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            sku
            availableForSale
            quantityAvailable
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }`;

  const result = await shopifyFetch(query);

  if (result && result.product) {
    const product = result.product;
    const firstVariant = product.variants.edges[0]?.node;

    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description || '',
      price: firstVariant ? parseFloat(firstVariant.price.amount) : (product.priceRange?.minVariantPrice?.amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0),
      images: product.images.edges.map((img: any) => ({
        id: img.node.id || `img-${Math.random()}`,
        url: img.node.url,
        altText: img.node.altText,
        width: 800,
        height: 800,
      })),
      variants: product.variants.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        price: parseFloat(edge.node.price.amount),
        availableForSale: edge.node.availableForSale,
        sku: edge.node.sku || '',
        inventoryQuantity: edge.node.quantityAvailable || 0,
        image: undefined,
        optionValues: [],
      })),
      vendor: 'Master Display Cases',
      productType: 'Display Case',
      tags: [],
      availableForSale: firstVariant?.availableForSale ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      options: [],
    };
  }

  return null;
}

// Get single collection by handle
export async function getCollection(handle: string) {
  const query = `{
    collection(handle: "${handle}") {
      id
      title
      handle
      description
      productsCount
      image {
        url
        altText
        id
      }
    }
  }`;

  const result = await shopifyFetch(query);

  if (result && result.collection) {
    const collection = result.collection;
    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description || '',
      productsCount: collection.productsCount,
      image: collection.image ? {
        id: collection.image.id || `col-img-${Math.random()}`,
        url: collection.image.url,
        altText: collection.image.altText,
        width: 800,
        height: 800,
      } : undefined,
      updatedAt: new Date().toISOString(),
    };
  }

  return null;
}

// Get collections
export async function getCollections(first: number = 10) {
  const query = `{
    collections(first: ${first}) {
      edges {
        node {
          id
          title
          handle
          description
          productsCount
          image {
            url
            altText
            id
          }
        }
      }
    }
  }`;

  const result = await shopifyFetch(query);

  console.log("COLLECTION RESPONSE:", result);

  if (result && result.collections && result.collections.edges) {
    return result.collections.edges.map((edge: any) => {
      const collection = edge.node;
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        description: collection.description || '',
        productsCount: collection.productsCount,
        image: collection.image ? {
          id: collection.image.id || `col-img-${Math.random()}`,
          url: collection.image.url,
          altText: collection.image.altText,
          width: 800,
          height: 800,
        } : undefined,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  return [];
}

// Get collection products
export async function getCollectionProducts({ handle, first = 20 }: { handle: string; first?: number }) {
  const query = `{
    collection(handle: "${handle}") {
      products(first: ${first}) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }`;

  const result = await shopifyFetch(query);

  if (result && result.collection && result.collection.products) {
    return result.collection.products.edges.map((edge: any) => {
      const product = edge.node;

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || '',
        price: product.priceRange?.minVariantPrice?.amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0,
        images: product.images.edges.map((img: any) => ({
          id: img.node.id || `img-${Math.random()}`,
          url: img.node.url,
          altText: img.node.altText,
          width: 800,
          height: 800,
        })),
        variants: [],
        vendor: 'Master Display Cases',
        productType: 'Display Case',
        tags: [],
        availableForSale: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        options: [],
      };
    });
  }

  return [];
}

// Get shipping rates (simplified calculator)
export async function getShippingRates(zipCode: string) {
  const baseRate = 149.00;
  const perMileRate = 0.50;
  const estimatedDistance = Math.abs(parseInt(zipCode) - 49500) * 0.5;
  const shippingCost = baseRate + (estimatedDistance * perMileRate);

  return {
    standard: {
      name: 'Standard Freight Shipping',
      price: Math.round(shippingCost),
      estimatedDays: '7-14 business days',
    },
    expedited: {
      name: 'Expedited Freight Shipping',
      price: Math.round(shippingCost * 1.5),
      estimatedDays: '3-5 business days',
    },
  };
}

// Generate checkout URL
export function generateCheckoutUrl(variantId: string, quantity: number = 1) {
  return `https://${domain}/cart/${variantId}:${quantity}`;
}

// Create draft order (simplified)
export async function createDraftOrder(lineItems: any[], email: string) {
  console.log('Creating draft order for:', email, 'with items:', lineItems);

  return {
    id: `draft-${Date.now()}`,
    name: `#${Math.floor(Math.random() * 10000)}`,
    email: email,
    createdAt: new Date().toISOString(),
  };
}

// Get blog post by handle
export async function getBlogPost(handle: string) {
  const query = `{
    blogByHandle(handle: "news") {
      articleByHandle(handle: "${handle}") {
        id
        title
        handle
        excerpt
        content
        publishedAt
        author: authorV2 {
          name
        }
        featuredImage {
          url
          altText
        }
        tags
      }
    }
  }`;

  const result = await shopifyFetch(query);

  if (result && result.blogByHandle && result.blogByHandle.articleByHandle) {
    const article = result.blogByHandle.articleByHandle;
    return {
      id: article.id,
      title: article.title,
      handle: article.handle,
      excerpt: article.excerpt || '',
      content: article.content || '',
      publishedAt: article.publishedAt,
      author: article.author || { name: 'Master Display Cases' },
      featuredImage: article.featuredImage ? {
        url: article.featuredImage.url,
        altText: article.featuredImage.altText,
      } : undefined,
      tags: article.tags || [],
    };
  }

  return null;
}

// Get blog posts
export async function getBlogPosts({ first = 10 }: { first?: number } = {}) {
  const query = `{
    blogByHandle(handle: "news") {
      articles(first: ${first}) {
        edges {
          node {
            id
            title
            handle
            excerpt
            publishedAt
            author: authorV2 {
              name
            }
            featuredImage {
              url
              altText
            }
            tags
          }
        }
      }
    }
  }`;

  const result = await shopifyFetch(query);

  if (result && result.blogByHandle) {
    return {
      blog: {
        articles: result.blogByHandle.articles,
      },
    };
  }

  return null;
}

// Format price helper
export function formatPrice(price: number, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}