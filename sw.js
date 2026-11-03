// FairPlug service worker: maakt de app installeerbaar en cachet de schil.
const CACHE = 'fairplug-demo-v19';
const FILES = ['./', './index.html', './manifest.webmanifest', './icons/icon-192-v3.png', './icons/icon-512-v3.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
