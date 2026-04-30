/**
 * Shopify Variant ID Verification Script
 * 
 * This script fetches products from the Shopify Storefront API,
 * logs raw variant IDs, extracts numeric IDs, and tests each variant
 * URL to identify which ones work and which fail.
 * 
 * Usage: node scripts/verify-variant-ids.js
 * 
 * Requires:
 * - NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local
 * - NEXT_PUBLIC_SHOPIFY_DOMAIN in .env.local (or defaults to mraze2-ra.myshopify.com)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local file manually (no dotenv dependency needed)
function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
    console.log('✅ Loaded .env.local');
  } catch (error) {
    console.warn('⚠️  Could not load .env.local:', error.message);
  }
}

loadEnvFile();

// Configuration
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'mraze2-ra.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

if (!SHOPIFY_STOREFRONT_TOKEN) {
  console.error('❌ ERROR: NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set in .env.local');
  process.exit(1);
}

console.log('=== Shopify Variant ID Verification ===\n');
console.log(`Domain: ${SHOPIFY_DOMAIN}`);
console.log(`Token: ${SHOPIFY_STOREFRONT_TOKEN.substring(0, 8)}...${SHOPIFY_STOREFRONT_TOKEN.slice(-4)}`);
console.log('');

// STEP 1: The exact query from the task requirements
const PRODUCT_QUERY = `{
  products(first: 20) {
    edges {
      node {
        id
        handle
        title
        variants(first: 5) {
          edges {
            node {
              id
              availableForSale
              quantityAvailable
              price {
                amount
              }
            }
          }
        }
      }
    }
  }
}`;

// STEP 4: Extract numeric ID function (exactly as specified)
function getNumericId(gid) {
  return gid.split('/').pop();
}

// STEP 3: Verify GID format
function isValidGID(gid) {
  return /^gid:\/\/shopify\/ProductVariant\/\d+$/.test(gid);
}

// Make HTTPS request
function shopifyFetch(query) {
  return new Promise((resolve, reject) => {
    const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;
    
    const data = JSON.stringify({ query });
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: '/api/2024-01/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.errors) {
            reject(new Error('Shopify GraphQL Error: ' + JSON.stringify(json.errors)));
          } else {
            resolve(json.data);
          }
        } catch (e) {
          reject(new Error('Invalid JSON response: ' + body));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

// Test a single variant URL
function testVariantURL(numericId) {
  return new Promise((resolve) => {
    const url = `https://${SHOPIFY_DOMAIN}/cart/${numericId}:1`;
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: `/cart/${numericId}:1`,
      method: 'HEAD',
      headers: {
        'Accept': 'text/html,application/xhtml+xml'
      }
    };
    
    const req = https.request(options, (res) => {
      resolve({
        numericId,
        url,
        statusCode: res.statusCode,
        success: res.statusCode === 302 || res.statusCode === 200 || res.statusCode === 301
      });
    });
    
    req.on('error', (error) => {
      resolve({
        numericId,
        url,
        statusCode: null,
        success: false,
        error: error.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        numericId,
        url,
        statusCode: null,
        success: false,
        error: 'Timeout'
      });
    });
    
    req.end();
  });
}

// Main execution
async function main() {
  console.log('STEP 1: Fetching products from Shopify Storefront API...\n');
  
  try {
    const data = await shopifyFetch(PRODUCT_QUERY);
    const products = data.products.edges.map(edge => edge.node);
    
    console.log(`✅ Fetched ${products.length} products\n`);
    
    // STEP 2: Log raw variant IDs
    console.log('STEP 2: RAW VARIANT IDS\n');
    console.log('─'.repeat(80));
    
    const allVariants = [];
    
    products.forEach(product => {
      console.log(`\n📦 Product: ${product.title}`);
      console.log(`   Handle: ${product.handle}`);
      console.log(`   Variants:`);
      
      product.variants.edges.forEach(variantEdge => {
        const variant = variantEdge.node;
        console.log(`   ── RAW VARIANT ID: ${variant.id}`);
        
        allVariants.push({
          productTitle: product.title,
          productHandle: product.handle,
          rawId: variant.id,
          availableForSale: variant.availableForSale,
          quantityAvailable: variant.quantityAvailable,
          price: variant.price?.amount || 'N/A'
        });
      });
    });
    
    console.log('\n' + '─'.repeat(80));
    
    // STEP 3: Verify GID format
    console.log('\nSTEP 3: VERIFY GID FORMAT\n');
    console.log('─'.repeat(80));
    
    let validGIDCount = 0;
    let invalidGIDCount = 0;
    
    allVariants.forEach(v => {
      const isValid = isValidGID(v.rawId);
      if (isValid) {
        validGIDCount++;
        console.log(`✅ Valid GID: ${v.rawId}`);
      } else {
        invalidGIDCount++;
        console.log(`❌ Invalid GID: ${v.rawId}`);
      }
    });
    
    console.log(`\nSummary: ${validGIDCount} valid, ${invalidGIDCount} invalid`);
    
    // STEP 4: Extract numeric IDs
    console.log('\nSTEP 4: EXTRACT NUMERIC IDS\n');
    console.log('─'.repeat(80));
    
    const variantsWithNumericIds = allVariants.map(v => {
      const numericId = getNumericId(v.rawId);
      console.log(`  ${v.rawId} → ${numericId}`);
      return {
        ...v,
        numericId
      };
    });
    
    // STEP 5 & 6: Test variant URLs and filter available
    console.log('\nSTEP 5 & 6: TESTING VARIANT URLS (this may take a moment...)\n');
    console.log('─'.repeat(80));
    
    // Filter only available variants first
    const availableVariants = variantsWithNumericIds.filter(v => v.availableForSale === true);
    const unavailableVariants = variantsWithNumericIds.filter(v => v.availableForSale !== true);
    
    console.log(`\n📊 Variant Availability:`);
    console.log(`   Available: ${availableVariants.length}`);
    console.log(`   Unavailable: ${unavailableVariants.length}`);
    
    if (unavailableVariants.length > 0) {
      console.log(`\n⚠️  Unavailable variants (skipping URL test):`);
      unavailableVariants.forEach(v => {
        console.log(`   - ${v.productTitle}: ${v.numericId} (availableForSale: ${v.availableForSale})`);
      });
    }
    
    console.log('\n🧪 Testing available variant URLs...\n');
    
    // Test each available variant
    const testResults = [];
    for (const variant of availableVariants) {
      process.stdout.write(`   Testing ${variant.numericId}... `);
      const result = await testVariantURL(variant.numericId);
      testResults.push({ ...variant, ...result });
      
      if (result.success) {
        console.log(`✅ ${result.statusCode}`);
      } else {
        console.log(`❌ ${result.statusCode || 'ERROR'} - ${result.error || 'Failed'}`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // STEP 7 & 8: Summary and working URLs
    console.log('\n' + '─'.repeat(80));
    console.log('\n=== FINAL RESULTS ===\n');
    
    const workingVariants = testResults.filter(r => r.success);
    const failingVariants = testResults.filter(r => !r.success);
    
    console.log(`📊 Summary:`);
    console.log(`   Total products: ${products.length}`);
    console.log(`   Total variants: ${allVariants.length}`);
    console.log(`   Available variants: ${availableVariants.length}`);
    console.log(`   Working URLs: ${workingVariants.length}`);
    console.log(`   Failing URLs: ${failingVariants.length}`);
    
    if (workingVariants.length > 0) {
      console.log('\n✅ WORKING VARIANT URLS:\n');
      workingVariants.forEach(v => {
        console.log(`   Product: ${v.productTitle}`);
        console.log(`   Raw ID: ${v.rawId}`);
        console.log(`   Numeric ID: ${v.numericId}`);
        console.log(`   Price: $${v.price}`);
        console.log(`   URL: ${v.url}`);
        console.log(`   Status: ${v.statusCode}`);
        console.log('');
      });
    }
    
    if (failingVariants.length > 0) {
      console.log('❌ FAILING VARIANT URLS:\n');
      failingVariants.forEach(v => {
        console.log(`   Product: ${v.productTitle}`);
        console.log(`   Raw ID: ${v.rawId}`);
        console.log(`   Numeric ID: ${v.numericId}`);
        console.log(`   URL: ${v.url}`);
        console.log(`   Status: ${v.statusCode || 'ERROR'}`);
        console.log(`   Error: ${v.error || 'Unknown'}`);
        console.log('');
      });
    }
    
    // Success condition check
    console.log('─'.repeat(80));
    if (workingVariants.length > 0) {
      console.log('\n✅ SUCCESS: At least one variant URL works!');
      console.log(`\n🎯 First working URL: ${workingVariants[0].url}`);
    } else {
      console.log('\n❌ FAILURE: No variant URLs are working!');
      console.log('\n💡 Troubleshooting steps:');
      console.log('   1. Verify products are Active in Shopify Admin');
      console.log('   2. Verify products are available on Online Store channel');
      console.log('   3. Check inventory levels (must be > 0 or allow out-of-stock sales)');
      console.log('   4. Verify the Shopify domain is correct');
      console.log('   5. Check if password protection is enabled on the store');
    }
    
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    console.error('\n💡 Check that:');
    console.error('   1. NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is set correctly in .env.local');
    console.error('   2. The token has Storefront API access');
    console.error('   3. The Shopify domain is correct');
    process.exit(1);
  }
}

main();