import styles from './Settings.module.css';

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div className={styles.settingRow}>
      <span className={styles.inlineLabel}>{label}</span>
      <label className={styles.toggle}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  );
};

export const Settings = ({
  timerDuration,
  onTimerChange,
  researchMode,
  onResearchChange,
  challengeType,
  onChallengeChange,
  strictMode,
  onStrictChange,
}) => {
  return (
    <div className={styles.settings}>
      <div className={styles.inner}>
        <div className={styles.title}>// extension settings</div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Wait time</div>
            <div className={styles.cardDesc}>How many seconds before the site unlocks. Longer = more intentional.</div>
            <div className={styles.settingRow}>
              <div className={styles.sliderWrap}>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={timerDuration}
                  onChange={(e) => onTimerChange(Number(e.target.value))}
                />
                <div className={styles.sliderVal}>{timerDuration}s</div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Research mode</div>
            <div className={styles.cardDesc}>Bypass friction for 30 minutes. For when you actually need to be there.</div>
            <Toggle label="Disable friction temporarily" checked={researchMode} onChange={onResearchChange} />
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Challenge type</div>
            <div className={styles.cardDesc}>How you pay the tax. Math for speed. Intent for depth.</div>
            <div className={styles.settingRow}>
              <select className={styles.select} value={challengeType} onChange={(e) => onChallengeChange(e.target.value)}>
                <option value="math">Math problem</option>
                <option value="intent">Write your intent</option>
                <option value="wait">Just wait</option>
              </select>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>Strict mode</div>
            <div className={styles.cardDesc}>Remove the "skip" button entirely. No escape hatch.</div>
            <Toggle label="Hide bypass option" checked={strictMode} onChange={onStrictChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
