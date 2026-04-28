'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/lib/cart-context';
import { convertToNumericId } from '@/lib/cart-utils';

interface ProductOption {
  id: string;
  name: string;
  handle: string;
  price: number;
  image: string;
  variantId: string;
}

interface BundleOption {
  id: string;
  name: string;
  minUnits: number;
  maxUnits: number;
  discount: number;
  badge?: string;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface BundleConfiguratorProps {
  products: ProductOption[];
}

export default function BundleConfigurator({ products }: BundleConfiguratorProps) {
  const { addItem } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductOption>(products[0]);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>({ id: 'single', name: 'Single Unit', minUnits: 1, maxUnits: 1, discount: 0 });
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const bundleOptions: BundleOption[] = [
    { id: 'single', name: 'Single Unit', minUnits: 1, maxUnits: 1, discount: 0 },
    { id: 'growth', name: 'Growth Bundle', minUnits: 2, maxUnits: 3, discount: 10, badge: 'Most Popular' },
    { id: 'store', name: 'Store Bundle', minUnits: 4, maxUnits: 6, discount: 15, badge: 'Max Revenue' },
  ];

  const addonOptions: AddonOption[] = [
    { id: 'rgb', name: 'Premium RGB Upgrade', price: 99, description: 'Enhanced color-changing LED system' },
    { id: 'white-glove', name: 'White Glove Delivery', price: 199, description: 'Inside delivery and unpacking' },
    { id: 'warranty', name: 'Extended Warranty', price: 149, description: 'Additional 3 years coverage' },
    { id: 'branding', name: 'Custom Branding', price: 299, description: 'Your logo on the display' },
  ];

  const pricing = useMemo(() => {
    const basePrice = selectedProduct.price * quantity;
    const discountAmount = basePrice * (selectedBundle.discount / 100);
    const discountedPrice = basePrice - discountAmount;
    const addonsPrice = selectedAddons.reduce((sum, id) => {
      const addon = addonOptions.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    const total = discountedPrice + addonsPrice;
    const perUnit = total / quantity;

    return { basePrice, discountAmount, discountedPrice, addonsPrice, total, perUnit };
  }, [selectedProduct, quantity, selectedBundle, selectedAddons]);

  const handleBundleChange = (bundle: BundleOption) => {
    setSelectedBundle(bundle);
    setQuantity(bundle.minUnits);
  };

  const handleAddToQuote = () => {
    addItem({
      variantId: convertToNumericId(selectedProduct.variantId),
      productId: selectedProduct.id,
      title: `${selectedProduct.name} (${selectedBundle.name})`,
      productHandle: selectedProduct.handle,
      variantTitle: `Qty: ${quantity}`,
      price: pricing.total,
      image: { url: selectedProduct.image },
    });
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="container-custom max-w-5xl">
        <h2 className="text-2xl lg:text-3xl font-bold text-black text-center mb-2">Build Your Display Setup</h2>
        <p className="text-gray-600 text-center mb-10">Configure your perfect retail display system with real-time pricing.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* A. Product Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">Select Product Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => { setSelectedProduct(product); setQuantity(1); setSelectedBundle(bundleOptions[0]); }}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedProduct.id === product.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-square rounded-md bg-gray-100 mb-2 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-medium text-sm text-black">{product.name}</div>
                    <div className="text-xs text-gray-500">${product.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* B. Bundle Selector */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">Choose Your Bundle</label>
              <div className="space-y-3">
                {bundleOptions.map(bundle => (
                  <button
                    key={bundle.id}
                    onClick={() => handleBundleChange(bundle)}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                      selectedBundle.id === bundle.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedBundle.id === bundle.id ? 'border-black bg-black' : 'border-gray-300'
                      }`}>
                        {selectedBundle.id === bundle.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div>
                        <div className="font-medium text-black">{bundle.name}</div>
                        <div className="text-sm text-gray-500">{bundle.minUnits}{bundle.maxUnits > bundle.minUnits ? `-${bundle.maxUnits}` : ''} units {bundle.discount > 0 ? `• ${bundle.discount}% off` : ''}</div>
                      </div>
                    </div>
                    {bundle.badge && (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {bundle.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">Quantity: {quantity} unit{quantity > 1 ? 's' : ''}</label>
              <input
                type="range"
                min={selectedBundle.minUnits}
                max={selectedBundle.maxUnits}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{selectedBundle.minUnits}</span>
                <span>{selectedBundle.maxUnits}</span>
              </div>
            </div>

            {/* D. Add-ons */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">Optional Upgrades</label>
              <div className="space-y-3">
                {addonOptions.map(addon => (
                  <label key={addon.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <div>
                        <div className="font-medium text-black">{addon.name}</div>
                        <div className="text-sm text-gray-500">{addon.description}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-black">+${addon.price}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-black mb-4">Your Configuration</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Product</span>
                  <span className="font-medium text-black">{selectedProduct.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-medium text-black">{quantity} units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per unit</span>
                  <span className="font-medium text-black">${selectedProduct.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-black">${pricing.basePrice.toLocaleString()}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Bundle Discount ({selectedBundle.discount}%)</span>
                    <span className="font-medium text-green-600">-${pricing.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                {selectedAddons.length > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Add-ons:</div>
                    {selectedAddons.map(id => {
                      const addon = addonOptions.find(a => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{addon?.name}</span>
                          <span className="font-medium text-black">+${addon?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-600">Total</span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-black">${pricing.total.toLocaleString()}</div>
                    {pricing.discountAmount > 0 && (
                      <div className="text-sm text-green-600">You Save: ${pricing.discountAmount.toLocaleString()}</div>
                    )}
                    <div className="text-xs text-gray-500">${pricing.perUnit.toLocaleString()} per unit</div>
                  </div>
                </div>
              </div>

              {/* Value Reinforcement */}
              <div className="bg-green-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-green-800">
                  For most stores, this setup pays for itself in <strong>30-60 days</strong> through increased sales.
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={handleAddToQuote}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
              >
                Get Pricing / Add to Quote
              </button>
              <button className="w-full border-2 border-black text-black py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
                Talk to a Specialist
              </button>

              {/* Urgency */}
              <div className="text-center mt-4">
                <p className="text-xs text-orange-600 flex items-center justify-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>Limited stock for this configuration</span>
                </p>
              </div>

              {/* Trust */}
              <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <span className="text-xs text-gray-500">Commercial Grade</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <span className="text-xs text-gray-500">5-Year Warranty</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66l-2.34 2.34A2 2 0 0017 18.34V20m3-5.34V6a2 2 0 00-2-2h-1.66M17 18.34V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-6 0h12" /></svg>
                  </div>
                  <span className="text-xs text-gray-500">Nationwide Freight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}