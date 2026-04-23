import styles from './BrowserChrome.module.css';

export const BrowserChrome = ({ urlBar, children }) => {
  return (
    <div className={styles.browser}>
      <div className={styles.bar}>
        <div className={styles.dots}>
          <div className={`${styles.dot} ${styles.red}`}></div>
          <div className={`${styles.dot} ${styles.yellow}`}></div>
          <div className={`${styles.dot} ${styles.green}`}></div>
        </div>
        <div className={styles.url}>
          <span className={styles.lock}>🔒</span>
          <span>{urlBar}</span>
        </div>
      </div>
      {children}
    </div>
  );
};
