// File Org service worker: keeps the app shell and editor components cached.
// Files and data always come live from Google Drive (never cached here).
const SHELL = 'fileorg-shell-v2', LIBS = 'fileorg-libs-v1';
self.addEventListener('install', e => { e.waitUntil(caches.open(SHELL).then(c => c.addAll(['/', '/manifest.webmanifest', '/icons/logo.svg', '/icons/icon-192.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => ![SHELL, LIBS].includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/')) return;
  if (u.pathname.startsWith('/lib/') || u.pathname.startsWith('/icons/')) {
    e.respondWith(caches.open(LIBS).then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cl = r.clone(); caches.open(SHELL).then(c => c.put(e.request, cl)); } return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('/'))));
});
