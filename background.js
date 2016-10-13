chrome.browserAction.onClicked.addListener(function (tab) {
   chrome.tabs.executeScript({
       file: 'jquery.js'
   });
   chrome.tabs.executeScript({
       file: 'script.js'
   });
});
console.log("hi");
