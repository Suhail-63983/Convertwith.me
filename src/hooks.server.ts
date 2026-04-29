import type { Handle } from '@sveltejs/kit';

const SITE_URL = 'https://Convertwith.me';

function getPageJsonLd(routeId: string | null): string {
  switch (routeId) {
    case '/':
      return [
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'ConvertwithMe',
          url: SITE_URL,
          description: 'Privacy-first, client-side file converter. Convert images, documents, and PDFs instantly in your browser with no server uploads.',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          browserRequirements: 'Requires JavaScript. Requires SharedArrayBuffer support for WASM-based conversions (Chrome, Edge, Firefox with HTTPS).'
        }) + '</script>',
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ConvertwithMe',
          url: SITE_URL,
          logo: SITE_URL + '/og-image.png',
          description: 'Privacy-first, client-side file converter. Convert images, documents, and PDFs instantly in your browser with no server uploads.',
          sameAs: ['https://twitter.com/ConvertwithMe', 'https://github.com/ConvertwithMe']
        }) + '</script>',
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'ConvertwithMe',
          url: SITE_URL,
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/convert/{search_term_string}' },
            'query-input': 'required name=search_term_string'
          }
        }) + '</script>',
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }
          ]
        }) + '</script>',
      ].join('\n');

    case '/about':
      return [
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About ConvertwithMe',
          url: SITE_URL + '/about',
          description: 'Learn about ConvertwithMe — a privacy-first, client-side file converter that processes all files locally in your browser using WebAssembly.',
          about: { '@type': 'Organization', name: 'ConvertwithMe', url: SITE_URL }
        }) + '</script>',
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'About', item: SITE_URL + '/about' }
          ]
        }) + '</script>',
      ].join('\n');

    case '/privacy':
      return [
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy — ConvertwithMe',
          url: SITE_URL + '/privacy',
          description: 'Privacy policy for ConvertwithMe — a privacy-first, client-side file converter. Learn how we protect your data.',
          dateModified: '2025-01-01'
        }) + '</script>',
        '<script type="application/ld+json">' + JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: SITE_URL + '/privacy' }
          ]
        }) + '</script>',
      ].join('\n');

    default:
      return '';
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  const needsJsonLdFix = ['/', '/about', '/privacy'].includes(event.route.id ?? '');

  const response = await resolve(event, {
    transformPageChunk: needsJsonLdFix ? ({ html }) => {
      const jsonLd = getPageJsonLd(event.route.id);
      if (!jsonLd) return html;

      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
      html = html.replace('</head>', jsonLd + '\n</head>');
      return html;
    } : undefined
  });

  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless');

  return response;
};