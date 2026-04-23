import { useState } from 'react';

const MIN_CHARS = 20;

export const useIntentChallenge = () => {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    const trimmed = newValue.trim();
    const count = trimmed.length;
    setCharCount(count);
    setIsValid(count >= MIN_CHARS);
  };

  const reset = () => {
    setValue('');
    setCharCount(0);
    setIsValid(false);
  };

  return {
    value,
    charCount,
    minChars: MIN_CHARS,
    isValid,
    handleChange,
    reset,
  };
};
