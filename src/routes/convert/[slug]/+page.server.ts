import { getFormatMeta } from "$lib/utils/formatMeta";
import type { PageServerLoad } from "./$types";

const SITE_URL = "https://Convertwith.me";

export const load: PageServerLoad = async ({ params }) => {
  const meta = getFormatMeta(params.slug);
  const canonicalUrl = `${SITE_URL}/convert/${params.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  const parts = params.slug.split("-to-");
  const fromFmt = parts[0]?.toUpperCase() ?? "";
  const toFmt = parts[1]?.toUpperCase() ?? "";

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `ConvertwithMe — ${fromFmt} to ${toFmt} Converter`,
    url: canonicalUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: meta.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Converters",
        item: `${SITE_URL}/#formats`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${fromFmt} to ${toFmt}`,
        item: canonicalUrl,
      },
    ],
  };

  return {
    meta,
    canonicalUrl,
    faqJsonLdScript: '<script type="application/ld+json">' + JSON.stringify(faqJsonLd) + '</script>',
    softwareAppJsonLdScript: '<script type="application/ld+json">' + JSON.stringify(softwareAppJsonLd) + '</script>',
    breadcrumbJsonLdScript: '<script type="application/ld+json">' + JSON.stringify(breadcrumbJsonLd) + '</script>',
  };
};