const CACHE_NAME = 'vector-shell-v1';
const APP_SHELL = [
    './vector.html',
    './manifest.json',
    './icons/vector.svg',
    './about.html',
    './terms.html',
    './tutorial.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys
                .filter(key => key.startsWith('vector-shell-') && key !== CACHE_NAME)
                .map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);
    if (event.request.method !== 'GET' || requestUrl.origin !== self.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(async () => (await caches.match(event.request)) ||
                    (await caches.match('./vector.html')))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cached => cached || fetch(event.request).then(response => {
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                }
                return response;
            }))
    );
});

self.addEventListener('push', event => {
    const payload = event.data ? event.data.json() : {};
    const title = payload.title || 'নতুন তাবাররুক আপডেট';
    const options = {
        body: payload.body || 'আপনার এলাকার জন্য নতুন তথ্য যোগ হয়েছে।',
        icon: './icons/vector.svg',
        data: { url: payload.url || './vector.html' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const targetUrl = new URL(event.notification.data?.url || './vector.html', self.location.href).href;
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            const existing = windowClients.find(client => client.url === targetUrl);
            return existing ? existing.focus() : clients.openWindow(targetUrl);
        })
    );
});
