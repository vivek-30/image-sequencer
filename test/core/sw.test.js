const { after } = require('lodash');
// var sw = require('../../examples/sw');

function SWInstallation(registration){
    return new Promise((resolve, reject) => {
      let newWorker = registration.installing;
  
      if (!newWorker) {
        return reject(new Error('error in installing service worker'));
      }
  
      function checkState(e){
        if (e.target.state === 'activated') {
          newWorker.removeEventList('statechange',checkState);
          return resolve();
        }
  
        if (e.target.state === 'redundant') {
          newWorker.removeEventListener('statechange',checkState);
  
          return reject(new Error('installing new service worker now became redundant'));
        }
      };
  
      newWorker.addEventListener('statechange',checkState);
    });
}

function UnRegisterSW(){

    function unregister() {
        return navigator.serviceWorker.getRegistrations()
        .then(function(registrations) {
            var unRegisteredWorker = registrations.map(function(registration) {
            return registration.unregister();
            });
            return Promise.all(unRegisteredWorker);
        });
    }
    
    function clearCaches() {
        return caches.keys()
        .then(function(cache) {
          return Promise.all(cache.map(function(cacheItem) {
            return caches.delete(cacheItem);
          }));
        });
    };
    
    return Promise.all([
        unregister(),
        clearCaches(),
    ]);
}

describe('Service Worker Installation',function() {

    beforeEach(function() {
        return UnRegisterSW();
    });

    afterEach(function() {
        return UnRegisterSW();
    });

    it('Register service worker',function() {
        return navigator.serviceWorker.register('../../examples/sw.js')
        .then(registration => {
            return SWInstallation(registration)
        });
    });   
});
