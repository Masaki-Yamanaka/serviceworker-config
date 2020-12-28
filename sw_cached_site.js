const cacheName = 'v2';



// Call Install Event
self.addEventListener('install', (e) => {
  console.log('install')
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
  e.respondWith(fetch(e.request)
    .then(res => {
      // make copy of response 
      const resClone = res.clone();
      // Open cache
      caches.open(cacheName)
        .then((cache) => {
          // Add response to cache
          cache.put(e.request, resClone)
        })
      return res
    })
    .catch(err => caches.match(e.request)
      .then(res => res))
  )
})