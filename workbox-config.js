module.exports = {
  globDirectory: "dist/",
  globPatterns: [
    "**/*.{js,html,css,png}"
  ],
  swDest: "dist/sw.js",
  navigateFallbackWhitelist: [/^(?!\/__).*/],
  runtimeCaching: [
    {
      // You can use a RegExp as the pattern:
      urlPattern: new RegExp('https://firebasestorage.googleapis.com/v0/b/simple-pics.appspot.com/o/feed.*'),
      handler: 'cacheFirst',
    }
  ],
  clientsClaim: true,
  importScripts: [
    '/update-sw.js',
  ],
};
