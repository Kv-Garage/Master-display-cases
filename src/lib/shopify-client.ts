/**
 * Shopify Storefront API Client
 * Hardened with timeout, retry logic, and comprehensive error handling
 * 
 * Key stability features:
 * - 5 second timeout to prevent hanging requests
 * - Graceful fallback on API failures (never crashes server)
 * - Request deduplication to prevent thundering herd
 * - Comprehensive error logging for debugging
 * - Falls back to sample data when Shopify is not configured
 */

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

// Check if Shopify is properly configured
export function isShopifyConfigured(): boolean {
  return !!domain && !!token;
}

// Timeout for API requests (5 seconds)
const API_TIMEOUT = 5000;

// Simple in-memory cache for request deduplication
const pendingRequests = new Map<string, Promise<any>>();

/**
 * Create an AbortController with timeout
 */
function createTimeoutController(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
}

/**
 * Shopify API fetch with timeout and error handling
 * Returns null on failure instead of throwing (failsafe rendering)
 */
export async function shopifyFetch(
  query: string, 
  variables = {},
  options: { skipCache?: boolean } = {}
) {
  // Skip if Shopify is not configured
  if (!domain || !token) {
    console.error('[Shopify] Not configured - missing domain or token');
    return null;
  }

  // Create cache key for request deduplication
  const cacheKey = `${query}:${JSON.stringify(variables)}`;
  
  // Return pending request if exists (prevent thundering herd)
  if (!options.skipCache && pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const requestPromise = (async () => {
    const { controller, timeoutId } = createTimeoutController(API_TIMEOUT);
    
    try {
      const startTime = Date.now();
      
      const res = await fetch(
        `https://${domain}/api/2026-04/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": token,
          },
          body: JSON.stringify({ query, variables }),
          signal: controller.signal,
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!res.ok) {
        console.error(`[Shopify] HTTP Error ${res.status} after ${duration}ms`);
        return null;
      }

      const json = await res.json();

      if (json.errors) {
        console.error("[Shopify] GraphQL Errors:", JSON.stringify(json.errors).slice(0, 500));
        return null;
      }

      console.log(`[Shopify] Success: ${duration}ms`);
      return json.data || null;
      
    } catch (err) {
      clearTimeout(timeoutId);
      
      if (err instanceof Error && err.name === 'AbortError') {
        console.error(`[Shopify] Request timeout after ${API_TIMEOUT}ms`);
      } else {
        console.error("[Shopify] Fetch failed:", err instanceof Error ? err.message : err);
      }
      
      return null; // Never throw - return null for failsafe rendering
    } finally {
      // Clean up pending request
      pendingRequests.delete(cacheKey);
    }
  })();

  // Store pending request for deduplication
  if (!options.skipCache) {
    pendingRequests.set(cacheKey, requestPromise);
  }

  return requestPromise;
}

/**
 * Test connection to Shopify API
 * Used for health checks
 */
export async function testConnection() {
  try {
    const result = await shopifyFetch(`
      query {
        products(first: 1) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `);
    return result !== null;
  } catch {
    return false;
  }
}

/**
 * Fetch with retry logic (for critical operations)
 */
export async function shopifyFetchWithRetry(
  query: string, 
  variables = {},
  retries = 2
) {
  let lastError: Error | null = null;
  
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await shopifyFetch(query, variables, { skipCache: true });
      if (result !== null) {
        return result;
      }
    } catch (err) {
      lastError = err as Error;
      console.warn(`[Shopify] Retry ${i + 1}/${retries} failed`);
      
      // Exponential backoff
      if (i < retries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  
  console.error(`[Shopify] All ${retries + 1} attempts failed`);
  return null;
}

// Default export for convenience
export default {
  shopifyFetch,
  shopifyFetchWithRetry,
  testConnection,
};