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
import { usePuzzleChallenge } from '../../hooks/usePuzzleChallenge';

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
  const [bypassStep, setBypassStep] = useState('idle');
  const [isBypassed, setIsBypassed] = useState(false);
  const [showBypassToast, setShowBypassToast] = useState(false);
  const [taxRules, setTaxRules] = useState(null);
  const [simulatedHour, setSimulatedHour] = useState(''); // empty means real time

  const fetchTaxRules = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const hourToUse = simulatedHour !== '' ? parseInt(simulatedHour, 10) : new Date().getHours();
      const headers = import.meta.env.VITE_API_TOKEN ? { 'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}` } : {};
      const res = await fetch(`${API_URL}/api/tax/rules?local_hour=${hourToUse}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setTaxRules(data);
      }
    } catch (e) {
      console.error("Failed to fetch tax rules", e);
    }
  };

  const math = useMathChallenge();
  const intent = useIntentChallenge(taxRules?.min_chars || 20);
  const puzzle = usePuzzleChallenge(taxRules?.required_puzzle_streak || 1);

  const activeChallengeType = taxRules?.forced_challenge || challengeType;

  const timer = useTimer(timerDuration, () => {
    if (activeChallengeType === 'wait') {
      setIsOverlayActive(false);
    }
  });

  const startFlow = () => {
    setIsOverlayActive(true);
    setBypassStep('idle');
    setIsBypassed(false);
    timer.startTimer();
    fetchTaxRules();
    if (challengeType === 'math') {
      math.generateNew();
    }
    if (challengeType === 'intent') {
      intent.reset();
    }
    if (challengeType === 'puzzle') {
      puzzle.reset();
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
    fetchTaxRules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulatedHour]);

  useEffect(() => {
    if (activeChallengeType === 'math' && !math.question) {
      math.generateNew();
    }
    if (activeChallengeType === 'puzzle' && !puzzle.scrambledWord && !puzzle.isLoading) {
      puzzle.generateNew();
    }
  }, [activeChallengeType, math.question, puzzle.scrambledWord, puzzle.isLoading]);

  const canProceed = useMemo(() => {
    if (activeChallengeType === 'math') return math.isCorrect;
    if (activeChallengeType === 'intent') return intent.isValid;
    if (activeChallengeType === 'puzzle') return puzzle.isCorrect;
    return timer.timeLeft === 0;
  }, [activeChallengeType, intent.isValid, math.isCorrect, puzzle.isCorrect, timer.timeLeft]);

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

  const handleBypassInitiate = () => setBypassStep('awareness');
  const handleBypassContinue = () => setBypassStep('reason');
  const handleBypassCancel = () => setBypassStep('idle');
  const handleBypassReason = (reason) => {
    setBypassStep('delay');
    setTimeout(() => {
      setIsOverlayActive(false);
      setShowBypassToast(true);
      setIsBypassed(true);
      setTimeout(() => setShowBypassToast(false), 2500);
      timer.stopTimer();
    }, 2000);
  };

  const siteLabel = currentSite === 'custom' ? customUrl : siteNames[currentSite];
  const urlBar = currentSite === 'custom' ? customUrl : (targetUrls[currentSite] || siteLabel);

  return (
    <div className={styles.demoSection} id="demo">
      {showSuccessFlash ? <div className={styles.successFlash}>Access granted — attention paid.</div> : null}
      {showBypassToast ? <div className={styles.successFlash}>Entered without focus</div> : null}
      <div className={styles.header}>
        <div className={styles.title}>Live demo</div>
        <div className={styles.subtitle}>// pick a site, trigger the tax</div>
        <div className={styles.simulateTime}>
          <label>Simulate Time: </label>
          <select value={simulatedHour} onChange={(e) => setSimulatedHour(e.target.value)}>
            <option value="">Real Time</option>
            <option value="12">12:00 PM (Day)</option>
            <option value="2">2:00 AM (Late Night)</option>
          </select>
        </div>
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

          {isBypassed && !isOverlayActive ? <div className={styles.researchBadge}>Research Mode</div> : null}

          {isOverlayActive ? (
            <div className={styles.focusOverlay}>
              {bypassStep === 'idle' && (
                <>
                  <div className={styles.overlayTag}>// focus tax</div>
                  <div className={styles.overlayHeading}>{taxRules?.message || 'Before you scroll —'}</div>
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

                  {!taxRules?.is_late_night && (
                    <div className={styles.challengeTabs}>
                      <button className={`${styles.challengeTab} ${challengeType === 'math' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('math')}>
                        math
                      </button>
                      <button className={`${styles.challengeTab} ${challengeType === 'intent' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('intent')}>
                        intent
                      </button>
                      <button className={`${styles.challengeTab} ${challengeType === 'puzzle' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('puzzle')}>
                        puzzle
                      </button>
                      <button className={`${styles.challengeTab} ${challengeType === 'wait' ? styles.activeTab : ''}`} onClick={() => onChallengeChange('wait')}>
                        just wait
                      </button>
                    </div>
                  )}

                  <ChallengePanel
                    mode={activeChallengeType}
                    mathQuestion={math.question || 'Loading...'}
                    mathInput={math.userInput}
                    mathIsCorrect={math.isCorrect}
                    onMathChange={math.checkAnswer}
                    intentValue={intent.value}
                    intentCharCount={intent.charCount}
                    intentMinChars={intent.minChars}
                    intentIsValid={intent.isValid}
                    onIntentChange={intent.handleChange}
                    puzzleWord={puzzle.scrambledWord}
                    puzzleInput={puzzle.userInput}
                    puzzleIsCorrect={puzzle.isCorrect}
                    onPuzzleChange={puzzle.checkAnswer}
                    puzzleIsLoading={puzzle.isLoading}
                    puzzleStreak={puzzle.streak}
                    puzzleRequiredStreak={puzzle.requiredStreak}
                  />

                  <button className={`${styles.proceedButton} ${canProceed ? styles.ready : ''}`} disabled={!canProceed} onClick={handleProceed}>
                    Continue to site →
                  </button>
                  {!strictMode ? (
                    <button className={styles.bypassButton} onClick={handleBypassInitiate}>
                      Enter without focus
                    </button>
                  ) : null}

                  <div className={styles.overlayQuote}>
                    "You chose to slow down. What will you do with the attention you just protected?"
                  </div>
                </>
              )}

              {bypassStep === 'awareness' && (
                <div className={styles.bypassCard}>
                  <div className={styles.bypassHeading}>Continue without focus validation?</div>
                  <div className={styles.bypassActions}>
                    <button className={styles.bypassContinueBtn} onClick={handleBypassContinue}>Continue</button>
                    <button className={styles.bypassCancelBtn} onClick={handleBypassCancel}>Go back</button>
                  </div>
                </div>
              )}

              {bypassStep === 'reason' && (
                <div className={styles.bypassCard}>
                  <div className={styles.bypassHeading}>Reason for quick access?</div>
                  <div className={styles.reasonButtons}>
                    <button className={styles.reasonBtn} onClick={() => handleBypassReason('Quick check')}>Quick check</button>
                    <button className={styles.reasonBtn} onClick={() => handleBypassReason('Research')}>Research</button>
                    <button className={styles.reasonBtn} onClick={() => handleBypassReason('Just browsing')}>Just browsing</button>
                  </div>
                </div>
              )}

              {bypassStep === 'delay' && (
                <div className={styles.bypassCard}>
                  <div className={styles.delayText}>Preparing quick access...</div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </BrowserChrome>
    </div>
  );
};
