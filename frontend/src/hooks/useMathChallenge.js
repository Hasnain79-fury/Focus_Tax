import { useState } from 'react';
import { generateMathProblem, validateMathAnswer } from '../utils/mathChallenge';

export const useMathChallenge = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const generateNew = () => {
    const problem = generateMathProblem();
    setQuestion(problem.question);
    setAnswer(problem.answer);
    setUserInput('');
    setIsCorrect(false);
  };

  const checkAnswer = (value) => {
    setUserInput(value);
    const isValid = validateMathAnswer(value, answer);
    setIsCorrect(isValid);
    return isValid;
  };

  const reset = () => {
    setUserInput('');
    setIsCorrect(false);
  };

  return {
    question,
    userInput,
    isCorrect,
    generateNew,
    checkAnswer,
    reset,
  };
};
