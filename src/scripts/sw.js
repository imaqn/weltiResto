import 'regenerator-runtime';
import CacheHelper from './utils/cache';

const { assets } = global.serviceWorkerOption;

globalThis.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});

globalThis.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

globalThis.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
