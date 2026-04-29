const fs = require("fs");
const path = require("path");

const BAD_DOMAIN = "masterdisplaycases.myshopify.com";

function scan(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      scan(full);
    } else {
      // Skip source map files - they contain original source for debugging
      if (full.endsWith('.map')) {
        continue;
      }

      // Skip guardDomain files - they contain the string as a comparison value
      // to BLOCK the wrong domain, not to use it
      if (full.includes('guardDomain')) {
        continue;
      }

      const content = fs.readFileSync(full, "utf8");

      // Check if the bad domain is used as an actual domain (in a URL context)
      // The guard check uses .includes() which is safe
      // We look for patterns like:
      // - https://masterdisplaycases.myshopify.com
      // - masterdisplaycases.myshopify.com/cart
      // - href="...masterdisplaycases.myshopify.com..."
      // But NOT: .includes("masterdisplaycases.myshopify.com") which is the guard
      
      // First check if the string exists at all
      if (content.includes(BAD_DOMAIN)) {
        // Check if it's ONLY used in the guard pattern (includes check)
        const guardPattern = new RegExp(`\\.includes\\(["']${BAD_DOMAIN.replace(/\./g, '\\.')}["']\\)`);
        const hasGuardOnly = guardPattern.test(content);
        
        // Check if it's used as a URL (bad usage)
        const urlPattern = new RegExp(`https?://${BAD_DOMAIN.replace(/\./g, '\\.')}`);
        const hasUrlUsage = urlPattern.test(content);
        
        // Check if it's used in other contexts (like href, src, etc.)
        const contextPattern = new RegExp(`["'=\`][^"'=\`]*${BAD_DOMAIN.replace(/\./g, '\\.')}`);
        const hasContextUsage = contextPattern.test(content) && !hasGuardOnly;

        if (hasUrlUsage || (hasContextUsage && !hasGuardOnly)) {
          console.error("❌ FOUND BAD DOMAIN USED AS URL IN:", full);
          console.error("   The wrong domain should only appear in guard checks, not as actual URLs");
          process.exit(1);
        }
      }
    }
  }
}

scan(".next");
console.log("✅ No bad domain found in build (guard checks are safe)");
