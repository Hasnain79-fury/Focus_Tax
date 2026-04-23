import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>FOCUS TAX — HACKATHON DEMO — 2025</div>
      <div className={styles.stance}>"We didn't build a blocker. We built a mirror."</div>
    </footer>
  );
};
