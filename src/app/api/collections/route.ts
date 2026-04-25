import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/shopify';

// Cache collections for 1 hour to reduce API calls
export const revalidate = 3600;

export async function GET() {
  try {
    const collections = await getCollections(20);
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    // Return default collections if API fails
    return NextResponse.json([
      { id: '1', title: 'Display Cases', handle: 'display-cases', description: '', productsCount: 0, updatedAt: '', image: undefined },
      { id: '2', title: 'Store Packages', handle: 'store-packages', description: '', productsCount: 0, updatedAt: '', image: undefined },
      { id: '3', title: 'Countertop', handle: 'countertop', description: '', productsCount: 0, updatedAt: '', image: undefined },
      { id: '4', title: 'Floor Standing', handle: 'floor-standing', description: '', productsCount: 0, updatedAt: '', image: undefined },
    ]);
  }
}