module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{js,png,html,css}"
  ],
  "swDest": "dist/sw.js",
  "importScripts": [
    "update-sw.js"
  ]
};