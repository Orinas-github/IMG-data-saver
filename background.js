const CACHE_NAME = 'imageCache';

// 画像リクエストのリスナー
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  event.respondWith(
    caches.match(url).then((cachedResponse) => {
      // キャッシュがあればリターン
      if (cachedResponse) {
        return cachedResponse;
      }

      // リクエストをネットワークへ
      return fetch(event.request).then((response) => {
        // レスポンスがキャッシュ可能か確認
        if (response && response.status === 200) {
          // キャッシュに保存
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(url, responseClone);
          });
        }
        
        return response;
      });
    })
  );
});