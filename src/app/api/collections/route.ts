import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

// Cache products for 1 hour to reduce API calls
export const revalidate = 3600;

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ products: [] });
  }
}
