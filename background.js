const DBname = "IMG_data_saver" 
const DBvar = 3
const DBOpenRequest = window.indexedDB.open(DBname, DBvar);
function get_redirect_url(requestURL) {
  // 処理が成功しなかった場合を考慮してエラーをキャッチできるようにtryを利用します
  try {
    request.onupgradeneeded = (event) => {
      // event.targetをキャストしないと型エラーで怒られます
      const db = (event.target as IDBRequest).result as IDBDatabase;
      if (!db.objectStoreNames.contains(requestURL)) {
        return;
      }
    };
  
    request.onsuccess = (event) => {
      const db = (event.target as IDBRequest).result as IDBDatabase;
      resolve(db);
    };
  
    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  } catch (error) {
    reject(error);
  }
}


function redirect(requestDetails) {
  console.log(`Redirecting: ${requestDetails.url}`);
  if (requestDetails.url === targetUrl) {
    return;
  }
  return {
    redirectUrl: get_redirect_url(requestDetails.url),
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern], types: ["image"] },
  ["blocking"],
);
