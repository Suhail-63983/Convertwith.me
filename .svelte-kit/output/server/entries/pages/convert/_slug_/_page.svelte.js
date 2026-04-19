import { c as attr_class, e as escape_html, a as attr, d as derived, f as stringify, h as head, g as ensure_array_like, b as store_get, u as unsubscribe_stores } from "../../../../chunks/renderer.js";
import { p as page } from "../../../../chunks/stores.js";
import { F as FormatGrid } from "../../../../chunks/FormatGrid.js";
function getMimeType(format) {
  const mimeMap = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heic",
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    html: "text/html"
  };
  return mimeMap[format.toLowerCase()] || "application/octet-stream";
}
function getAcceptAttribute(format) {
  const mime = getMimeType(format);
  if (format === "jpg" || format === "jpeg") {
    return "image/jpeg,.jpg,.jpeg";
  }
  if (format === "heic" || format === "heif") {
    return "image/heic,image/heif,.heic,.heif";
  }
  if (format === "pdf") {
    return "application/pdf,.pdf";
  }
  if (format === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx";
  }
  return `${mime},.${format}`;
}
function DropZone($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { fromFormat } = $$props;
    let acceptAttr = derived(() => getAcceptAttribute(fromFormat));
    $$renderer2.push(`<div class="w-full">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attr_class(`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${stringify("border-gray-300 hover:border-brand-400 hover:bg-gray-50")}`)} role="button" tabindex="0"><svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg> <p class="text-lg font-medium text-gray-700 mb-1">Drag &amp; drop your ${escape_html(fromFormat.toUpperCase())} file here</p> <p class="text-sm text-gray-500 mb-4">or click to browse</p> <input id="dropzone-input" type="file"${attr("accept", acceptAttr())} class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    const fromFormat = derived(() => data.fromFormat);
    const toFormat = derived(() => data.toFormat);
    const meta = derived(() => data.meta);
    const canonicalUrl = derived(() => store_get($$store_subs ??= {}, "$page", page).url.href);
    head("1j7lesa", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(meta().title)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", meta().description)}/> <link rel="canonical"${attr("href", canonicalUrl())}/> <meta property="og:title"${attr("content", meta().title)}/> <meta property="og:description"${attr("content", meta().description)}/> <meta property="og:url"${attr("content", canonicalUrl())}/> `);
      $$renderer3.push(`<script type="application/ld+json">{JSON.stringify(faqJsonLd)}<\/script>`);
    });
    $$renderer2.push(`<section class="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white py-16"><div class="max-w-4xl mx-auto px-4 text-center"><h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">${escape_html(meta().h1)}</h1> <p class="text-brand-100 text-lg max-w-2xl mx-auto">${escape_html(meta().description)}</p></div></section> <section class="max-w-4xl mx-auto px-4 -mt-8"><div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">`);
    {
      $$renderer2.push("<!--[1-->");
      DropZone($$renderer2, { fromFormat: fromFormat() });
    }
    $$renderer2.push(`<!--]--></div></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="max-w-4xl mx-auto px-4 py-16"><h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="card p-6 text-center"><div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3">1</div> <h3 class="font-semibold text-gray-900 mb-2">Upload</h3> <p class="text-sm text-gray-600">Drag and drop or browse for your ${escape_html(fromFormat().toUpperCase())} file. It stays on your device.</p></div> <div class="card p-6 text-center"><div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3">2</div> <h3 class="font-semibold text-gray-900 mb-2">Convert</h3> <p class="text-sm text-gray-600">Your file is converted locally in your browser. No data ever leaves your device.</p></div> <div class="card p-6 text-center"><div class="w-10 h-10 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold mb-3">3</div> <h3 class="font-semibold text-gray-900 mb-2">Download</h3> <p class="text-sm text-gray-600">Download your ${escape_html(toFormat().toUpperCase())} file instantly. No email or account needed.</p></div></div></section> <section class="bg-white py-16"><div class="max-w-4xl mx-auto px-4"><h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use This ${escape_html(fromFormat().toUpperCase())} to ${escape_html(toFormat().toUpperCase())} Converter</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="flex gap-4"><div class="w-10 h-10 flex-shrink-0 bg-green-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div> <div><h3 class="font-semibold text-gray-900">100% Private</h3> <p class="text-sm text-gray-600">Your files never leave your device. No server uploads, no data collection.</p></div></div> <div class="flex gap-4"><div class="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div> <div><h3 class="font-semibold text-gray-900">Lightning Fast</h3> <p class="text-sm text-gray-600">No upload/download wait. Conversion happens instantly on your device.</p></div></div> <div class="flex gap-4"><div class="w-10 h-10 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div> <div><h3 class="font-semibold text-gray-900">No Limits</h3> <p class="text-sm text-gray-600">No daily caps, no file size limits, no watermarks, no sign-up required.</p></div></div> <div class="flex gap-4"><div class="w-10 h-10 flex-shrink-0 bg-yellow-100 rounded-lg flex items-center justify-center"><svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div> <div><h3 class="font-semibold text-gray-900">Secure</h3> <p class="text-sm text-gray-600">Runs over HTTPS with browser-grade security. No third-party servers involved.</p></div></div></div></div></section> `);
    if (meta().faq && meta().faq.length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="max-w-4xl mx-auto px-4 py-16"><h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2> <div class="space-y-4"><!--[-->`);
      const each_array = ensure_array_like(meta().faq);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        $$renderer2.push(`<details class="card group"><summary class="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 hover:text-brand-600 transition-colors"><span>${escape_html(item.question)}</span> <svg class="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary> <div class="px-4 pb-4 text-sm text-gray-600">${escape_html(item.answer)}</div></details>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="max-w-7xl mx-auto px-4 py-16"><h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">More Converters</h2> `);
    FormatGrid($$renderer2);
    $$renderer2.push(`<!----></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
