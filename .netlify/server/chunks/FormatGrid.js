import { g as ensure_array_like, a as attr, c as attr_class, e as escape_html, f as stringify } from "./renderer.js";
import { g as getAllSlugs } from "./converterRouter.js";
function FormatGrid($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const slugs = getAllSlugs();
    const formatIcons = {
      jpg: "🖼️",
      png: "🖼️",
      webp: "🖼️",
      gif: "🖼️",
      heic: "📷",
      pdf: "📄",
      docx: "📝",
      html: "🌐"
    };
    const categoryColors = {
      imagemagick: "from-blue-500 to-purple-500",
      pandoc: "from-orange-500 to-red-500",
      mammoth: "from-green-500 to-teal-500",
      pdfjs: "from-yellow-500 to-orange-500",
      pdflib: "from-pink-500 to-rose-500"
    };
    const slugToCategory = {
      "jpg-to-png": "imagemagick",
      "jpg-to-webp": "imagemagick",
      "jpg-to-gif": "imagemagick",
      "png-to-jpg": "imagemagick",
      "png-to-webp": "imagemagick",
      "webp-to-jpg": "imagemagick",
      "webp-to-png": "imagemagick",
      "gif-to-png": "imagemagick",
      "gif-to-jpg": "imagemagick",
      "heic-to-jpg": "imagemagick",
      "heic-to-png": "imagemagick",
      "pdf-to-docx": "pandoc",
      "docx-to-pdf": "pandoc",
      "docx-to-html": "mammoth",
      "pdf-to-jpg": "pdfjs",
      "pdf-to-png": "pdfjs",
      "jpg-to-pdf": "pdflib",
      "png-to-pdf": "pdflib"
    };
    function parseSlug(slug) {
      const parts = slug.split("-to-");
      return { from: parts[0], to: parts[1] };
    }
    let observedCards = /* @__PURE__ */ new Set();
    $$renderer2.push(`<div id="formats" class="w-full"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"><!--[-->`);
    const each_array = ensure_array_like(slugs);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let slug = each_array[i];
      const { from, to } = parseSlug(slug);
      const category = slugToCategory[slug] || "imagemagick";
      const gradient = categoryColors[category];
      const isVisible = observedCards.has(i);
      $$renderer2.push(`<a${attr("href", `/convert/${stringify(slug)}`)} data-sveltekit-prefetch=""${attr_class(`card group p-4 text-center transition-all duration-200 ${stringify(isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}`)} style="transition: opacity 0.4s ease, transform 0.4s ease;"><div${attr_class(`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br ${stringify(gradient)} flex items-center justify-center text-white text-lg font-bold`)}>${escape_html(formatIcons[from] || "📁")}</div> <p class="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">${escape_html(from.toUpperCase())} → ${escape_html(to.toUpperCase())}</p> <p class="text-xs text-gray-400 mt-1">Free &amp; Private</p></a>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  FormatGrid as F
};
