const cache = {};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    // 画像のリクエストをチェック
    if (details.url.match(/\.(jpeg|jpg|gif|png)$/)) {
      // 既にキャッシュされてるか確認
      if (cache[details.url]) {
        return { redirectUrl: cache[details.url] };
      }
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.statusCode === 200 && details.url.match(/\.(jpeg|jpg|gif|png)$/)) {
      // 画像をキャッシュ
      fetch(details.url)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          cache[details.url] = url;
        });
    }
  },
  { urls: ["<all_urls>"] }
);