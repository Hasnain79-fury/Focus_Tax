import styles from './ChallengePanel.module.css';

export const ChallengePanel = ({
  mode,
  mathQuestion,
  mathInput,
  mathIsCorrect,
  onMathChange,
  intentValue,
  intentCharCount,
  intentMinChars,
  intentIsValid,
  onIntentChange,
  puzzleWord,
  puzzleInput,
  puzzleIsCorrect,
  onPuzzleChange,
  puzzleIsLoading,
  puzzleStreak,
  puzzleRequiredStreak,
}) => {
  if (mode === 'math') {
    return (
      <div className={styles.panel + ' ' + styles.active}>
        <div className={styles.question}>{mathQuestion}</div>
        <input
          type="number"
          className={`${styles.input} ${mathIsCorrect ? styles.correct : ''}`}
          placeholder="="
          value={mathInput}
          onChange={(e) => onMathChange(e.target.value)}
        />
      </div>
    );
  }

  if (mode === 'intent') {
    return (
      <div className={styles.panel + ' ' + styles.active}>
        <div className={styles.prompt}>In one sentence, why are you here right now?</div>
        <textarea
          className={styles.textarea}
          placeholder="I'm opening this because..."
          value={intentValue}
          onChange={(e) => onIntentChange(e.target.value)}
        />
        <div className={`${styles.char} ${intentIsValid ? styles.valid : ''}`}>
          {intentIsValid ? 'Ready to proceed' : `${intentCharCount} / ${intentMinChars} chars to unlock`}
        </div>
      </div>
    );
  }

  if (mode === 'puzzle') {
    return (
      <div className={styles.panel + ' ' + styles.active}>
        <div className={styles.prompt}>Unscramble the word to proceed.</div>
        <div className={styles.scrambledWord}>
          {puzzleIsLoading ? 'Loading...' : (puzzleWord === 'error' ? 'Failed to load puzzle' : puzzleWord)}
        </div>
        <input
          type="text"
          className={`${styles.input} ${puzzleIsCorrect ? styles.correct : ''}`}
          placeholder="Your guess..."
          value={puzzleInput}
          onChange={(e) => onPuzzleChange(e.target.value)}
          disabled={puzzleIsLoading || puzzleWord === 'error'}
          autoComplete="off"
        />
        {puzzleRequiredStreak > 1 && (
          <div className={styles.streakIndicator}>
            Solved: {puzzleStreak} / {puzzleRequiredStreak}
          </div>
        )}
      </div>
    );
  }

  if (mode === 'wait') {
    return (
      <div className={styles.panel + ' ' + styles.active}>
        <div className={styles.prompt}>The timer is your only task.<br />Sit with it.</div>
      </div>
    );
  }

  return null;
};
