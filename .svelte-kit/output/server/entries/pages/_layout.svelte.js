import { a as attr, e as escape_html, h as head, d as derived, b as store_get, u as unsubscribe_stores } from "../../chunks/renderer.js";
import "clsx";
import { p as page } from "../../chunks/stores.js";
function Navbar($$renderer) {
  let mobileMenuOpen = false;
  $$renderer.push(`<nav class="bg-white border-b border-gray-200 sticky top-0 z-40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16 items-center"><a href="/" class="flex items-center gap-2" data-sveltekit-prefetch=""><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2563EB"></rect><path d="M8 16L14 10L20 16L14 22Z" fill="white"></path><path d="M14 16L20 10L26 16L20 22Z" fill="#93c5fd"></path></svg> <span class="text-xl font-bold text-gray-900">File<span class="text-brand-600">Convert</span></span></a> <div class="hidden md:flex items-center gap-6"><a href="/" class="text-gray-600 hover:text-brand-600 font-medium transition-colors" data-sveltekit-prefetch="">Home</a> <a href="/#formats" class="text-gray-600 hover:text-brand-600 font-medium transition-colors">All Converters</a></div> <button class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu"${attr("aria-expanded", mobileMenuOpen)}>`);
  {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
  }
  $$renderer.push(`<!--]--></button></div></div> `);
  {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></nav>`);
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    $$renderer2.push(`<footer class="bg-gray-900 text-gray-300 mt-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div><div class="flex items-center gap-2 mb-4"><svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2563EB"></rect><path d="M8 16L14 10L20 16L14 22Z" fill="white"></path><path d="M14 16L20 10L26 16L20 22Z" fill="#93c5fd"></path></svg> <span class="text-lg font-bold text-white">File<span class="text-brand-400">Convert</span></span></div> <p class="text-sm text-gray-400">All conversions happen in your browser. We never see your files.</p></div> <div><h3 class="text-white font-semibold mb-4">Quick Links</h3> <ul class="space-y-2 text-sm"><li><a href="/" class="hover:text-white transition-colors" data-sveltekit-prefetch="">Home</a></li> <li><a href="/#formats" class="hover:text-white transition-colors">All Converters</a></li> <li><a href="/privacy" class="hover:text-white transition-colors" data-sveltekit-prefetch="">Privacy Policy</a></li> <li><a href="/about" class="hover:text-white transition-colors">About</a></li></ul></div> <div><h3 class="text-white font-semibold mb-4">Connect</h3> <ul class="space-y-2 text-sm"><li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Twitter / X</a></li> <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">GitHub</a></li></ul></div></div> <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500"><p>© ${escape_html(year)} FileConvert. All rights reserved. All conversions are processed locally in your browser.</p></div></div></footer>`);
  });
}
function StickyFooterAd($$renderer) {
  {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="sticky bottom-0 w-full z-50 bg-white border-t border-gray-300 shadow-lg"><div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between"><div class="monetag-sticky-footer flex-1 text-center text-sm text-gray-400" data-slot="sticky-footer"><p>Advertisement</p></div> <button class="ml-4 p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0" aria-label="Close advertisement"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div>`);
  }
  $$renderer.push(`<!--]-->`);
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let currentUrl = derived(() => store_get($$store_subs ??= {}, "$page", page).url.href);
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<link rel="canonical"${attr("href", currentUrl())}/> <meta property="og:type" content="website"/> <meta property="og:site_name" content="FileConvert"/> <meta property="og:url"${attr("content", currentUrl())}/> <meta property="og:locale" content="en_US"/>`);
    });
    $$renderer2.push(`<div class="min-h-screen flex flex-col">`);
    Navbar($$renderer2);
    $$renderer2.push(`<!----> <main class="flex-1">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----> `);
    StickyFooterAd($$renderer2);
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
