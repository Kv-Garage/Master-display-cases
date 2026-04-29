'use client';

import { useState, useEffect } from 'react';
import { buildCheckoutUrl, addToCart, getCartWithDetails, getCart, buyNow, convertToNumericId, CartItemWithDetails } from '@/lib/cart-utils';

export default function TestCheckoutPage() {
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [result, setResult] = useState('');
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Only run on client side to avoid localStorage issues during SSR
  useEffect(() => {
    setIsClient(true);
    setCartItems(getCartWithDetails());
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleRefreshCart = () => {
    setCartItems(getCartWithDetails());
  };

  const handleTestCheckoutUrl = () => {
    if (!variantId) {
      setResult('Please enter a variant ID');
      return;
    }

    try {
      const numericId = convertToNumericId(variantId);
      // Use the correct Shopify domain from environment
      const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'mraze2-ra.myshopify.com';
      const url = `https://${shopifyDomain}/cart/${numericId}:${quantity}`;
      setResult(`Checkout URL: ${url}`);
      console.log('[Test Checkout] Generated URL:', url);
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleAddToCart = () => {
    if (!variantId) {
      setResult('Please enter a variant ID');
      return;
    }

    try {
      addToCart(variantId, parseInt(quantity));
      setCartItems(getCart());
      setResult('Item added to cart! Check localStorage or refresh cart.');
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleGoToCheckout = () => {
    const url = buildCheckoutUrl();
    if (url) {
      setResult(`Redirecting to: ${url}`);
      window.location.href = url;
    } else {
      setResult('Cart is empty. Add items first.');
    }
  };

  const handleBuyNow = () => {
    if (!variantId) {
      setResult('Please enter a variant ID');
      return;
    }

    try {
      buyNow(variantId, parseInt(quantity));
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_details');
    setCartItems([]);
    setResult('Cart cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopify Cart URL Test Page</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Cart Functions</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Variant ID (numeric or GID format)
                </label>
                <input
                  type="text"
                  value={variantId}
                  onChange={(e) => setVariantId(e.target.value)}
                  placeholder="e.g., 12345 or gid://shopify/ProductVariant/12345"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleTestCheckoutUrl}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  1. Generate Checkout URL
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  2. Add to Cart
                </button>

                <button
                  onClick={handleGoToCheckout}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  3. Go to Checkout (All Items)
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  4. Buy Now (Direct Checkout)
                </button>

                <button
                  onClick={handleClearCart}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Results & Cart Status */}
          <div className="space-y-6">
            {/* Result Display */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              <div className="bg-gray-100 p-4 rounded font-mono text-sm break-all">
                {result || 'Click a button to test...'}
              </div>
            </div>

            {/* Cart Status */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Cart Status</h2>
                <button
                  onClick={handleRefreshCart}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Refresh
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-500">Cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.variantId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Variant ID: {item.variantId}</p>
                        <p className="text-sm text-gray-600">
                          {item.title || 'No title'} - Qty: {item.quantity}
                        </p>
                      </div>
                      {item.price && (
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Total Items:</strong> {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
              <h3 className="font-semibold mb-2">Testing Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Create a test product in Shopify Admin</li>
                <li>Get the numeric variant ID from the product URL</li>
                <li>Enter the variant ID above</li>
                <li>Click "Generate Checkout URL" to see the URL</li>
                <li>Click "Add to Cart" to add the item</li>
                <li>Click "Go to Checkout" to test full cart checkout</li>
                <li>Or click "Buy Now" to test direct checkout</li>
              </ol>
            </div>
          </div>
        </div>

        {/* localStorage Debug */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">localStorage Debug</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">cart:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                {localStorage.getItem('cart') || 'null'}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">cart_details:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                {localStorage.getItem('cart_details') || 'null'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}