// service-worker.js

const CACHE_NAME = 'cashier-cache-v1';
const ASSETS_TO_CACHE = [
    './', // Cache the root directory
    './index.html', // Main HTML file
    './style.css', // CSS file
    './script.js', // JavaScript file
    './https://awoo-co.github.io/cdn/favicon.ico', // Favicon
    './display.html', // Customer display HTML
    './tip.html',
    // Add other assets (images, fonts, etc.) if necessary
];

// Install event: cache all required assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
                // If any file fails, log the error but continue
                console.error('Service Worker cache addAll error:', err);
            });
        })
    );
});

// Fetch event: serve cached assets if available, else fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
