import styles from './Nav.module.css';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href="#">
        Focus<span className={styles.accent}>Tax</span>
      </a>
      <div className={styles.tag}>// friction as a feature</div>
    </nav>
  );
};
