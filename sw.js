// InfoForge — Service Worker
// Versión actualizada — desactiva caché para siempre mostrar la última versión

const CACHE_NAME = 'infoforge-v4';

// Al instalar — no cachear nada, siempre ir a la red
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Al activar — borrar caches viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — siempre ir a la red primero, sin caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
