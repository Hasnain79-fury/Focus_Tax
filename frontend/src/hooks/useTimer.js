import { useEffect, useRef, useState } from 'react';

export const useTimer = (duration, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(duration);
    setProgress(100);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(intervalRef.current);
          if (onComplete) onComplete();
          return 0;
        }
        setProgress((newTime / duration) * 100);
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(duration);
    setProgress(100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    timeLeft,
    progress,
    startTimer,
    stopTimer,
    resetTimer,
    setDuration: (newDuration) => {
      setTimeLeft(newDuration);
      setProgress(100);
    },
  };
};
