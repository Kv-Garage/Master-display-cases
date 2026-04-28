'use client';

import { useState, useEffect } from 'react';

interface EmailCapturePopupProps {
  onDismiss?: () => void;
}

export default function EmailCapturePopup({ onDismiss }: EmailCapturePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup
    const hasDismissed = localStorage.getItem('emailPopupDismissed');
    const dismissedAt = hasDismissed ? new Date(hasDismissed) : null;
    
    // Only show if not dismissed in the last 7 days
    if (dismissedAt) {
      const daysSinceDismissal = (Date.now() - dismissedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissal < 7) {
        return;
      }
    }

    // Show popup after 5 seconds or when user shows exit intent
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store in localStorage
    localStorage.setItem('emailPopupDismissed', new Date().toISOString());
    localStorage.setItem('wholesaleEmail', email);

    setIsSubmitted(true);
    setIsLoading(false);

    // Track conversion
    if (typeof window !== 'undefined') {
      // GA4
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_label: 'wholesale_pricing_popup',
          value: 1,
        });
      }
      
      // Meta Pixel
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'wholesale_pricing_popup',
        });
      }
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('emailPopupDismissed', new Date().toISOString());
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleDismiss}
      />
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          // Success State
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="heading-md mb-4">You're on the list!</h3>
            <p className="text-gray-600 mb-6">
              Check your inbox for your wholesale pricing guide. 
              Our sales team will contact you within 24 hours.
            </p>
            <button
              onClick={handleDismiss}
              className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Form State
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="heading-lg mb-4">Get Wholesale Pricing</h2>
              <p className="text-gray-600">
                Join our wholesale program and save up to <strong>25%</strong> on display cases. 
                Perfect for multi-location retailers and store remodels.
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <ul className="space-y-3">
                {[
                  'Volume discounts up to 25%',
                  'Dedicated account manager',
                  'Priority shipping & support',
                  'Net 30 terms available',
                  'Early access to new products',
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-black text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Get Wholesale Pricing'}
              </button>
            </form>

            {/* Trust Note */}
            <p className="text-xs text-gray-500 text-center mt-6">
              By subscribing, you agree to receive marketing emails. 
              We respect your privacy — unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}