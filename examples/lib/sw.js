const request = new XMLHttpRequest();
request.open("GET", "../manifest.json", false);
request.send(null);
const meta = JSON.parse(request.responseText).metadata,
      ver = meta.version,
      betaVer = meta.betaVersion;
const version = (window.location.indexOf('beta') == 0) ? betaVer : ver;
 
const staticCacheName = `image-sequencer-static-v${version}`,
      is

const isVersionNewer = (version, old) => {
    version = version.split('.');
    var major = version[0],
        minor = version[1],
        patch = version[2];
    old = old.split('.');
    var oldMajor = old[0],
        oldMinor = old[1],
        oldPatch = old[2];
    
    if (major > oldMajor) return true
    else if (minor > oldMinor) return true
    else if (patch > oldPatch) return true
    else return false
}

self.addEventListener('install', event => {
  console.log('Attempting to install service worker');
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return isVersionNewer(staticCacheName.slice(-5), cacheName.slice(-5));
        }).map(function(cacheName){

          return caches.delete(cacheName);
        })
      );
    })
  );      
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    if (caches.keys().length < 1){
      caches.open(staticCacheName).then(function(cache) {
        return cache.match(event.request).then(function (response) {

          return response || fetch(event.request).then(function(response) {
            if(event.request.method == "GET")
              cache.put(event.request, response.clone());
              return response;
          });
        });
      });
    }
    else return false;
  );
});
