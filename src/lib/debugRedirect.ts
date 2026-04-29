/**
 * Debug redirect function to trace checkout URL generation
 * This file helps identify if the wrong domain is being used at runtime
 */

import { enforceCorrectDomain } from "./guardDomain";

export function debugRedirect(url: string) {
  console.error("🚨 REDIRECT TRIGGERED");
  console.error("➡️ FINAL URL:", url);

  console.error("🌐 ENV DOMAIN:", process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN);

  console.trace("📍 CALL STACK:");

  // Enforce correct domain - will throw if wrong domain is detected
  const safeUrl = enforceCorrectDomain(url);

  window.location.assign(safeUrl);
}
