import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/shopify';

// Cache collections for 1 hour to reduce API calls
export const revalidate = 3600;

export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json([]);
  }
}
