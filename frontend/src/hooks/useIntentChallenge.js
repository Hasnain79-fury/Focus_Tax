import { useState } from 'react';

export const useIntentChallenge = (minChars = 20) => {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    const trimmed = newValue.trim();
    const count = trimmed.length;
    setCharCount(count);
    setIsValid(count >= minChars);
  };

  const reset = () => {
    setValue('');
    setCharCount(0);
    setIsValid(false);
  };

  return {
    value,
    charCount,
    minChars,
    isValid,
    handleChange,
    reset,
  };
};
