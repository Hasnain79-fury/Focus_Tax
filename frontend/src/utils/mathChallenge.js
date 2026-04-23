export const generateMathProblem = () => {
  const a = Math.floor(Math.random() * 12) + 3;
  const b = Math.floor(Math.random() * 12) + 3;

  const ops = [
    { q: `${a} × ${b}`, a: a * b },
    { q: `${a * b} ÷ ${a}`, a: b },
    { q: `${a} + ${b * 2}`, a: a + b * 2 },
    { q: `${a * 3} − ${b}`, a: a * 3 - b },
  ];

  const pick = ops[Math.floor(Math.random() * ops.length)];
  return {
    question: pick.q + ' = ?',
    answer: pick.a,
  };
};

export const validateMathAnswer = (userAnswer, correctAnswer) => {
  const val = parseInt(userAnswer);
  return val === correctAnswer;
};
