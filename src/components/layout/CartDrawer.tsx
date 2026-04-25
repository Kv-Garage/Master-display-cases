'use client';

import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    checkoutUrl,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            Your Quote Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
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
              <p className="text-gray-500">Your quote cart is empty</p>
              <Link
                href="/"
                className="text-black font-medium mt-2 inline-block hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  {item.image && (
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                      <Image
                        src={item.image.url}
                        alt={item.image.altText || item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.variantTitle}</p>
                    <p className="text-sm font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Total:</span>
              <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-gray-500">
              Shipping costs calculated at checkout. Freight shipping available.
            </p>
            <a
              href={checkoutUrl}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </a>
            <Link
              href="/contact"
              className="btn-secondary w-full text-center block"
              onClick={() => setIsOpen(false)}
            >
              Request Custom Quote
            </Link>
          </div>
        )}
      </div>
    </>
  );
}