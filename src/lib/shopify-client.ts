const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

export async function shopifyFetch(query: string, variables = {}) {
  try {
    const res = await fetch(
      `https://${domain}/api/2026-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    const json = await res.json();

    if (json.errors) {
      console.error("Shopify API Error:", json.errors);
      return null; // DO NOT THROW
    }

    return json.data || null;
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }
}

export async function testConnection() {
  return shopifyFetch(`
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
}