if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw_cached_pages.js')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
}