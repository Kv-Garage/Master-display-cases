'use client';

import { useState, useEffect } from 'react';
import { getCartWithDetails, getCart, addToCart, clearCart } from '@/lib/cart-utils';
import { createCart, addToCart as apiAddToCart } from '@/lib/cart';
import { buyNow } from '@/lib/buy-now';
import { CartItemWithDetails } from '@/lib/cart-utils';

export default function TestCheckoutPage() {
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [result, setResult] = useState('');
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleAddToCart = () => {
    if (!variantId) {
      setResult('Please enter a variant ID (full GID format)');
      return;
    }

    try {
      // Use the updated addToCart that accepts GID format
      addToCart(variantId, parseInt(quantity));
      setCartItems(getCartWithDetails());
      setResult('✅ Item added to local cart!');
    } catch (error) {
      setResult(`❌ Error: ${error}`);
    }
  };

  const handleApiCheckout = async () => {
    const cartItems = getCart();
    if (cartItems.length === 0) {
      setResult('❌ Cart is empty. Add items first.');
      return;
    }

    if (isProcessing) {
      setResult('⏳ Already processing...');
      return;
    }

    try {
      setIsProcessing(true);
      setResult('🛒 Creating Shopify cart via API...');

      // Create a new cart via Shopify API
      const shopifyCart = await createCart();
      setResult(`✅ Cart created: ${shopifyCart.id}\n➕ Adding ${cartItems.length} items...`);

      // Add all items to the cart
      for (const item of cartItems) {
        await apiAddToCart(shopifyCart.id, item.variantId, item.quantity);
      }

      setResult(`✅ All items added!\n🚀 Redirecting to: ${shopifyCart.checkoutUrl}`);
      
      // Clear local cart
      clearCart();
      setCartItems([]);

      // Redirect to Shopify checkout
      setTimeout(() => {
        window.location.href = shopifyCart.checkoutUrl;
      }, 1000);
    } catch (error) {
      setResult(`❌ Checkout failed: ${error}`);
      setIsProcessing(false);
    }
  };

  const handleBuyNow = async () => {
    if (!variantId) {
      setResult('❌ Please enter a variant ID (full GID format)');
      return;
    }

    try {
      setIsProcessing(true);
      setResult('🛒 Creating cart and redirecting to checkout...');
      
      // Use the new buyNow function that uses Shopify Storefront API
      await buyNow(variantId);
    } catch (error) {
      setResult(`❌ Buy Now failed: ${error}`);
      setIsProcessing(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    setResult('🗑️ Cart cleared!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopify Storefront API Checkout Test</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Test Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test New API-Based Checkout</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Variant ID (Full GID format required)
                </label>
                <input
                  type="text"
                  value={variantId}
                  onChange={(e) => setVariantId(e.target.value)}
                  placeholder="gid://shopify/ProductVariant/123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be full GID format, not just numeric ID
                </p>
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
                  onClick={handleAddToCart}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  1. Add to Local Cart
                </button>

                <button
                  onClick={handleApiCheckout}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                >
                  2. Checkout via Shopify API
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={isProcessing}
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
                >
                  3. Buy Now (Direct to Checkout)
                </button>

                <button
                  onClick={handleClearCart}
                  disabled={isProcessing}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
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
              <div className="bg-gray-100 p-4 rounded font-mono text-sm break-all whitespace-pre-wrap">
                {result || 'Click a button to test...'}
              </div>
            </div>

            {/* Cart Status */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Local Cart Status</h2>
                <button
                  onClick={handleRefreshCart}
                  disabled={isProcessing}
                  className="text-sm text-blue-600 hover:underline disabled:opacity-50"
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
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          ID: {item.variantId}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.title || 'No title'} - Qty: {item.quantity}
                        </p>
                      </div>
                      {item.price && (
                        <p className="font-semibold text-sm ml-2">${item.price.toFixed(2)}</p>
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
            <div className="bg-blue-50 border border-blue-200 p-4 rounded">
              <h3 className="font-semibold mb-2">🚀 New System:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Uses Shopify Storefront API for cart management</li>
                <li>No manual URL building - uses checkoutUrl from API</li>
                <li>Variant IDs must be full GID format</li>
                <li>Local cart syncs to Shopify API at checkout</li>
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
                {typeof localStorage !== 'undefined' ? localStorage.getItem('cart') || 'null' : 'N/A'}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">cart_details:</h3>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                {typeof localStorage !== 'undefined' ? localStorage.getItem('cart_details') || 'null' : 'N/A'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}