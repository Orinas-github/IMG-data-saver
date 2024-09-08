const DBname = "IMG_data_saver" 
const DBvar = 3
const DBOpenRequest = window.indexedDB.open(DBname, DBvar);
function get_redirect_url(requestURL) {

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
