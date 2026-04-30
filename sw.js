// InfoForge SW v3 — Sin caché agresivo
const CACHE = 'infoforge-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Borrar todos los cachés viejos
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // NO cachear nada — siempre ir a la red
  e.respondWith(fetch(e.request));
});
