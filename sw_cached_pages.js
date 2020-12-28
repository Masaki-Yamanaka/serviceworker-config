const cacheName = 'v1';

const cacheAssets = [
  'index.html',
  'main.js'
]

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('install')
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('activate')
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("clearing")
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service worker: Fetching')
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  )
})