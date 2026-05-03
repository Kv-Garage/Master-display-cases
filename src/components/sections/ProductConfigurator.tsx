'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useCart } from '@/lib/cart-context';

// Inline checkout reviews component for order summary
const CHECKOUT_REVIEWS = [
  {
    name: 'Chris',
    businessType: 'Convenience Store',
    location: 'Austin, TX',
    content: 'Paid for itself in the first month. No exaggeration.',
  },
  {
    name: 'Amanda',
    businessType: 'Jewelry Boutique',
    location: 'San Diego, CA',
    content: 'The quality exceeded my expectations. Customers notice immediately.',
  },
  {
    name: 'Robert',
    businessType: 'Head Shop',
    location: 'Portland, OR',
    content: 'Installation was straightforward, and the impact on sales was instant.',
  },
];

function StarRatingSmall() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ProductOption {
  id: string;
  name: string;
  handle: string;
  price: number;
  image: string;
  variantId: string;
  variants?: Array<{
    id: string;
    title: string;
    price: number;
    available: boolean;
  }>;
}

/**
 * Clean up variant title for display
 * Transforms: "Knocked Down (Default) / Standard (No Lock)" -> "Knocked Down – No Lock"
 * Transforms: "Tier 2 Assembly (+$199) / No Lock" -> "Assembled – No Lock"
 * Transforms: "Knocked Down (Default) / Plunger Lock + Keys (+$29.99)" -> "Knocked Down – With Lock"
 */
function formatVariantTitle(title: string): string {
  let cleaned = title;

  // Step 1: Remove price modifiers in parentheses like "(+$199)", "(+$29.99)", "(+149.99)"
  cleaned = cleaned.replace(/\s*\(\+?\$?\d+(?:\.\d+)?\)/gi, '');

  // Step 2: Remove "(Default)" and "(default)" suffixes
  cleaned = cleaned.replace(/\s*\(Default\)/gi, '');

  // Step 3: Remove "Tier 1 " or "Tier 2 " prefixes from assembly options
  cleaned = cleaned.replace(/Tier\s+\d+\s*/gi, '');

  // Step 4: Normalize "Assembly" to "Assembled" for consistency
  cleaned = cleaned.replace(/\bAssembly\b/gi, 'Assembled');

  // Step 5: Remove "/ Standard" pattern (e.g., "/ Standard (No Lock)" -> just keep the lock part)
  cleaned = cleaned.replace(/\s*\/\s*Standard/gi, '');

  // Step 6: Handle lock-related patterns
  // "Plunger Lock + Keys" -> "With Lock"
  cleaned = cleaned.replace(/Plunger\s+Lock\s*\(?\+?\s*Keys?\)?/gi, 'With Lock');

  // Step 7: Replace remaining "/" or " / " with en-dash
  cleaned = cleaned.replace(/\s*\/\s*/g, ' – ');

  // Step 8: Clean up multiple dashes
  cleaned = cleaned.replace(/\s*–\s*–\s*/g, ' – ');

  // Step 9: Remove any remaining parentheses content
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, '');

  // Step 10: Clean up extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Step 11: Remove trailing dashes or separators
  cleaned = cleaned.replace(/\s*[–-]\s*$/, '').trim();

  return cleaned;
}

/**
 * Get the first available variant ID from a product's variants
 */
function getFirstAvailableVariantId(variants: Array<{ id: string; available: boolean }>): string | undefined {
  const available = variants.find(v => v.available);
  return available?.id || variants[0]?.id;
}

interface BundleItem {
  product: ProductOption;
  quantity: number;
  selectedVariantId?: string;
}

interface AddonOption {
  id: string;
  name: string;
  price: number;
  description: string;
  // Flags to indicate what this addon includes
  includesAssembly?: boolean;
  includesLock?: boolean;
}

interface DiscountTier {
  minUnits: number;
  maxUnits: number | null;
  discount: number;
  label: string;
}

interface ProductConfiguratorProps {
  products: ProductOption[];
  currentProductHandle?: string;
  baseProduct?: ProductOption;
}

const DISCOUNT_TIERS: DiscountTier[] = [
  { minUnits: 2, maxUnits: 3, discount: 10, label: '10% OFF' },
  { minUnits: 4, maxUnits: 6, discount: 15, label: '15% OFF' },
  { minUnits: 7, maxUnits: null, discount: 20, label: '20% OFF' },
];

const ADDON_OPTIONS: AddonOption[] = [
  { 
    id: 'lock-upgrade', 
    name: 'Plunger Lock Upgrade', 
    price: 149, 
    description: 'Premium keyed plunger lock with reinforced strike plate',
    includesLock: true 
  },
];

// Tooltip component for discount tiers
function DiscountTierTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-md whitespace-nowrap z-50 shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
        </div>
      )}
    </div>
  );
}

export default function ProductConfigurator({ products, currentProductHandle, baseProduct }: ProductConfiguratorProps) {
  const { addItem, goToCheckout } = useCart();
  
  // State for bundle items
  const [bundleItems, setBundleItems] = useState<BundleItem[]>([]);
  
  // State for selected addons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // State for loading
  const [isAdding, setIsAdding] = useState(false);

  // Track the currently selected variant for the base product
  const [selectedBaseVariantId, setSelectedBaseVariantId] = useState<string | undefined>(
    baseProduct?.variantId
  );

  // Initialize with base product if available - auto-select first AVAILABLE variant
  useEffect(() => {
    if (baseProduct && bundleItems.length === 0) {
      // Find the first available variant, falling back to the default variantId
      const firstAvailableVariantId = baseProduct.variants 
        ? getFirstAvailableVariantId(baseProduct.variants) 
        : baseProduct.variantId;

      // Auto-add base product with 1 unit and first available variant
      setBundleItems([{ 
        product: baseProduct, 
        quantity: 1,
        selectedVariantId: firstAvailableVariantId || baseProduct.variantId 
      }]);

      // Update the tracked variant for addon sync
      if (firstAvailableVariantId) {
        setSelectedBaseVariantId(firstAvailableVariantId);
      }
    }
  }, [baseProduct]);

  // Calculate total units
  const totalUnits = useMemo(() => 
    bundleItems.reduce((sum, item) => sum + item.quantity, 0),
    [bundleItems]
  );

  // Calculate current discount tier
  const currentDiscount = useMemo(() => {
    for (const tier of DISCOUNT_TIERS) {
      if (totalUnits >= tier.minUnits && (tier.maxUnits === null || totalUnits <= tier.maxUnits)) {
        return tier;
      }
    }
    return null;
  }, [totalUnits]);

  // Calculate units needed for next tier
  const nextTierInfo = useMemo(() => {
    for (const tier of DISCOUNT_TIERS) {
      if (totalUnits < tier.minUnits) {
        return {
          tier,
          unitsNeeded: tier.minUnits - totalUnits,
        };
      }
    }
    return null;
  }, [totalUnits]);

  // Get tooltip text for a tier
  const getTierTooltip = (tier: DiscountTier) => {
    if (totalUnits >= tier.minUnits && (tier.maxUnits === null || totalUnits <= tier.maxUnits)) {
      return 'Current discount applied!';
    }
    const unitsNeeded = tier.minUnits - totalUnits;
    if (unitsNeeded <= 0) return 'Add more units to reach next tier';
    return `Add ${unitsNeeded} more unit${unitsNeeded > 1 ? 's' : ''} to unlock ${tier.label}`;
  };

  // Calculate pricing
  const pricing = useMemo(() => {
    let basePrice = 0;
    bundleItems.forEach(item => {
      const variantPrice = item.selectedVariantId 
        ? item.product.variants?.find(v => v.id === item.selectedVariantId)?.price || item.product.price
        : item.product.price;
      basePrice += variantPrice * item.quantity;
    });

    const discountPercent = currentDiscount?.discount || 0;
    const discountAmount = basePrice * (discountPercent / 100);
    const discountedPrice = basePrice - discountAmount;

    const addonsPrice = selectedAddons.reduce((sum, id) => {
      const addon = ADDON_OPTIONS.find(a => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);

    const total = discountedPrice + addonsPrice;
    const perUnit = totalUnits > 0 ? total / totalUnits : 0;

    return {
      basePrice,
      discountPercent,
      discountAmount,
      discountedPrice,
      addonsPrice,
      total,
      perUnit,
    };
  }, [bundleItems, selectedAddons, currentDiscount, totalUnits]);

  // Add product to bundle (always works, never disabled)
  const addProductToBundle = useCallback((product: ProductOption) => {
    setBundleItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // Already in bundle, increase quantity
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product with default variant
      return [...prev, { 
        product, 
        quantity: 1,
        selectedVariantId: product.variantId 
      }];
    });
  }, []);

  // Remove product from bundle
  const removeProductFromBundle = useCallback((productId: string) => {
    setBundleItems(prev => {
      const filtered = prev.filter(item => item.product.id !== productId);
      // Ensure at least one item remains
      return filtered.length > 0 ? filtered : prev;
    });
  }, []);

  // Update quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeProductFromBundle(productId);
      return;
    }
    setBundleItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeProductFromBundle]);

  // Update variant for a bundle item
  const updateVariant = useCallback((productId: string, variantId: string) => {
    setBundleItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, selectedVariantId: variantId } : item
      )
    );

    // If this is the base product, update the tracked variant
    if (baseProduct && productId === baseProduct.id) {
      setSelectedBaseVariantId(variantId);
    }
  }, [baseProduct]);

  // Toggle addon selection
  const toggleAddon = useCallback((addonId: string) => {
    setSelectedAddons(prev => {
      if (prev.includes(addonId)) {
        return prev.filter(id => id !== addonId);
      }
      return [...prev, addonId];
    });
  }, []);

  // Handle add to quote
  const handleAddToQuote = useCallback(async () => {
    setIsAdding(true);
    
    try {
      for (const item of bundleItems) {
        const variantPrice = item.selectedVariantId 
          ? item.product.variants?.find(v => v.id === item.selectedVariantId)?.price || item.product.price
          : item.product.price;

        // Use full GID format directly - no numeric conversion needed
        addItem({
          variantId: item.selectedVariantId || item.product.variantId,
          productId: item.product.id,
          title: item.product.name,
          productHandle: item.product.handle,
          variantTitle: `Qty: ${item.quantity}`,
          price: variantPrice * item.quantity,
          image: { url: item.product.image },
        });
      }

      for (const addonId of selectedAddons) {
        const addon = ADDON_OPTIONS.find(a => a.id === addonId);
        if (addon) {
          // Skip addons for now as they don't have variant IDs
          // They would need to be added as separate products in Shopify
        }
      }
    } catch (error) {
      console.error('Error adding to quote:', error);
    } finally {
      setIsAdding(false);
    }
  }, [bundleItems, selectedAddons, addItem]);

  // Handle Buy Now - add to cart and go directly to checkout
  const handleBuyNow = useCallback(async () => {
    setIsAdding(true);
    
    try {
      for (const item of bundleItems) {
        const variantPrice = item.selectedVariantId 
          ? item.product.variants?.find(v => v.id === item.selectedVariantId)?.price || item.product.price
          : item.product.price;

        // Use full GID format directly - no numeric conversion needed
        addItem({
          variantId: item.selectedVariantId || item.product.variantId,
          productId: item.product.id,
          title: item.product.name,
          productHandle: item.product.handle,
          variantTitle: `Qty: ${item.quantity}`,
          price: variantPrice * item.quantity,
          image: { url: item.product.image },
        });
      }

      for (const addonId of selectedAddons) {
        const addon = ADDON_OPTIONS.find(a => a.id === addonId);
        if (addon) {
          // Skip addons for now as they don't have variant IDs
          // They would need to be added as separate products in Shopify
        }
      }

      // Redirect to checkout using the new API-based checkout
      await goToCheckout();
    } catch (error) {
      console.error('Error in buy now:', error);
      setIsAdding(false);
    }
  }, [bundleItems, selectedAddons, addItem]);

  // Handle variant selection on the base product (auto-adds to configuration)
  const handleBaseVariantChange = useCallback((variantId: string) => {
    setSelectedBaseVariantId(variantId);
    
    if (baseProduct) {
      setBundleItems(prev => {
        const existingIndex = prev.findIndex(item => item.product.id === baseProduct.id);
        if (existingIndex >= 0) {
          // Update existing item's variant
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            selectedVariantId: variantId
          };
          return updated;
        } else {
          // Add new item (shouldn't happen, but fallback)
          return [...prev, {
            product: baseProduct,
            quantity: 1,
            selectedVariantId: variantId
          }];
        }
      });
    }
  }, [baseProduct]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products available for configuration.
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="container-custom">
        {/* Header - Mobile optimized */}
        <div className="mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-black mb-1">Build Your Store Setup</h2>
          <p className="text-sm text-gray-600">Follow the steps below. Bulk discounts applied automatically.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_minmax(0,1fr)] gap-6 lg:gap-8">
          {/* Left: Configuration Steps */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-5">
            
            {/* Step 1: Product Selector - Mobile optimized with larger tap targets */}
            <div className="border border-gray-200 rounded-lg p-3 lg:p-4">
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-semibold flex-shrink-0">1</span>
                <label className="text-sm font-semibold text-black">Choose Your Display(s)</label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {products.map(product => {
                  const isInBundle = bundleItems.some(item => item.product.id === product.id);
                  return (
                    <button
                      key={product.id}
                      onClick={() => addProductToBundle(product)}
                      className={`p-2 rounded-md border transition-all text-left min-h-[120px] active:scale-95 ${
                        isInBundle
                          ? 'border-black bg-gray-50 ring-1 ring-black'
                          : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      <div className="aspect-square rounded bg-gray-100 mb-2 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="font-medium text-xs text-black truncate">{product.name}</div>
                      <div className="text-xs text-gray-500">${product.price.toLocaleString()}</div>
                      {isInBundle && (
                        <div className="mt-1 text-[10px] font-semibold text-black uppercase tracking-wide">
                          In Cart ({bundleItems.find(i => i.product.id === product.id)?.quantity || 0})
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Bundle Items & Quantity */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-semibold">2</span>
                <label className="text-sm font-semibold text-black">Your Configuration</label>
                <span className="ml-auto text-xs text-gray-500">{totalUnits} unit{totalUnits !== 1 ? 's' : ''} total</span>
              </div>
              
              {bundleItems.length === 0 ? (
                <div className="text-gray-500 text-sm py-8 border-2 border-dashed border-gray-100 rounded-md text-center">
                  Select a product above to begin (base product auto-added)
                </div>
              ) : (
                <div className="space-y-3">
                  {bundleItems.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-md bg-white">
                      <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <div className="font-medium text-sm text-black">{item.product.name}</div>
                            <div className="text-xs text-gray-500">${item.product.price.toLocaleString()} each</div>
                          </div>
                          {bundleItems.length > 1 && (
                            <button
                              onClick={() => removeProductFromBundle(item.product.id)}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0 mt-0.5"
                              title="Remove from configuration"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Variant Selector - contained within parent, no overflow */}
                        {item.product.variants && item.product.variants.length > 1 && (
                          <div className="mb-2 relative">
                            <select
                              value={item.selectedVariantId || item.product.variantId}
                              onChange={(e) => {
                                if (item.product.id === baseProduct?.id) {
                                  handleBaseVariantChange(e.target.value);
                                } else {
                                  updateVariant(item.product.id, e.target.value);
                                }
                              }}
                              className="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white w-full max-w-full appearance-none pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.5rem center',
                                backgroundSize: '12px',
                              }}
                            >
                              {item.product.variants.map(variant => {
                                const displayTitle = formatVariantTitle(variant.title);
                                return (
                                  <option 
                                    key={variant.id} 
                                    value={variant.id}
                                  >
                                    {displayTitle} — ${variant.price.toLocaleString()}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}

                        {/* Quantity Controls - Mobile optimized with larger tap targets */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">Qty:</span>
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-base font-medium min-w-[44px] flex items-center justify-center"
                              disabled={item.quantity <= 1 && bundleItems.length <= 1}
                            >
                              −
                            </button>
                            <span className="px-3 py-2 text-sm font-semibold border-x border-gray-300 min-w-[3rem] text-center bg-gray-50">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 text-base font-medium min-w-[44px] flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-black ml-auto">
                            ${(() => {
                              const vPrice = item.selectedVariantId 
                                ? item.product.variants?.find(v => v.id === item.selectedVariantId)?.price || item.product.price
                                : item.product.price;
                              return (vPrice * item.quantity).toLocaleString();
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 3: Discount Tiers */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-semibold">3</span>
                <label className="text-sm font-semibold text-black">Buy More, Save More</label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {DISCOUNT_TIERS.map((tier) => {
                  const isActive = currentDiscount === tier;
                  const isReached = totalUnits >= tier.minUnits;
                  const tooltipText = getTierTooltip(tier);
                  
                  return (
                    <DiscountTierTooltip key={tier.label} text={tooltipText}>
                      <div
                        className={`p-3 rounded-md border text-center transition-all cursor-help ${
                          isActive
                            ? 'border-black bg-black text-white'
                            : isReached
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 text-gray-400'
                        }`}
                      >
                        <div className="text-lg font-bold">{tier.label}</div>
                        <div className="text-xs mt-0.5">
                          {tier.maxUnits ? `${tier.minUnits}-${tier.maxUnits}` : `${tier.minUnits}+`} units
                        </div>
                      </div>
                    </DiscountTierTooltip>
                  );
                })}
              </div>
              {currentDiscount && (
                <div className="mt-3 text-sm text-green-600 font-medium flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  You're saving {currentDiscount.discount}% on this order!
                </div>
              )}
              {nextTierInfo && (
                <div className="mt-2 text-xs text-gray-500">
                  Add {nextTierInfo.unitsNeeded} more unit{nextTierInfo.unitsNeeded > 1 ? 's' : ''} to unlock {nextTierInfo.tier.label}
                </div>
              )}
            </div>

            {/* Step 4: Add-ons */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-semibold">4</span>
                <label className="text-sm font-semibold text-black">Optional Upgrades</label>
              </div>
              <div className="space-y-2.5">
                {ADDON_OPTIONS.map(addon => {
                  const checked = selectedAddons.includes(addon.id);
                  
                  return (
                    <label
                      key={addon.id}
                      className="flex items-center justify-between p-3 rounded-md border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(addon.id)}
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <div>
                          <div className="font-medium text-sm text-black">{addon.name}</div>
                          <div className="text-xs text-gray-500">{addon.description}</div>
                        </div>
                      </div>
                      <div className="font-semibold text-sm text-black">+${addon.price}</div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Pricing Summary + Reviews side-by-side */}
          <div className="lg:col-span-1 w-full">
            <div className="checkout-row">
              {/* Order Summary - LEFT */}
              <div className="order-summary">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 w-full">
              <h3 className="text-base font-bold text-black mb-3.5">Order Summary</h3>

              <div className="space-y-3 mb-3.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Units</span>
                  <span className="font-medium text-black">{totalUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-black">${pricing.basePrice.toLocaleString()}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600">Bundle Discount ({pricing.discountPercent}%)</span>
                    <span className="font-medium text-green-600">-${pricing.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                {selectedAddons.length > 0 && (
                  <div className="pt-3 border-t border-gray-200 mt-3">
                    <div className="text-xs text-gray-500 mb-2">Add-ons:</div>
                    {selectedAddons.map(id => {
                      const addon = ADDON_OPTIONS.find(a => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-600">{addon?.name}</span>
                          <span className="font-medium text-black">+${addon?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3.5 mb-3.5">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-gray-600">Total</span>
                  <div className="text-right">
                    <div className="text-[34px] font-bold text-black leading-none">${pricing.total.toLocaleString()}</div>
                    {pricing.discountAmount > 0 && (
                      <div className="text-sm text-green-600 mt-1">
                        You Save: ${pricing.discountAmount.toLocaleString()}
                      </div>
                    )}
                    {totalUnits > 0 && (
                      <div className="text-xs text-gray-500 mt-0.5">${pricing.perUnit.toLocaleString()} / unit</div>
                    )}
                  </div>
                </div>
              </div>

              {/* ROI Callout */}
              <div className="bg-green-50 rounded-md p-3.5 mb-3.5 border border-green-100">
                <p className="text-xs text-green-800 leading-relaxed">
                  <strong>ROI:</strong> Most stores recover this cost in <strong>30–60 days</strong>.
                </p>
              </div>

              {/* Primary CTA: Add to Quote - Mobile optimized with larger touch target */}
              <button
                onClick={handleAddToQuote}
                disabled={isAdding || bundleItems.length === 0}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all mb-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                {isAdding ? 'Adding...' : 'Add to Quote'}
              </button>

              {/* Secondary CTA: Buy Now (Express Checkout) - Mobile optimized */}
              <button
                onClick={handleBuyNow}
                disabled={isAdding || bundleItems.length === 0}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 active:scale-[0.98] transition-all mb-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                Buy Now
              </button>

              {/* Tertiary CTA - Mobile optimized */}
              <a
                href="/contact"
                className="w-full border-2 border-black text-black py-4 rounded-lg font-semibold hover:bg-black hover:text-white active:scale-[0.98] transition-all text-center block text-sm min-h-[48px]"
              >
                Talk to a Specialist
              </a>

              {/* Microcopy */}
              <p className="text-xs text-gray-500 text-center mt-3">
                Freight calculated at checkout. No hidden fees.
              </p>

              {/* Trust Badges */}
              <div className="flex justify-between items-start gap-3 pt-3.5 mt-3.5 border-t border-gray-200">
                <div className="flex-1 text-center">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">Commercial Grade</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">5-Year Warranty</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 14.66V20a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2.34M20 14.66l-2.34 2.34A2 2 0 0017 18.34V20m3-5.34V6a2 2 0 00-2-2h-1.66M17 18.34V16a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-6 0h12" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">Nationwide Freight</p>
                </div>
              </div>
                </div>
              </div>

              {/* Verified Buyer Reviews - RIGHT */}
              <div className="verified-reviews">
                <div className="bg-gray-50 rounded-lg p-5 lg:p-6 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">
                    Verified Buyer Reviews
                  </p>
                  <div className="space-y-3">
                    {CHECKOUT_REVIEWS.map((review, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center gap-1 mb-1.5">
                          <StarRatingSmall />
                        </div>
                        <blockquote className="text-xs text-gray-700 leading-relaxed italic mb-2">
                          "{review.content}"
                        </blockquote>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">{review.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-black">{review.name}</p>
                            <p className="text-[10px] text-gray-500">{review.businessType}, {review.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .checkout-row {
          display: block;
        }

        @media (min-width: 1024px) {
          .checkout-row {
            display: flex;
            gap: 24px;
            align-items: flex-start;
            width: 100%;
          }

          .order-summary {
            flex: 0 0 420px;
            max-width: 420px;
          }

          .verified-reviews {
            flex: 1;
            min-width: 0;
          }
        }

        .verified-reviews {
          overflow: hidden;
        }

        .verified-reviews * {
          white-space: normal;
          word-break: normal;
        }

        .order-summary * {
          min-width: 0;
        }
      `}</style>
    </section>
  );
}
