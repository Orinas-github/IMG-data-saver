// 画像キャッシュを保持する
const cacheKey = 'IMG_data_saver';

// ローカルストレージからキャッシュを取得
let cache = JSON.parse(localStorage.getItem(cacheKey)) || {};

// 画像リクエストのリスナー
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;
    if (cache[url]) {
      // キャッシュがあればリダイレクト
      return { redirectUrl: cache[url] };
    }
  },
  { urls: ["<all_urls>"], types: ["image"] },
  ["blocking"]
);

// リクエスト完了後にキャッシュを更新
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.statusCode === 200) {
      const url = details.url;
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      // キャッシュに保存
      cache[url] = objectUrl;
      localStorage.setItem(cacheKey, JSON.stringify(cache));
    }
  },
  { urls: ["<all_urls>"], types: ["image"] }
);