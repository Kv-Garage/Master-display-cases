// Shopify Storefront API Configuration (Headless Storefront)
// Uses NEXT_PUBLIC_ env vars for Storefront API access
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
  throw new Error("Missing Shopify environment variables. Please check .env.local");
}

const domain = SHOPIFY_DOMAIN;
const token = SHOPIFY_TOKEN;

// Storefront API endpoint (different from Admin API)
// Using latest stable version: https://shopify.dev/api/release-schedule
const endpoint = `https://${SHOPIFY_DOMAIN}/api/2026-04/graphql.json`;

export async function shopifyFetch(query: string) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token, // Storefront API header (different from Admin API)
    },
    body: JSON.stringify({ query }),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Shopify Storefront API error: ${res.status}`);
  }

  return JSON.parse(text);
}

// Test function to verify connection
export async function testShopifyConnection() {
  return shopifyFetch(`
    {
      shop {
        name
      }
    }
  `);
}

// Get products with full data using Storefront API
export async function getProducts(first: number = 20) {
  const result = await shopifyFetch(`
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
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
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  sku
                  availableForSale
                  quantityAvailable
                  optionValues {
                    name
                    value
                  }
                }
              }
            }
            vendor
            productType
            tags
            options(first: 3) {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `);
  
  // Transform Storefront API response to match our Product type
  if (result.data && result.data.products && result.data.products.edges) {
    return result.data.products.edges.map((edge: any) => {
      const product = edge.node;
      const firstVariant = product.variants.edges[0]?.node;
      
      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || '',
        descriptionHtml: product.descriptionHtml || '',
        price: firstVariant ? parseFloat(firstVariant.price.amount) : 0,
        compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : undefined,
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
          compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice.amount) : undefined,
          availableForSale: edge.node.availableForSale,
          sku: edge.node.sku || '',
          inventoryQuantity: edge.node.quantityAvailable || 0,
          optionValues: edge.node.optionValues.map((ov: any) => ({
            name: ov.name,
            value: ov.value,
          })),
          image: undefined,
        })),
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags || [],
        availableForSale: firstVariant?.availableForSale ?? false,
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: product.updatedAt || new Date().toISOString(),
        publishedAt: product.publishedAt || new Date().toISOString(),
        options: product.options.map((opt: any) => ({
          id: opt.id,
          name: opt.name,
          values: opt.values,
        })),
      };
    });
  }
  
  return [];
}

// Get single product
export async function getProduct(handle: string) {
  const result = await shopifyFetch(`
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
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
              compareAtPrice {
                amount
                currencyCode
              }
              sku
              availableForSale
              quantityAvailable
              optionValues {
                name
                value
              }
            }
          }
        }
        vendor
        productType
        tags
        options(first: 3) {
          id
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `);
  
  if (result.data && result.data.product) {
    const product = result.data.product;
    const firstVariant = product.variants.edges[0]?.node;
    
    return {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description || '',
      descriptionHtml: product.descriptionHtml || '',
      price: firstVariant ? parseFloat(firstVariant.price.amount) : 0,
      compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : undefined,
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
        compareAtPrice: edge.node.compareAtPrice ? parseFloat(edge.node.compareAtPrice.amount) : undefined,
        availableForSale: edge.node.availableForSale,
        sku: edge.node.sku || '',
        inventoryQuantity: edge.node.quantityAvailable || 0,
        optionValues: edge.node.optionValues.map((ov: any) => ({
          name: ov.name,
          value: ov.value,
        })),
        image: undefined,
      })),
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags || [],
      availableForSale: firstVariant?.availableForSale ?? false,
      createdAt: product.createdAt || new Date().toISOString(),
      updatedAt: product.updatedAt || new Date().toISOString(),
      publishedAt: product.publishedAt || new Date().toISOString(),
      options: product.options.map((opt: any) => ({
        id: opt.id,
        name: opt.name,
        values: opt.values,
      })),
    };
  }
  
  return null;
}

// Get single collection by handle
export async function getCollection(handle: string) {
  const result = await shopifyFetch(`
    query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        productsCount
        image {
          url
          altText
          id
        }
      }
    }
  `);
  
  if (result.data && result.data.collection) {
    const collection = result.data.collection;
    return {
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description || '',
      descriptionHtml: collection.descriptionHtml || '',
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
export async function getCollections(first: number = 20) {
  const result = await shopifyFetch(`
    query GetCollections($first: Int!) {
      collections(first: $first) {
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
            }
          }
        }
      }
    }
  `);
  
  if (result.data && result.data.collections && result.data.collections.edges) {
    return result.data.collections.edges.map((edge: any) => {
      const collection = edge.node;
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
        description: collection.description,
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
  const result = await shopifyFetch(`
    query GetCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
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
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              vendor
              productType
              tags
              options(first: 3) {
                id
                name
                values
              }
            }
          }
        }
      }
    }
  `);
  
  if (result.data && result.data.collection && result.data.collection.products) {
    return result.data.collection.products.edges.map((edge: any) => {
      const product = edge.node;
      const firstVariant = product.variants.edges[0]?.node;
      
      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || '',
        descriptionHtml: product.descriptionHtml || '',
        price: firstVariant ? parseFloat(firstVariant.price.amount) : 0,
        compareAtPrice: firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : undefined,
        images: product.images.edges.map((img: any) => ({
          id: img.node.id || `img-${Math.random()}`,
          url: img.node.url,
          altText: img.node.altText,
          width: 800,
          height: 800,
        })),
        variants: [],
        vendor: product.vendor,
        productType: product.productType,
        tags: product.tags || [],
        availableForSale: true,
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: product.updatedAt || new Date().toISOString(),
        publishedAt: product.publishedAt || new Date().toISOString(),
        options: product.options ? product.options.map((opt: any) => ({
          id: opt.id,
          name: opt.name,
          values: opt.values,
        })) : [],
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
  return `https://${SHOPIFY_DOMAIN}/cart/${variantId}:${quantity}`;
}

// Create draft order (simplified - in production you'd use Admin API)
export async function createDraftOrder(lineItems: any[], email: string) {
  // This is a simplified implementation
  // In production, you would use Shopify Admin API to create actual draft orders
  console.log('Creating draft order for:', email, 'with items:', lineItems);
  
  // Return a mock response for now
  return {
    id: `draft-${Date.now()}`,
    name: `#${Math.floor(Math.random() * 10000)}`,
    email: email,
    createdAt: new Date().toISOString(),
  };
}

// Get blog post by handle
export async function getBlogPost(handle: string) {
  // Shopify Blog API query
  const result = await shopifyFetch(`
    query GetBlogPost($handle: String!) {
      blogByHandle(handle: "news") {
        articleByHandle(handle: $handle) {
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
    }
  `);
  
  if (result.data && result.data.blogByHandle && result.data.blogByHandle.articleByHandle) {
    const article = result.data.blogByHandle.articleByHandle;
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
  const result = await shopifyFetch(`
    query GetBlogPosts($first: Int!) {
      blogByHandle(handle: "news") {
        articles(first: $first) {
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
    }
  `);
  
  if (result.data && result.data.blogByHandle) {
    return {
      blog: {
        articles: result.data.blogByHandle.articles,
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
