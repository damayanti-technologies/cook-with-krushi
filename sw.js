/**
 * Cook With Krushi - Service Worker (cwk-v1)
 * Offline static caching, network-first JSON data, and offline fallback.
 * Powered by Damayanti Technologies
 */

const CACHE_NAME = 'cwk-static-v1';
const DATA_CACHE_NAME = 'cwk-data-v1';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/explore.html',
  '/categories.html',
  '/category.html',
  '/recipe.html',
  '/prepare.html',
  '/cook.html',
  '/what-can-i-cook.html',
  '/cooking-guide.html',
  '/my-kitchen.html',
  '/about.html',
  '/contact.html',
  '/privacy-policy.html',
  '/terms.html',
  '/offline.html',
  '/manifest.json',
  '/css/style.css',
  '/css/components.css',
  '/js/storage.js',
  '/js/db.js',
  '/js/api.js',
  '/js/audio.js',
  '/js/timer.js',
  '/js/confetti.js',
  '/js/utils.js',
  '/js/i18n.js',
  '/js/app.js',
  '/data/categories.json',
  '/data/glossary.json',
  '/data/translations.json',
  '/data/recipes/breakfast.json',
  '/data/recipes/lunch.json',
  '/data/recipes/dinner.json',
  '/data/recipes/snacks.json',
  '/data/recipes/desserts.json',
  '/data/recipes/starters.json',
  '/data/recipes/drinks.json',
  '/data/recipes/chutneys.json',
  '/data/recipes/healthy-food.json',
  '/data/recipes/special-occasions.json'
];

// Install: precache essential static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Add all core assets, ignore single missing file to prevent install failure
      return Promise.all(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => console.warn(`Precache skipped ${url}:`, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET requests or chrome-extension URLs
  if (event.request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. JSON Data Requests: Network first, cache fallback
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(DATA_CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 2. HTML navigation requests: Network first, cache fallback, then offline.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // 3. Static assets & Images: Cache first, network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and image, return nothing or placeholder
          return new Response('', { status: 408, statusText: 'Offline' });
        });
    })
  );
});
