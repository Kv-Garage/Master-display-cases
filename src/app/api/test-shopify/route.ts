import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';
import { testConnection } from '@/lib/shopify-client';

export async function GET() {
  try {
    // Test basic connection
    const startTime = Date.now();
    const connectionData = await testConnection();
    const connectionDuration = Date.now() - startTime;

    // Get products using the main function
    const products = await getProducts();

    return NextResponse.json({
      success: true,
      message: 'Shopify API connection successful',
      connectionTest: {
        duration: `${connectionDuration}ms`,
        hasData: !!connectionData,
      },
      products: {
        count: products?.length || 0,
        data: products || [],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Shopify API Test Failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Shopify API connection failed',
        error: error.message || String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}