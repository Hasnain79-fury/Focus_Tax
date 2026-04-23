import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.eyebrow}>Hackathon concept</div>
      <h1 className={styles.title}>
        Pay<br />
        <em>attention</em>
        <br />
        before<br />
        you spend it.
      </h1>
      <p className={styles.body}>
        We spent decades removing friction from the web. <strong>We got that wrong.</strong>
        <br />
        Focus Tax adds deliberate friction before distraction sites — not to block you, but to make you choose.
      </p>
      <div className={styles.cta}>
        <a href="#demo" className={`${styles.btn} ${styles.btnPrimary}`}>
          Try the demo
        </a>
        <a href="#plan" className={`${styles.btn} ${styles.btnSecondary}`}>
          See the build plan
        </a>
      </div>
    </div>
  );
};
