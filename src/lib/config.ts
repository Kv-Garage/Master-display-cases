/**
 * Central configuration for Shopify domain
 * This file ensures consistent domain usage across the entire application
 * Uses hardcoded domain constant - NO environment variable fallback
 */

import { SHOPIFY_DOMAIN as _domain } from './domain';

export const SHOPIFY_DOMAIN = _domain;

console.error('🚀 APP LOADED WITH DOMAIN:', SHOPIFY_DOMAIN);