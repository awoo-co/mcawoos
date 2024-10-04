// service-worker.js

const CACHE_NAME = 'cashier-cache-v1';
const ASSETS_TO_CACHE = [
    './', // Cache the root directory
    './index.html', // Cache the main HTML file
    './style.css', // Cache the CSS file
    './script.js', // Cache the JavaScript file
    './favicon.ico', // Cache the favicon
    './favicon-16x16.png', // Cache the 16x16 favicon
    // Add other assets (images, fonts, etc.) if necessary
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

// Activate event
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
