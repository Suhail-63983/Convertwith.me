/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference types="vite/client" />

const CACHE_NAME = "wasm-cache-v1";

const WASM_URLS: Record<string, string[]> = {
  imagemagick: [
    "https://cdn.jsdelivr.net/npm/@imagemagick/magick-wasm@0.0.35/dist/magick.wasm",
  ],
  pandoc: [
    "https://cdn.jsdelivr.net/npm/pandoc-wasm@0.1.3/dist/pandoc.mjs",
    "https://cdn.jsdelivr.net/npm/pandoc-wasm@0.1.3/dist/pandoc.wasm",
  ],
  pdfjs: [],
  pdflib: [],
  mammoth: [],
};

const PRECACHE_URLS: string[] = Object.values(WASM_URLS).flat();

// @ts-ignore - service worker context
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }),
  );
  self.skipWaiting();
});

// @ts-ignore - service worker context
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

// @ts-ignore - service worker context
self.addEventListener("fetch", (event) => {
  const isWasmRequest =
    event.request.url.includes(".wasm") ||
    event.request.url.includes("pandoc-wasm") ||
    event.request.url.includes("magick-wasm");

  if (!isWasmRequest) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return new Response("Network error", { status: 503 });
        });
    }),
  );
});

// @ts-ignore - service worker context
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_WASM") {
    const { urls } = event.data;
    if (urls && urls.length > 0) {
      caches.open(CACHE_NAME).then((cache) => {
        cache.addAll(urls);
      });
    }
  }
});
