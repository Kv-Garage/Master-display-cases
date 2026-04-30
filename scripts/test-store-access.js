/**
 * Shopify Store Access Test
 * Tests if the store is accessible and if cart URLs work with different methods
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env.local file manually
function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    });
  } catch (error) {
    console.warn('⚠️  Could not load .env.local:', error.message);
  }
}

loadEnvFile();

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'mraze2-ra.myshopify.com';

console.log('=== Shopify Store Access Test ===\n');
console.log(`Testing domain: ${SHOPIFY_DOMAIN}\n`);

// Test 1: Check if store homepage is accessible
function testStoreHomepage() {
  return new Promise((resolve) => {
    console.log('Test 1: Checking store homepage...\n');
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: '/',
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Location: ${res.headers.location || 'N/A'}`);
        console.log(`   Content-Type: ${res.headers['content-type'] || 'N/A'}`);
        
        if (res.statusCode === 302 && res.headers.location?.includes('password')) {
          console.log('   ⚠️  STORE IS PASSWORD PROTECTED!\n');
        } else if (res.statusCode === 200) {
          console.log('   ✅ Store homepage is accessible\n');
        }
        
        resolve(res.statusCode);
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}\n`);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.end();
  });
}

// Test 2: Check password page
function testPasswordPage() {
  return new Promise((resolve) => {
    console.log('Test 2: Checking password page...\n');
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: '/password',
      method: 'GET',
      headers: {
        'Accept': 'text/html'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log('   ✅ Password page exists - store is likely password protected\n');
      } else {
        console.log('   Store is not using password protection\n');
      }
      
      resolve(res.statusCode);
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}\n`);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.end();
  });
}

// Test 3: Test cart URL with GET instead of HEAD
function testCartWithGet() {
  return new Promise((resolve) => {
    console.log('Test 3: Testing cart URL with GET method...\n');
    
    // Use a known variant ID from our previous test
    const variantId = '48310735405156';
    const cartUrl = `https://${SHOPIFY_DOMAIN}/cart/${variantId}:1`;
    
    console.log(`   URL: ${cartUrl}\n`);
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: `/cart/${variantId}:1`,
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Location: ${res.headers.location || 'N/A'}`);
      console.log(`   Set-Cookie: ${res.headers['set-cookie'] ? 'Yes' : 'No'}`);
      
      if (res.statusCode === 302 || res.statusCode === 301) {
        console.log('   ✅ Cart URL works! (redirects to checkout)\n');
      } else if (res.statusCode === 403) {
        console.log('   ❌ 403 Forbidden - Store may be password protected or cart access restricted\n');
      } else {
        console.log(`   Status code: ${res.statusCode}\n`);
      }
      
      resolve(res.statusCode);
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}\n`);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.end();
  });
}

// Test 4: Check if products page works
function testProductsPage() {
  return new Promise((resolve) => {
    console.log('Test 4: Checking products page...\n');
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: '/products',
      method: 'GET',
      headers: {
        'Accept': 'text/html',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    
    const req = https.request(options, (res) => {
      console.log(`   Status: ${res.statusCode}`);
      
      if (res.statusCode === 200) {
        console.log('   ✅ Products page is accessible\n');
      } else if (res.statusCode === 403) {
        console.log('   ❌ 403 Forbidden\n');
      } else if (res.statusCode === 302) {
        console.log(`   Redirect to: ${res.headers.location}\n`);
      }
      
      resolve(res.statusCode);
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}\n`);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.end();
  });
}

// Test 5: Check API access
function testApiAccess() {
  return new Promise((resolve) => {
    console.log('Test 5: Testing Storefront API access...\n');
    
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
    if (!token) {
      console.log('   ❌ No Storefront token configured\n');
      resolve(null);
      return;
    }
    
    const query = '{ shop { name } }';
    const data = JSON.stringify({ query });
    
    const options = {
      hostname: SHOPIFY_DOMAIN,
      path: '/api/2024-01/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`   Status: ${res.statusCode}`);
        
        try {
          const json = JSON.parse(body);
          if (json.data && json.data.shop) {
            console.log(`   ✅ API works! Shop name: ${json.data.shop.name}\n`);
          } else if (json.errors) {
            console.log(`   ❌ API Error: ${JSON.stringify(json.errors)}\n`);
          }
        } catch (e) {
          console.log(`   Response: ${body.substring(0, 200)}\n`);
        }
        
        resolve(res.statusCode);
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}\n`);
      resolve(null);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    
    req.write(data);
    req.end();
  });
}

// Main execution
async function main() {
  await testStoreHomepage();
  await testPasswordPage();
  await testCartWithGet();
  await testProductsPage();
  await testApiAccess();
  
  console.log('═'.repeat(80));
  console.log('\n📋 SUMMARY & RECOMMENDATIONS\n');
  console.log('The 403 errors on cart URLs are likely due to one of these reasons:\n');
  console.log('1. 🔒 PASSWORD PROTECTION: Store is password protected');
  console.log('   → Go to Shopify Admin > Online Store > Preferences');
  console.log('   → Disable password protection or add your domain to allowed list\n');
  console.log('2. 📦 PRODUCTS NOT PUBLISHED: Products not available on Online Store');
  console.log('   → Go to Shopify Admin > Products');
  console.log('   → Ensure products are Active and published to Online Store channel\n');
  console.log('3. 🛒 CART API DISABLED: Cart functionality may be restricted');
  console.log('   → Check Shopify Admin > Settings > Checkout');
  console.log('   → Ensure customer accounts and cart settings are properly configured\n');
  console.log('4. 🌐 DOMAIN MISMATCH: Using wrong domain');
  console.log('   → Verify your store domain in Shopify Admin');
  console.log('   → Current domain: ' + SHOPIFY_DOMAIN + '\n');
  console.log('═'.repeat(80));
}

main();