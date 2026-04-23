import { useEffect, useMemo, useState } from 'react';
import styles from './Demo.module.css';
import { BrowserChrome } from './BrowserChrome';
import { SiteSelector } from './SiteSelector';
import { ChallengePanel } from './ChallengePanel';
import { Facebook } from './SiteMocks/Facebook';
import { Twitter } from './SiteMocks/Twitter';
import { Reddit } from './SiteMocks/Reddit';
import { YouTube } from './SiteMocks/YouTube';
import { useTimer } from '../../hooks/useTimer';
import { useMathChallenge } from '../../hooks/useMathChallenge';
import { useIntentChallenge } from '../../hooks/useIntentChallenge';

const siteNames = {
  twitter: 'twitter.com',
  facebook: 'facebook.com',
  reddit: 'reddit.com',
  youtube: 'youtube.com',
};

const targetUrls = {
  twitter: 'https://twitter.com',
  facebook: 'https://facebook.com',
  reddit: 'https://reddit.com',
  youtube: 'https://youtube.com',
};

export const Demo = ({
  timerDuration,
  onTimerChange,
  researchMode,
  onResearchChange,
  challengeType,
  onChallengeChange,
  strictMode,
  onStrictChange,
}) => {
  const [currentSite, setCurrentSite] = useState('twitter');
  const [customUrl, setCustomUrl] = useState('https://en.wikipedia.org');
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  const math = useMathChallenge();
  const intent = useIntentChallenge();

  const timer = useTimer(timerDuration, () => {
    if (challengeType === 'wait') {
      setIsOverlayActive(false);
    }
  });

  const startFlow = () => {
    setIsOverlayActive(true);
    timer.startTimer();
    if (challengeType === 'math') {
      math.generateNew();
    }
    if (challengeType === 'intent') {
      intent.reset();
    }
  };

  useEffect(() => {
    startFlow();
    return () => timer.stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSite, challengeType, timerDuration]);

  useEffect(() => {
    if (researchMode) {
      setIsOverlayActive(false);
      timer.stopTimer();
    } else {
      startFlow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [researchMode]);

  useEffect(() => {
    if (challengeType === 'math' && !math.question) {
      math.generateNew();
    }
  }, [challengeType, math]);

  const canProceed = useMemo(() => {
    if (challengeType === 'math') return math.isCorrect;
    if (challengeType === 'intent') return intent.isValid;
    return timer.timeLeft === 0;
  }, [challengeType, intent.isValid, math.isCorrect, timer.timeLeft]);

  const handleSiteChange = (site) => {
    setCurrentSite(site);
    startFlow();
  };

  const handleProceed = () => {
    setIsOverlayActive(false);
    setShowSuccessFlash(true);
    setTimeout(() => setShowSuccessFlash(false), 2500);
    timer.stopTimer();
  };

  const handleBypass = () => {
    setIsOverlayActive(false);
    timer.stopTimer();
  };

  const siteLabel = currentSite === 'custom' ? customUrl : siteNames[currentSite];
  const urlBar = currentSite === 'custom' ? customUrl : (targetUrls[currentSite] || siteLabel);

  return (
    <div className={styles.demoSection} id="demo">
      {showSuccessFlash ? <div className={styles.successFlash}>Access granted — attention paid.</div> : null}
      <div className={styles.header}>
        <div className={styles.title}>Live demo</div>
        <div className={styles.subtitle}>// pick a site, trigger the tax</div>
      </div>

      <BrowserChrome urlBar={urlBar}>
        <SiteSelector 
          currentSite={currentSite} 
          onSiteChange={handleSiteChange} 
          customUrl={customUrl}
          onCustomUrlChange={setCustomUrl}
        />

        <div className={styles.siteContent}>
          {currentSite === 'twitter' ? <Twitter /> : null}
          {currentSite === 'facebook' ? <Facebook /> : null}
          {currentSite === 'reddit' ? <Reddit /> : null}
          {currentSite === 'youtube' ? <YouTube /> : null}
          {currentSite === 'custom' ? (
            <iframe 
              src={customUrl} 
              className={styles.iframeSite} 
              title="Custom site"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : null}

          {isOverlayActive ? (
            <div className={styles.focusOverlay}>
              <div className={styles.overlayTag}>// focus tax</div>
              <div className={styles.overlayHeading}>Before you scroll —</div>
              <div className={styles.overlaySub}>
                Pay {timerDuration} seconds of attention to proceed to <span>{siteLabel}</span>
              </div>

              <div className={styles.timerRingWrap}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle className={styles.timerTrack} cx="50" cy="50" r="45" />
                  <circle
                    className={styles.timerProgress}
                    cx="50"
                    cy="50"
                    r="45"
                    style={{ strokeDashoffset: 283 * (1 - timer.timeLeft / timerDuration) }}
                  />
                </svg>
                <div className={styles.timerCenter}>
                  <div className={styles.timerNum}>{timer.timeLeft}</div>
                  <div className={styles.timerLabel}>sec</div>
                </div>
              </div>

              <div className={styles.challengeTabs}>
                <button className={`${styles.challengeTab} ${challengeType === 'math' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('math')}>
                  math
                </button>
                <button className={`${styles.challengeTab} ${challengeType === 'intent' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('intent')}>
                  intent
                </button>
                <button className={`${styles.challengeTab} ${challengeType === 'wait' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('wait')}>
                  just wait
                </button>
              </div>

              <ChallengePanel
                mode={challengeType}
                mathQuestion={math.question || 'Loading...'}
                mathInput={math.userInput}
                mathIsCorrect={math.isCorrect}
                onMathChange={math.checkAnswer}
                intentValue={intent.value}
                intentCharCount={intent.charCount}
                intentMinChars={intent.minChars}
                intentIsValid={intent.isValid}
                onIntentChange={intent.handleChange}
              />

              <button className={`${styles.proceedButton} ${canProceed ? styles.ready : ''}`} disabled={!canProceed} onClick={handleProceed}>
                Continue to site →
              </button>
              {!strictMode ? (
                <button className={styles.bypassButton} onClick={handleBypass}>
                  skip (research mode)
                </button>
              ) : null}

              <div className={styles.overlayQuote}>
                "You chose to slow down. What will you do with the attention you just protected?"
              </div>
            </div>
          ) : null}
        </div>
      </BrowserChrome>
    </div>
  );
};
