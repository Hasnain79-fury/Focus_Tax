import { useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const usePuzzleChallenge = (requiredStreak = 1) => {
  const [puzzleId, setPuzzleId] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streak, setStreak] = useState(0);

  const fetchNewPuzzle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setUserInput('');
    setIsCorrect(false);
    
    try {
      const headers = import.meta.env.VITE_API_TOKEN ? { 'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}` } : {};
      const response = await fetch(`${API_URL}/api/puzzle/get`, { headers });
      if (!response.ok) throw new Error('Failed to fetch puzzle');
      const data = await response.json();
      
      setPuzzleId(data.puzzle_id);
      setScrambledWord(data.scrambled_word);
    } catch (err) {
      setError(err.message);
      setScrambledWord('error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkAnswer = async (value) => {
    setUserInput(value);
    
    if (value.length !== scrambledWord.length || !puzzleId) {
      setIsCorrect(false);
      return false;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...(import.meta.env.VITE_API_TOKEN ? { 'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}` } : {})
      };
      const response = await fetch(`${API_URL}/api/puzzle/match`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          puzzle_id: puzzleId,
          solution: value
        })
      });
      
      if (!response.ok) return false;
      const data = await response.json();
      
      if (data.is_match) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        
        if (newStreak >= requiredStreak) {
          setIsCorrect(true);
        } else {
          // Immediately fetch next puzzle for streak
          fetchNewPuzzle();
        }
      } else {
        // Incorrect guess: do not reset streak
        setIsCorrect(false);
        setUserInput('');
      }
      return data.is_match;
    } catch {
      return false;
    }
  };

  const reset = () => {
    setUserInput('');
    setIsCorrect(false);
    setStreak(0);
    fetchNewPuzzle();
  };

  return {
    scrambledWord,
    userInput,
    isCorrect,
    isLoading,
    error,
    streak,
    requiredStreak,
    generateNew: fetchNewPuzzle,
    checkAnswer,
    reset,
  };
};
