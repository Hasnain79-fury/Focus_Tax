chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) return;
  if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) return;
  if (changeInfo.status !== 'loading' && !changeInfo.url) return;

  chrome.storage.local.get(['blockedSites', 'researchUntil'], (res) => {
    const sites = res.blockedSites || ['twitter.com', 'reddit.com', 'youtube.com', 'facebook.com'];
    const researchUntil = res.researchUntil || 0;
    const now = Date.now();

    // Skip if research mode is globally active via popup
    if (now < researchUntil) return;

    const isBlocked = sites.some(site => tab.url.includes(site));
    if (!isBlocked) return;

    // Inject overlay into the tab
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['overlay.js'],
      injectImmediately: true
    }).catch(err => console.log('Script injection failed', err));
    
    chrome.scripting.insertCSS({
      target: { tabId },
      files: ['styles.css']
    }).catch(err => console.log('CSS injection failed', err));
  });
});
