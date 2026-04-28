'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/shopify';

interface ShippingCalculatorProps {
  price: number;
}

interface ShippingRate {
  name: string;
  price: number;
  estimatedDays: string;
}

// Local shipping rate calculator (mock implementation)
function getShippingRates(zipCode: string, orderTotal: number): { standard: ShippingRate; expedited: ShippingRate } {
  // Base rates for freight shipping
  const baseStandard = orderTotal * 0.08;
  const baseExpedited = orderTotal * 0.15;
  
  return {
    standard: {
      name: 'Standard Freight (5-7 business days)',
      price: Math.max(baseStandard, 99),
      estimatedDays: '5-7 business days',
    },
    expedited: {
      name: 'Expedited Freight (2-3 business days)',
      price: Math.max(baseExpedited, 199),
      estimatedDays: '2-3 business days',
    },
  };
}

export default function ShippingCalculator({ price }: ShippingCalculatorProps) {
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<{ standard: ShippingRate; expedited: ShippingRate } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (zipCode.length !== 5 || !/^\d{5}$/.test(zipCode)) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }

    setLoading(true);
    setError(null);
    setRates(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const shippingRates = getShippingRates(zipCode, price);
      setRates(shippingRates);
    } catch (err) {
      setError('Failed to calculate shipping. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="font-semibold text-black mb-4">Shipping Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Enter ZIP Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="12345"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
              maxLength={5}
            />
            <button
              onClick={handleCalculate}
              disabled={loading || zipCode.length !== 5}
              className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {rates && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-sm">{rates.standard.name}</p>
                <p className="text-xs text-gray-500">{rates.standard.estimatedDays}</p>
              </div>
              <p className="font-semibold">{formatPrice(rates.standard.price)}</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-sm">{rates.expedited.name}</p>
                <p className="text-xs text-gray-500">{rates.expedited.estimatedDays}</p>
              </div>
              <p className="font-semibold">{formatPrice(rates.expedited.price)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * Shipping costs are estimates. Final cost will be calculated at checkout.
            </p>
          </div>
        )}

        <p className="text-xs text-gray-500">
          Freight shipping available nationwide. White glove delivery available upon request.
        </p>
      </div>
    </div>
  );
}