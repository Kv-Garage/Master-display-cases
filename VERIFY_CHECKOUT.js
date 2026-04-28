/**
 * Shopify Cart URL Verification Script
 * 
 * Run this in your browser console to test if the cart URL method works.
 * 
 * INSTRUCTIONS:
 * 1. First, create a test product in Shopify Admin (as described in the task)
 * 2. Get the numeric variant ID from the product URL
 * 3. Replace YOUR_VARIANT_ID_HERE with the actual numeric variant ID
 * 4. Paste this entire script into your browser console and press Enter
 * 5. Check the console output for results
 */

// CONFIGURATION - REPLACE WITH YOUR ACTUAL VARIANT ID
const TEST_VARIANT_ID = 'YOUR_VARIANT_ID_HERE'; // e.g., '12345678901'
const TEST_QUANTITY = 1;
const SHOPIFY_DOMAIN = 'masterdisplaycases.myshopify.com';

console.log('=== Shopify Cart URL Verification ===\n');

// Test 1: Validate variant ID format
console.log('Test 1: Validating variant ID format...');
if (TEST_VARIANT_ID === 'YOUR_VARIANT_ID_HERE') {
  console.error('❌ ERROR: You need to replace YOUR_VARIANT_ID_HERE with an actual variant ID!');
  console.log('📝 Instructions:');
  console.log('   1. Go to Shopify Admin > Products');
  console.log('   2. Create a test product or select an existing one');
  console.log('   3. Look at the URL: /admin/products/{productId}/variants/{variantId}');
  console.log('   4. Copy the numeric variantId (NOT the productId)');
  console.log('   5. Replace YOUR_VARIANT_ID_HERE in this script');
} else {
  const numericId = parseInt(TEST_VARIANT_ID, 10);
  if (isNaN(numericId) || numericId <= 0) {
    console.error('❌ ERROR: Variant ID must be a positive number!');
  } else {
    console.log(`✅ Variant ID is valid: ${numericId}`);
    
    // Test 2: Build checkout URL
    console.log('\nTest 2: Building checkout URL...');
    const checkoutUrl = `https://${SHOPIFY_DOMAIN}/cart/${numericId}:${TEST_QUANTITY}`;
    console.log(`✅ Checkout URL: ${checkoutUrl}`);
    
    // Test 3: Test localStorage cart functions
    console.log('\nTest 3: Testing localStorage cart functions...');
    
    // Clear existing cart
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_details');
    console.log('✅ Cart cleared');
    
    // Add item to cart
    const cart = [{ variantId: numericId, quantity: TEST_QUANTITY }];
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('✅ Item added to cart');
    
    // Verify cart was saved
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (savedCart.length === 1 && savedCart[0].variantId === numericId) {
      console.log('✅ Cart saved correctly:', savedCart);
    } else {
      console.error('❌ ERROR: Cart not saved correctly');
    }
    
    // Test 4: Provide manual test instructions
    console.log('\nTest 4: Manual checkout test');
    console.log('📝 Next steps:');
    console.log(`   1. Click this link (or copy/paste into browser):`);
    console.log(`      ${checkoutUrl}`);
    console.log('   2. Expected result:');
    console.log('      - Product should be added to cart');
    console.log('      - You should be redirected to Shopify checkout');
    console.log('      - Checkout page should show the test product');
    console.log('   3. If it works: ✅ Cart URL method is working!');
    console.log('   4. If it fails:');
    console.log('      - Verify product is Active in Shopify');
    console.log('      - Verify product is available on Online Store');
    console.log('      - Verify variant ID is correct (numeric only)');
    console.log('      - Check if inventory is > 0 or "Continue selling when out of stock" is enabled');
    
    // Test 5: Test multiple items
    console.log('\nTest 5: Multiple items cart test');
    const multiCart = [
      { variantId: numericId, quantity: 1 },
      { variantId: 99999999999, quantity: 2 } // This will likely fail, but tests the format
    ];
    const multiUrl = `https://${SHOPIFY_DOMAIN}/cart/${multiCart.map(i => `${i.variantId}:${i.quantity}`).join(',')}`;
    console.log(`Multiple items URL: ${multiUrl}`);
    console.log('Note: Second item will likely fail unless you have a variant with ID 99999999999');
    
    console.log('\n=== Verification Complete ===');
    console.log('If all tests passed, your cart system is ready to use!');
  }
}

console.log('\n📚 Documentation: See CART_SYSTEM_GUIDE.md for full implementation details');