self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // Basic network-first for all requests; this keeps the app simple.
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)));
});
