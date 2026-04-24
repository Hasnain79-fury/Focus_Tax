document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById('site-input');
  const addBtn = document.getElementById('add-btn');
  const siteList = document.getElementById('site-list');
  const timeSlider = document.getElementById('time-slider');
  const timeDisplay = document.getElementById('time-display');
  const challengeSelect = document.getElementById('challenge-select');

  // Load settings
  chrome.storage.local.get(['blockedSites', 'waitTime', 'challengeType'], (res) => {
    const sites = res.blockedSites || ['twitter.com', 'reddit.com', 'youtube.com', 'facebook.com'];
    const waitTime = res.waitTime || 15;
    const challengeType = res.challengeType || 'math';

    timeSlider.value = waitTime;
    timeDisplay.textContent = waitTime + 's';
    challengeSelect.value = challengeType;
    
    renderSites(sites);
  });

  function renderSites(sites) {
    siteList.innerHTML = '';
    sites.forEach(site => {
      const li = document.createElement('li');
      li.textContent = site;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.className = 'remove-btn';
      removeBtn.onclick = () => {
        const newSites = sites.filter(s => s !== site);
        chrome.storage.local.set({ blockedSites: newSites });
        renderSites(newSites);
      };
      li.appendChild(removeBtn);
      siteList.appendChild(li);
    });
  }

  addBtn.onclick = () => {
    const site = siteInput.value.trim().toLowerCase();
    if (site) {
      chrome.storage.local.get(['blockedSites'], (res) => {
        const sites = res.blockedSites || [];
        if (!sites.includes(site)) {
          sites.push(site);
          chrome.storage.local.set({ blockedSites: sites });
          renderSites(sites);
          siteInput.value = '';
        }
      });
    }
  };

  timeSlider.oninput = (e) => {
    const val = e.target.value;
    timeDisplay.textContent = val + 's';
  };

  timeSlider.onchange = (e) => {
    chrome.storage.local.set({ waitTime: parseInt(e.target.value) });
  };

  challengeSelect.onchange = (e) => {
    chrome.storage.local.set({ challengeType: e.target.value });
  };
});
