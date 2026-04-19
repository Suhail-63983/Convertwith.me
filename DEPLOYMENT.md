# Deployment Guide — FileConvert (VertSEO)

## 1. Create the Project

```bash
mkdir fileconvert && cd fileconvert
```

Copy all source files from this project into the directory, maintaining the folder structure:

```
fileconvert/
├── package.json
├── tsconfig.json
├── svelte.config.ts
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── vercel.json
├── static/
│   ├── robots.txt
│   └── favicon.svg
└── src/
    ├── app.d.ts
    ├── app.html
    ├── app.css
    ├── service-worker.ts
    ├── lib/
    │   ├── converters/
    │   │   ├── imageConverter.ts
    │   │   ├── docConverter.ts
    │   │   ├── mammothConverter.ts
    │   │   ├── pdfToImageConverter.ts
    │   │   └── imageToPdfConverter.ts
    │   ├── components/
    │   │   ├── Navbar.svelte
    │   │   ├── Footer.svelte
    │   │   ├── DropZone.svelte
    │   │   ├── ConversionProgress.svelte
    │   │   ├── AdBanner.svelte
    │   │   ├── StickyFooterAd.svelte
    │   │   ├── ConversionResult.svelte
    │   │   └── FormatGrid.svelte
    │   └── utils/
    │       ├── converterRouter.ts
    │       ├── formatMeta.ts
    │       └── fileUtils.ts
    └── routes/
        ├── +layout.svelte
        ├── +layout.ts
        ├── +page.svelte
        ├── +page.ts
        ├── +error.svelte
        ├── about/+page.svelte
        ├── privacy/+page.svelte
        ├── sitemap.xml/+server.ts
        └── convert/[slug]/
            ├── +page.svelte
            ├── +page.ts
            └── +page.server.ts
```

## 2. Install Dependencies

```bash
npm install
```

This will install all dependencies listed in package.json including SvelteKit, TailwindCSS, mammoth, pdf-lib, pdfjs-dist, and @imagemagick/magick-wasm.

## 3. Test Locally

```bash
npm run dev
```

Open http://localhost:5173 in Chrome or Edge (required for SharedArrayBuffer support with HTTPS headers). Note: local dev sets COOP/COEP headers via vite.config.ts.

## 4. Set Up Monetag Ads

### Banner Ad (appears after conversion completes)

**File:** `src/lib/components/AdBanner.svelte`

Replace the placeholder div (lines 7-10) with your Monetag banner script:

```html
<!-- BEFORE (placeholder): -->
<div
  class="monetag-banner w-full max-w-[728px] mx-auto my-6 bg-gray-100 border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-400"
  data-slot="{slotId}"
>
  <p>Advertisement</p>
</div>

<!-- AFTER (your Monetag code): -->
<script
  data-zone="YOUR_BANNER_ZONE_ID"
  src="https://example.monetag.com/banner.js"
  async
></script>
```

### Sticky Footer Ad (appears at bottom of page)

**File:** `src/lib/components/StickyFooterAd.svelte`

Replace the placeholder div (lines 10-13) with your Monetag sticky footer script:

```html
<!-- BEFORE (placeholder): -->
<div
  class="monetag-sticky-footer flex-1 text-center text-sm text-gray-400"
  data-slot="sticky-footer"
>
  <p>Advertisement</p>
</div>

<!-- AFTER (your Monetag code): -->
<script
  data-zone="YOUR_STICKY_ZONE_ID"
  src="https://example.monetag.com/sticky.js"
  async
></script>
```

### Getting a Monetag Account

1. Go to https://monetag.com and create a publisher account
2. Add your website domain
3. Create two ad zones: one banner (728x90) and one sticky footer
4. Copy the script tags provided by Monetag
5. Paste them into the files referenced above

### Important Ad Rules

- Banner ads appear AFTER the converter result (never before)
- Sticky footer has a close button (already implemented)
- No ads on the homepage (good for SEO quality score)
- No popups, push notifications, or auto-redirects

## 5. Deploy to Vercel

### First-time setup

```bash
npm install -g vercel
vercel login
vercel link
```

### Deploy

```bash
vercel --prod
```

The `vercel.json` file in the project root handles:

- COOP/COEP headers (required for SharedArrayBuffer/WASM)
- Cache-Control headers for static assets and HTML pages
- X-Content-Type-Options and X-Frame-Options security headers

### Verify Headers

After deployment, verify the COOP/COEP headers are set:

```bash
curl -I https://your-domain.vercel.app
```

You should see:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## 6. Set a Custom Domain

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain (e.g., fileconvert.app)
5. Update your domain's DNS records as instructed by Vercel:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add an A record pointing to `76.76.21.21`
6. Wait for SSL certificate provisioning (automatic, usually < 5 minutes)
7. Update the base URL in these files:
   - `src/routes/sitemap.xml/+server.ts` — change `https://fileconvert.app` to your domain
   - `static/robots.txt` — change the Sitemap URL to your domain
   - `src/routes/privacy/+page.svelte` — update the contact email and domain references

## 7. Submit Sitemap to Google Search Console

1. Go to https://search.google.com/search-console
2. Add your property (your domain URL)
3. Verify ownership using one of:
   - HTML file upload (download from Search Console, place in `static/` folder)
   - DNS TXT record (recommended for Vercel)
   - HTML meta tag (add to `src/app.html`)
4. Submit your sitemap:
   - Go to Sitemaps section
   - Enter sitemap URL: `https://yourdomain.com/sitemap.xml`
   - Click Submit

The sitemap is automatically generated at `/sitemap.xml` and includes all converter pages with proper priority values.

## 8. Optional: Add Plausible Analytics

To add privacy-preserving analytics, add this script to `src/app.html` just before the closing `</head>` tag:

```html
<script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
></script>
```

## Troubleshooting

### WASM fails with "SharedArrayBuffer is not defined"

This means the COOP/COEP headers are not set. Check:

1. `vercel.json` is in the project root
2. You're accessing the site over HTTPS
3. The headers are actually being served (check with `curl -I`)

### ImageMagick WASM fails to load

The WASM file is loaded from jsdelivr CDN. If it fails:

1. Check your network connection
2. Try a different CDN or host the WASM file yourself
3. Check browser console for CORS errors

### PDF.js worker fails

The PDF.js worker URL is computed from the module URL. If it fails:

1. Check browser console for the actual worker URL being used
2. You may need to configure the worker path explicitly in `pdfToImageConverter.ts`

### Build errors

```bash
# Clear SvelteKit cache
rm -rf .svelte-kit
npm run build
```

### Performance optimization

After the first successful deployment:

1. Run Lighthouse audit in Chrome DevTools
2. Check that WASM files are being cached (check Network tab on second visit)
3. Verify code splitting (each /convert/\* route should be a separate chunk)
4. Ensure no WASM libraries are loaded on the homepage
