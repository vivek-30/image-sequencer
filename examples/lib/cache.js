var setupCache = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/examples/' })
      .then(function(registration) {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          console.log(installingWorker)
          if (installingWorker.state === 'installed') {
            location.reload();
          }
        }
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service worker registration failed, error:', error);
      });
  }

  if ('serviceWorker' in navigator) {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      caches.keys().forEach(function(cacheName){
        $('#clear-cache').append(" " + cacheName).fadeIn();

      }
      return;
    }
    var dbPromise = idb.open('cache-db', 1);
    dbPromise.then(function(db) {
      var tx = db.transaction('caches', 'readwrite');
      var store = tx.objectStore('caches');
      return store.get('new-cache-available');
    }).then(function(out) {
      if (out == undefined) return;
      else {
        $('#clear-cache').append(`New Cache Available ${out.version}`);
        var dbPromise = idb.open('cache-db', 1);
        dbPromise.then(function(db) {
          var tx = db.transaction('caches', 'readwrite');
          var store = tx.objectStore('caches');
          store.delete('new-cache-available');
          return tx.complete;
        });
      }
    });
  }

  $("#clear-cache").click(function() {
    if ('serviceWorker' in navigator) {
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
    }
    location.reload();
  });
}

module.exports = setupCache;
