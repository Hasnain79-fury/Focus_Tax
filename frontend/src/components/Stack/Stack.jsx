import styles from './Stack.module.css';

const items = ['Chrome Extension MV3', 'Vanilla JS', 'chrome.storage.local', 'chrome.scripting API', 'HTML / CSS overlay', 'Zero dependencies'];

export const Stack = () => {
  return (
    <div className={styles.stack}>
      <div className={styles.inner}>
        <div className={styles.title}>// tech stack — no build step, no backend</div>
        <div className={styles.row}>
          {items.map((item) => (
            <div className={styles.chip} key={item}>
              <div className={styles.dot}></div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
