const CACHE_NAME = 'goldenbell-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting()) // 즉시 활성화
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Network First 전략: 무조건 네트워크에서 최신 버전을 먼저 가져옵니다. (자동 업데이트 기능)
  // 인터넷이 끊긴 오프라인 상태일 때만 캐시(저장된) 파일을 사용합니다.
  event.respondWith(
    fetch(event.request).then(response => {
      return caches.open(CACHE_NAME).then(cache => {
        // GET 요청일 경우에만 최신 파일을 캐시에 백업
        if(event.request.method === 'GET' && response.status === 200) {
            cache.put(event.request, response.clone());
        }
        return response;
      });
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
