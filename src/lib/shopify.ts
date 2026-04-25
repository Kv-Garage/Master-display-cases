// Shopify Storefront API Configuration (Headless Storefront)
// STEP 2: Hard validate environment variables
if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error("Missing SHOPIFY DOMAIN");
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error("Missing STOREFRONT TOKEN");
}

console.log("DOMAIN:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log("TOKEN:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.slice(0, 10) + "...");

// STEP 4: Hard rewrite of shopifyFetch
export async function shopifyFetch(query: string, variables = {}) {
  // STEP 3: Fix endpoint - use ONLY this format
  const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();

  console.log("SHOPIFY DEBUG:", JSON.stringify(json, null, 2));

  if (!res.ok || json.errors) {
    throw new Error(json?.errors?.[0]?.message || `HTTP ERROR ${res.status}`);
  }

  return json.data;
}

// STEP 5: Add connection test (CRITICAL)
export async function testShopifyConnection() {
  const data = await shopifyFetch(`{
    shop {
      name
    }
  }`);

  console.log("SHOPIFY CONNECTION SUCCESS:", data);
  return data;
}

// STEP 6: Fix product query (full rewrite)
export async function getProducts() {
  const data = await shopifyFetch(`{
    products(first: 10) {
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
  }`);

  return data.products.edges.map((edge: any) => edge.node);
}

// Get single product
export async function getProduct(handle: string) {
  const data = await shopifyFetch(`{
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
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }`);

  return data.product;
}

// Get single collection by handle
export async function getCollection(handle: string) {
  const data = await shopifyFetch(`{
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
  }`);

  return data.collection;
}

// Get collections
export async function getCollections() {
  const data = await shopifyFetch(`{
    collections(first: 10) {
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
  }`);

  console.log("COLLECTION RESPONSE:", data);
  return data.collections.edges.map((edge: any) => edge.node);
}

// Get collection products
export async function getCollectionProducts({ handle }: { handle: string }) {
  const data = await shopifyFetch(`{
    collection(handle: "${handle}") {
      products(first: 20) {
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
  }`);

  return data.collection.products.edges.map((edge: any) => edge.node);
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
  return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${variantId}:${quantity}`;
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
  const data = await shopifyFetch(`{
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
  }`);

  return data.blogByHandle.articleByHandle;
}

// Get blog posts
export async function getBlogPosts() {
  const data = await shopifyFetch(`{
    blogByHandle(handle: "news") {
      articles(first: 10) {
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
  }`);

  return data.blogByHandle.articles;
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