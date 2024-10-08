const DBname = "IMG_data_saver" 
const DBvar = 1
const DBRequest = indexedDB.open(DBname, DBvar);

DBRequest.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};


DBRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("IMG", {keyPath : 'id'})
};


function get_redirect_url(requestURL) {
  
}

function add_archive(requestURL){
  const data = requestURL
}



function redirect(requestDetails) {
  console.log(`Redirecting: ${requestDetails.url}`);
  if (requestDetails.url === targetUrl) {
    return;
  }
  /*
  return {
    redirectUrl: get_redirect_url(requestDetails.url),
  };
  */
 return {
  redirectUrl: "https://uploads.scratch.mit.edu/get_image/user/121243813_90x90.png"
 }
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    redirect(details)
  },
  { urls: ["<all_urls>"], types: ["image"] ,},
  ["blocking"] 
);

/*
chrome.webRequest.onCompleted.addListener(
  (details) => { add_archive(details.url) }
);
*/

function getFileExtension(contentType) {
  if (contentType.includes("application/json")) {
    return ".json";
  } else if (contentType.includes("text/html")) {
    return ".html";
  } else if (contentType.includes("text/plain")) {
    return ".txt";
  } else if (contentType.includes("application/javascript")) {
    return ".js";
  } else if (contentType.includes("image/png")) {
    return ".png";
  } else if (contentType.includes("image/jpeg")) {
    return ".jpg";
  } else if (contentType.includes("image/gif")) {
    return ".gif";
  } else if (contentType.includes("application/xml")) {
    return ".xml";
  } else if (contentType.includes("application/octet-stream")) {
    return ".bin"; // バイナリデータの場合
  }
  return ""; // 拡張子がわからない場合は空文字
}