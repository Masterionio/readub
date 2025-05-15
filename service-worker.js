self.addEventListener("install", event => {
  console.log("Readub service worker installed.");
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  // Offline support can be added here later
});
