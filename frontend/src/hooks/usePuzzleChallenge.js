import { useState, useCallback } from 'react';

export const usePuzzleChallenge = () => {
  const [puzzleId, setPuzzleId] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewPuzzle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setUserInput('');
    setIsCorrect(false);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/puzzle/get');
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
      const response = await fetch('http://127.0.0.1:8000/api/puzzle/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzle_id: puzzleId,
          solution: value
        })
      });
      
      if (!response.ok) return false;
      const data = await response.json();
      setIsCorrect(data.is_match);
      return data.is_match;
    } catch (err) {
      return false;
    }
  };

  const reset = () => {
    setUserInput('');
    setIsCorrect(false);
    fetchNewPuzzle();
  };

  return {
    scrambledWord,
    userInput,
    isCorrect,
    isLoading,
    error,
    generateNew: fetchNewPuzzle,
    checkAnswer,
    reset,
  };
};
