'use client';

import { useCart } from '@/lib/cart-context';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Suspense } from 'react';

function CartContent() {
  const { items, totalPrice, removeItem, updateQuantity, goToCheckout } = useCart();

  const shippingNote = "Shipping calculated at checkout";

  // Handle checkout redirect - use the goToCheckout function from cart context
  const handleCheckout = async () => {
    if (items.length > 0) {
      await goToCheckout();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Cart</span>
          </nav>
          <h1 className="heading-xl">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="heading-md mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Add an RGB Display Case to get started.
            </p>
            <Button href="/collections/rgb-displays" variant="primary" size="lg">
              Shop RGB Display Cases
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="font-semibold">Cart Items</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.variantId} className="p-6 flex gap-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img src={item.image.url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              {item.variantTitle || 'Standard'}
                            </p>
                          </div>
                          <p className="font-semibold">${(item.price || 0).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(String(item.variantId), Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(String(item.variantId), item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(String(item.variantId))}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h2 className="font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-500 italic">{shippingNote}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-500 italic">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}+</span>
                  </div>
                </div>

                {/* Primary CTA: Proceed to Checkout */}
                <button
                  onClick={handleCheckout}
                  className="block w-full bg-black text-white text-center px-6 py-4 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors rounded-none mb-3"
                >
                  Proceed to Checkout
                </button>

                {/* Secondary CTA: Buy Now (express checkout) */}
                <button
                  onClick={handleCheckout}
                  className="block w-full bg-green-600 text-white text-center px-6 py-3 font-semibold uppercase tracking-wide hover:bg-green-700 transition-colors rounded-none mb-4"
                >
                  Buy Now
                </button>

                {/* Tertiary CTA: Continue Shopping */}
                <Link
                  href="/collections/rgb-display-cases"
                  className="block w-full border-2 border-black text-black text-center px-6 py-3 font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition-colors rounded-none text-sm"
                >
                  Continue Shopping
                </Link>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Shipping calculated at checkout. No hidden fees.
                </p>

                {/* ROI Reminder */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-green-800">ROI Reminder</p>
                      <p className="text-xs text-green-700 mt-1">
                        Most stores recover this cost in 30-60 days through increased impulse purchases and higher perceived product value.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Commercial-grade construction</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Built for high-conversion retail</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure encrypted checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    }>
      <CartContent />
    </Suspense>
  );
}