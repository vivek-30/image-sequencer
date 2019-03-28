function userPreferenceManager(options) {

  options.dbName = options.dbName || 'user-prefs';
  options.storeName = options.storeName || 'user-prefs';
  
  if (!('indexedDB' in window)) {
    return { error: 'indexedDB not supported' };
  }
  
  this.storeName = options.storeName;
  this.dbName = options.dbName;
  
  const db = idb.open(dbName, 1, (upgradeDB) => {
    if (!upgradeDb.objectStoreNames.contains(options.storeName)) {
      upgradeDB.createObjectStore(options.storeName, {keyPath: 'preference'});
    }
  }
                      
  this.prototype.addPref = (prefName, preference, cb) => {addPref(db, {preference: prefName, ... preference}, options, cb)};
  this.prototype.updatePref = (prefName, preference, cb) => {updatePref(db, {preference: prefName, ... preference}, options, cb)};
  this.prototype.deletePref = (prefName, cb) => {deletePref(db, prefName, options, cb)};
  this.prototype.getPref = (prefName, cb) => {getPref(db, prefName, options, cb)};
  this.prototype.new = () => {return new userPreferenceManager(options)};
      
  return this;
}
    
function addPref(db, preference, options, cb) {
  db.then((dbSnap) => {
    var tx = dbSnap.transaction(options.storeName, 'readwrite');
    tx.objectStore(options.storeName).add(preference);
    return tx.complete;
  }).then(cb);
}

function updatePref(db, preference, options, cb) {
  db.then((dbSnap) => {
    var tx = dbSnap.transaction(options.storeName, 'readwrite');
    tx.objectStore(options.storeName).put(preference);
    return tx.complete;
  }).then(cb);
}
    
function deletePref(db, prefName, options, cb) {
  db.then((dbSnap) => {
    var tx = dbSnap.transaction(options.storeName, 'readwrite');
    tx.objectStore(options.storeName).delete(prefName);
    return tx.complete;
  }).then(cb);
}
    
function getPref(db, prefName, options, cb) {
  db.then((dbSnap) => {
    var tx = dbSnap.transaction(options.storeName, 'readwrite');
    var store = tx.objectStore(options.storeName, 'readwrite');
    return store.get(prefName);
  }).then(cb);
}
