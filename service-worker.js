const CACHE_NAME = "sorz-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/img/logo.webp",
  "/print1.png",
  "/print2.png",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Instalação: salva os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // força ativação imediata
});

// Ativação: remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // assume controle das abas abertas
});

// Intercepta requisições: cache-first com fallback para rede
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          // Offline fallback básico (pode personalizar)
          caches.match("/offline.html")
        )
      );
    })
  );
});
