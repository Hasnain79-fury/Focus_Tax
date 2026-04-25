// Run immediately
if (sessionStorage.getItem('focusTaxPassed') === 'true') {
  // Check if we need to show research badge
  if (sessionStorage.getItem('focusTaxBypassed') === 'true') {
    const addBadge = () => {
      if (!document.getElementById('ft-research-badge')) {
        const badge = document.createElement('div');
        badge.id = 'ft-research-badge';
        badge.textContent = 'Research Mode';
        document.body.appendChild(badge);
      }
    };
    if (document.body) addBadge();
    else document.addEventListener('DOMContentLoaded', addBadge);
  }
} else {
  // Hide the page immediately to prevent seeing the blocked site
  document.documentElement.style.visibility = 'hidden';

  if (document.body) {
    initOverlay();
  } else {
    document.addEventListener('DOMContentLoaded', initOverlay);
  }
}

const PUZZLE_WORDS = ['focus', 'breathe', 'pause', 'calm', 'steady', 'intent', 'reflect', 'clarity'];

function scrambleWord(word) {
  let arr = word.split('');
  let scrambled = word;
  while (scrambled === word && word.length > 1) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    scrambled = arr.join('');
  }
  return scrambled;
}

function initOverlay() {
  // Restore visibility so the overlay can be seen
  document.documentElement.style.visibility = '';

  // Hide document scroll but don't hide everything (so it serves as background)
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  // Fetch settings
  chrome.storage.local.get(['waitTime', 'challengeType'], (res) => {
    const timerDuration = res.waitTime || 15;
    let challengeType = res.challengeType || 'math';
    let timeLeft = timerDuration;

    const hour = new Date().getHours();
    // TODO: Revert this back to `hour >= 23 || hour <= 4` after testing!
    //const isLateNight = true; // FORCE NIGHT MODE FOR TESTING
    const isLateNight = hour >= 23 || hour <= 4;
    let puzzleRequiredStreak = 1;

    if (isLateNight) {
      challengeType = 'puzzle';
      puzzleRequiredStreak = 5;
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'focus-tax-overlay';

    function renderState(state) {
      if (state === 'idle') {
        overlay.innerHTML = `
          <div class="ft-inner">
            <div class="ft-tag">// focus tax</div>
            <h1 class="ft-title">${isLateNight ? "It's late. Your brain needs to rest." : "Before you scroll —"}</h1>
            <p class="ft-sub">${isLateNight ? `Complete ${puzzleRequiredStreak} puzzles to proceed to <span>${window.location.hostname}</span>` : `Pay ${timerDuration} seconds of attention to proceed to <span>${window.location.hostname}</span>`}</p>
            
            <div class="ft-timer-wrap" ${isLateNight ? 'style="display: none;"' : ''}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle class="ft-track" cx="50" cy="50" r="45" />
                <circle class="ft-progress" cx="50" cy="50" r="45" id="ft-circle" />
              </svg>
              <div class="ft-timer-center">
                <div class="ft-timer-num" id="ft-timer">${timeLeft}</div>
                <div class="ft-timer-label">sec</div>
              </div>
            </div>

            ${isLateNight ? '' : `
            <div class="ft-tabs">
              <button class="ft-tab ${challengeType === 'math' ? 'active' : ''}" data-type="math">math</button>
              <button class="ft-tab ${challengeType === 'intent' ? 'active' : ''}" data-type="intent">intent</button>
              <button class="ft-tab ${challengeType === 'puzzle' ? 'active' : ''}" data-type="puzzle">puzzle</button>
              <button class="ft-tab ${challengeType === 'wait' ? 'active' : ''}" data-type="wait">just wait</button>
            </div>
            `}

            <div id="ft-challenge-container"></div>

            <button id="ft-proceed" disabled>Continue to site →</button>
            <button id="ft-bypass-init">Enter without focus</button>

            <p class="ft-quote">"You chose to slow down. What will you do with the attention you just protected?"</p>
          </div>
        `;
        setupIdleState();
      } else if (state === 'awareness') {
        overlay.innerHTML = `
          <div class="ft-inner ft-bypass-card">
            <h1 class="ft-title">Continue without focus validation?</h1>
            <div class="ft-bypass-actions">
              <button id="ft-bypass-cont" class="ft-btn-ghost">Continue</button>
              <button id="ft-bypass-cancel" class="ft-btn-solid">Go back</button>
            </div>
          </div>
        `;
        document.getElementById('ft-bypass-cont').onclick = () => renderState('reason');
        document.getElementById('ft-bypass-cancel').onclick = () => renderState('idle');
      } else if (state === 'reason') {
        overlay.innerHTML = `
          <div class="ft-inner ft-bypass-card">
            <h1 class="ft-title">Reason for quick access?</h1>
            <div class="ft-reason-buttons">
              <button class="ft-reason-btn">Quick check</button>
              <button class="ft-reason-btn">Research</button>
              <button class="ft-reason-btn">Just browsing</button>
            </div>
          </div>
        `;
        document.querySelectorAll('.ft-reason-btn').forEach(btn => {
          btn.onclick = () => renderState('delay');
        });
      } else if (state === 'delay') {
        overlay.innerHTML = `
          <div class="ft-inner ft-bypass-card">
            <div class="ft-delay-text">Preparing quick access...</div>
          </div>
        `;
        setTimeout(() => {
          unlockSite(true);
        }, 2000);
      }
    }

    let intervalId;
    let isMathCorrect = false;
    let isIntentValid = false;
    let isPuzzleCorrect = false;
    let puzzleStreak = 0;
    let currentPuzzleWord = '';

    function setupIdleState() {
      const timerEl = document.getElementById('ft-timer');
      const circleEl = document.getElementById('ft-circle');
      const proceedBtn = document.getElementById('ft-proceed');
      const container = document.getElementById('ft-challenge-container');

      // Setup tabs
      document.querySelectorAll('.ft-tab').forEach(tab => {
        tab.onclick = (e) => {
          challengeType = e.target.dataset.type;
          renderState('idle');
        };
      });

      // Render challenge
      if (challengeType === 'math') {
        const a = Math.floor(Math.random() * 12) + 3;
        const b = Math.floor(Math.random() * 9) + 2;
        const answer = a * b;
        container.innerHTML = `
          <div class="ft-panel">
            <div class="ft-math-q">${a} × ${b}</div>
            <input type="number" id="ft-math-input" placeholder="=" class="ft-input" />
          </div>
        `;
        document.getElementById('ft-math-input').addEventListener('input', (e) => {
          isMathCorrect = parseInt(e.target.value) === answer;
          if (isMathCorrect) e.target.classList.add('ft-success');
          else e.target.classList.remove('ft-success');
          checkProceed();
        });
        isMathCorrect = false;
      } else if (challengeType === 'intent') {
        container.innerHTML = `
          <div class="ft-panel">
            <textarea id="ft-intent-input" placeholder="I am here because..." class="ft-textarea"></textarea>
            <div class="ft-char-count" id="ft-char-count">0/20 characters</div>
          </div>
        `;
        document.getElementById('ft-intent-input').addEventListener('input', (e) => {
          const len = e.target.value.trim().length;
          document.getElementById('ft-char-count').textContent = `${len}/20 characters`;
          isIntentValid = len >= 20;
          if (isIntentValid) e.target.classList.add('ft-success');
          else e.target.classList.remove('ft-success');
          checkProceed();
        });
        isIntentValid = false;
      } else if (challengeType === 'puzzle') {
        const renderPuzzle = () => {
          currentPuzzleWord = PUZZLE_WORDS[Math.floor(Math.random() * PUZZLE_WORDS.length)];
          const scrambled = scrambleWord(currentPuzzleWord);

          container.innerHTML = `
            <div class="ft-panel">
              <div class="ft-puzzle-word">${scrambled}</div>
              <input type="text" id="ft-puzzle-input" placeholder="Your guess..." class="ft-input" autocomplete="off" />
              ${puzzleRequiredStreak > 1 ? `<div class="ft-streak-indicator">Solved: ${puzzleStreak} / ${puzzleRequiredStreak}</div>` : ''}
            </div>
          `;

          const inputEl = document.getElementById('ft-puzzle-input');
          inputEl.focus();
          inputEl.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (val.length === currentPuzzleWord.length) {
              if (val === currentPuzzleWord) {
                puzzleStreak++;
                if (puzzleStreak >= puzzleRequiredStreak) {
                  isPuzzleCorrect = true;
                  e.target.classList.add('ft-success');
                  checkProceed();
                } else {
                  renderPuzzle();
                }
              } else {
                e.target.value = '';
              }
            }
          });
        };
        renderPuzzle();
        isPuzzleCorrect = false;
      } else {
        container.innerHTML = `<div class="ft-panel"><div class="ft-wait-msg">Take a deep breath.</div></div>`;
      }

      function checkProceed() {
        let canProceed = false;
        if (challengeType === 'math') canProceed = isMathCorrect;
        else if (challengeType === 'intent') canProceed = isIntentValid;
        else if (challengeType === 'puzzle') canProceed = isPuzzleCorrect;
        else canProceed = (timeLeft <= 0); // 'wait' mode

        if (canProceed) {
          proceedBtn.disabled = false;
          proceedBtn.classList.add('ready');
        } else {
          proceedBtn.disabled = true;
          proceedBtn.classList.remove('ready');
        }
      }

      // Timer Logic (avoid multiple intervals)
      clearInterval(intervalId);

      function updateTimerDisplay() {
        timerEl.textContent = timeLeft;
        const offset = 283 * (1 - (timeLeft / timerDuration));
        circleEl.style.strokeDashoffset = offset;
        checkProceed();
      }

      updateTimerDisplay(); // Initial update

      if (timeLeft > 0) {
        intervalId = setInterval(() => {
          timeLeft--;
          updateTimerDisplay();
          if (timeLeft <= 0) {
            clearInterval(intervalId);
          }
        }, 1000);
      }

      proceedBtn.onclick = () => unlockSite(false);
      document.getElementById('ft-bypass-init').onclick = () => {
        clearInterval(intervalId);
        renderState('awareness');
      };
    }

    function unlockSite(viaBypass) {
      sessionStorage.setItem('focusTaxPassed', 'true');
      if (viaBypass) {
        sessionStorage.setItem('focusTaxBypassed', 'true');
      }
      document.body.style.overflow = originalOverflow;
      overlay.remove();

      // Show toast
      const toast = document.createElement('div');
      toast.id = 'ft-toast';
      toast.textContent = viaBypass ? 'Entered without focus' : 'Access granted — attention paid.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);

      // Add badge if bypass
      if (viaBypass) {
        const badge = document.createElement('div');
        badge.id = 'ft-research-badge';
        badge.textContent = 'Research Mode';
        document.body.appendChild(badge);
      }
    }

    // Initial render
    document.body.appendChild(overlay);
    renderState('idle');
  });
}
