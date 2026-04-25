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

// Fixed shopifyFetch function - endpoint built inside function
export async function shopifyFetch(query: string, variables = {}) {
  // STEP 1: Fix endpoint - must be exact format
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      // STEP 2: Fix headers - exact format
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
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

// STEP 4: Get products - fixed query with no variables
export async function getProducts(first: number = 10) {
  const query = `{
    products(first: ${first}) {
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
  }`;

  const result = await shopifyFetch(query);

  // Transform Storefront API response to match our Product type
  if (result && result.products && result.products.edges) {
    return result.products.edges.map((edge: any) => {
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

// Get single product - fixed query with no variables
export async function getProduct(handle: string) {
  const query = `{
    product(handle: "${handle}") {
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

// Get single collection by handle - fixed query with no variables
export async function getCollection(handle: string) {
  const query = `{
    collection(handle: "${handle}") {
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
  }`;

  const result = await shopifyFetch(query);

  if (result && result.collection) {
    const collection = result.collection;
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

// Get collections - fixed query with no variables
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

// Get collection products - fixed query with no variables
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
  }`;

  const result = await shopifyFetch(query);

  if (result && result.collection && result.collection.products) {
    return result.collection.products.edges.map((edge: any) => {
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
  return `https://${domain}/cart/${variantId}:${quantity}`;
}

// Create draft order (simplified - in production you'd use Admin API)
export async function createDraftOrder(lineItems: any[], email: string) {
  console.log('Creating draft order for:', email, 'with items:', lineItems);

  return {
    id: `draft-${Date.now()}`,
    name: `#${Math.floor(Math.random() * 10000)}`,
    email: email,
    createdAt: new Date().toISOString(),
  };
}

// Get blog post by handle - fixed query with no variables
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

// Get blog posts - fixed query with no variables
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