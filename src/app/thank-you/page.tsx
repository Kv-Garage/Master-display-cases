'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

// Google Customer Reviews Merchant ID
const GOOGLE_MERCHANT_ID = 5779505021;

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [deliveryCountry, setDeliveryCountry] = useState<string | null>(null);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<string | null>(null);

  useEffect(() => {
    // Check for order parameters from Shopify checkout redirect
    const urlOrderId = searchParams.get('order_id');
    const urlOrderNumber = searchParams.get('order_number');
    const urlEmail = searchParams.get('email');
    const urlCheckoutToken = searchParams.get('checkout_token');
    const urlCountry = searchParams.get('to_country') || searchParams.get('country');
    
    // Also check localStorage for order details stored before checkout
    const storedOrder = localStorage.getItem('last_order');
    
    if (urlOrderId) {
      setOrderId(urlOrderId);
    }
    
    if (urlOrderNumber) {
      setOrderNumber(urlOrderNumber);
    } else if (storedOrder) {
      try {
        const parsed = JSON.parse(storedOrder);
        setOrderNumber(parsed.orderNumber || null);
      } catch {
        // Ignore parse errors
      }
    }
    
    if (urlEmail) {
      setEmail(urlEmail);
    }
    
    // Set delivery country (default to US if not provided)
    if (urlCountry) {
      setDeliveryCountry(urlCountry.toUpperCase());
    } else {
      setDeliveryCountry('US');
    }
    
    // Estimate delivery date (14 days from now for display cases)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 14);
    setEstimatedDeliveryDate(deliveryDate.toISOString().split('T')[0]);
    
    // Clear the stored order after reading
    if (storedOrder) {
      localStorage.removeItem('last_order');
    }
    
    // Log the redirect for debugging
    console.log('🎉 Thank you page loaded', {
      orderId: urlOrderId,
      orderNumber: urlOrderNumber,
      email: urlEmail,
      checkoutToken: urlCheckoutToken,
      storedOrder,
      deliveryCountry: urlCountry,
    });
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="heading-xl mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Your order has been successfully placed. We'll send a confirmation 
            email to {email || 'your email address'} shortly.
          </p>

          {/* Order Details */}
          {(orderId || orderNumber) && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {orderNumber && (
                  <div>
                    <span className="text-gray-500">Order Number</span>
                    <p className="font-medium">#{orderNumber}</p>
                  </div>
                )}
                {orderId && (
                  <div>
                    <span className="text-gray-500">Order ID</span>
                    <p className="font-medium text-xs break-all">{orderId}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* What's Next */}
          <div className="text-left bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>You'll receive an order confirmation email</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Your display case will be processed and shipped within 1-2 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>You'll receive tracking information once your order ships</span>
              </li>
            </ul>
          </div>

          {/* Support Info */}
          <div className="mb-8 text-sm text-gray-600">
            <p>
              Questions about your order? Contact us at{' '}
              <a href="mailto:support@masterdisplaycases.com" className="text-black underline hover:no-underline">
                support@masterdisplaycases.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/collections/rgb-displays" variant="primary" size="lg">
              Continue Shopping
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Support
            </Button>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Free Shipping</div>
            <div>On orders over $500</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">Fast Delivery</div>
            <div>1-2 business days</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700 mb-1">30-Day Returns</div>
            <div>Money back guarantee</div>
          </div>
        </div>
      </div>

      {/* Google Customer Reviews Opt-In Badge Container */}
      <div id="google_survey_badge" className="fixed bottom-4 right-4 z-40"></div>

      {/* Google Customer Reviews Script */}
      {orderId && email && (
        <>
          <script
            src="https://apis.google.com/js/platform.js?onload=renderOptIn"
            async
            defer
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.renderOptIn = function() {
                  window.gapi.load('surveyoptin', function() {
                    window.gapi.surveyoptin.render({
                      "merchant_id": "${GOOGLE_MERCHANT_ID}",
                      "order_id": "${orderId}",
                      "email": "${email}",
                      "delivery_country": "${deliveryCountry || 'US'}",
                      "estimated_delivery_date": "${estimatedDeliveryDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}"
                    });
                  });
                }
              `,
            }}
          />
        </>
      )}
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}