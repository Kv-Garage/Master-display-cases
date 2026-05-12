# Deployment Guide

This guide will help you deploy the Master Display Cases site successfully.

## 🚀 Quick Deployment Steps

### 1. Set Up Environment Variables (CRITICAL)

**This is the most important step!** Your site will not work without these.

#### For Vercel:
1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=mraze2-ra.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=b961a4807d67d64f85f7e0bef9b14dd8
```

#### For Netlify:
1. Go to your site in Netlify
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click **Edit variables**
4. Add the same variables as above

#### For Other Platforms:
Look for "Environment Variables", "Config Vars", or "Secrets" in your hosting platform's dashboard and add the same variables.

### 2. Deploy the Site

#### If using GitHub + Vercel/Netlify:
1. Push your code to GitHub (if you haven't already)
2. Connect your repository to Vercel or Netlify
3. The platform will automatically detect it's a Next.js app
4. Configure the environment variables as shown above
5. Deploy!

#### Build Command:
```bash
npm run build
```

#### Start Command (for production):
```bash
npm start
```

### 3. Verify Deployment

After deployment, check:
- ✅ Homepage loads with products
- ✅ Collection pages work
- ✅ Product pages load
- ✅ Blog pages work
- ✅ Contact form works

## 🔧 Domain Configuration

### Custom Domain (masterdisplaycases.com)

1. **In your hosting platform:**
   - Go to Domain Settings
   - Add your custom domain: `masterdisplaycases.com`
   - Follow the DNS configuration instructions

2. **In your DNS provider (GoDaddy, Namecheap, etc.):**
   - Add/Update the following records:
     - **A Record**: `@` → (IP provided by hosting platform)
     - **CNAME**: `www` → (domain provided by hosting platform)

### Shopify Domain Settings

**Important:** Make sure your Shopify domain settings are configured correctly:

1. Go to **Shopify Admin** → **Settings** → **Domains**
2. Ensure `mraze2-ra.myshopify.com` does NOT redirect to your custom domain
   - This is critical for checkout to work properly
3. If you have a custom domain connected to Shopify, make sure it's set up correctly

## 🛡️ Security Considerations

### Environment Variables
- ✅ **NEVER** commit `.env.local` to git
- ✅ `.env.local` is already in `.gitignore`
- ✅ `.env.example` is provided as a template
- ✅ Environment variables are safe in Next.js public env vars (they're meant to be public)

### Shopify Access Token
- The Storefront API token is safe to use in client-side code
- It only allows read access to your products (if configured correctly)
- It cannot access orders, customers, or admin functions

## 📊 Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Site builds without errors
- [ ] Homepage displays products
- [ ] Collection pages work
- [ ] Product pages load with variants
- [ ] Blog posts are visible
- [ ] Contact form submits successfully
- [ ] Cart functionality works
- [ ] Checkout redirects to Shopify correctly
- [ ] Custom domain is configured (if using)
- [ ] SSL certificate is active (usually automatic)

## 🐛 Troubleshooting

### Site Shows But No Products
**Problem:** Site loads but shows "Shopify Not Configured" or no products

**Solution:**
1. Check that environment variables are set in your hosting platform
2. Verify the values match your `.env.local` file
3. Redeploy after adding environment variables

### Build Fails
**Problem:** `npm run build` fails

**Solution:**
1. Check the error message
2. Common issues:
   - Missing dependencies: Run `npm install`
   - TypeScript errors: Check for type errors
   - Environment variables: Make sure they're set (even if empty)

### Checkout Doesn't Work
**Problem:** Cart/checkout links don't work

**Solution:**
1. Verify Shopify domain is correct in environment variables
2. Check that your Shopify store is active
3. Ensure products have variants with prices

### Site is Slow
**Problem:** Pages load slowly

**Solution:**
1. Enable Next.js caching (already configured)
2. Use a CDN (Vercel/Netlify provide this automatically)
3. Optimize images (already using Next.js Image optimization)

## 📝 Notes

- The site has fallback data, so it will still display sample products even without Shopify configured
- All Shopify API calls have timeout and error handling to prevent crashes
- The site is optimized for performance with automatic image optimization
- SSL is handled automatically by Vercel/Netlify

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check your hosting platform's deployment logs
3. Verify environment variables are set correctly
4. Review this guide

---

**Last Updated:** May 2026
**Version:** 1.0.0