import { useState } from 'react';

export const useDemoState = () => {
  const [currentSite, setCurrentSite] = useState('twitter');
  const [currentChallenge, setCurrentChallenge] = useState('math');
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [timerDuration, setTimerDuration] = useState(15);
  const [researchMode, setResearchMode] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  const switchSite = (site) => {
    setCurrentSite(site);
    setIsOverlayActive(true);
  };

  const switchChallenge = (challenge) => {
    setCurrentChallenge(challenge);
  };

  const proceed = () => {
    setIsOverlayActive(false);
    setShowSuccessFlash(true);
    setTimeout(() => setShowSuccessFlash(false), 2500);
  };

  const bypass = () => {
    setIsOverlayActive(false);
  };

  const toggleResearchMode = (enabled) => {
    setResearchMode(enabled);
    if (enabled) {
      setIsOverlayActive(false);
    } else {
      setIsOverlayActive(true);
    }
  };

  const toggleStrictMode = (enabled) => {
    setStrictMode(enabled);
  };

  const updateTimerDuration = (newDuration) => {
    setTimerDuration(newDuration);
  };

  return {
    currentSite,
    currentChallenge,
    isOverlayActive,
    timerDuration,
    researchMode,
    strictMode,
    showSuccessFlash,
    switchSite,
    switchChallenge,
    proceed,
    bypass,
    toggleResearchMode,
    toggleStrictMode,
    updateTimerDuration,
  };
};
