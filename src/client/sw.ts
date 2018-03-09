declare var importScripts: Function;
declare var workbox: any;

importScripts('/precache.js');

workbox.routing.registerRoute(
  new RegExp('https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed.*'),
  workbox.strategies.staleWhileRevalidate()
);
