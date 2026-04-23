import styles from './Stance.module.css';

export const Stance = () => {
  return (
    <div className={styles.stance}>
      <div className={styles.label}>// the position</div>
      <div className={styles.body}>
        Attention is the only non-renewable resource you have.
        Every scroll, autoplay, and infinite feed was engineered to harvest it without asking.
        <br />
        <br />
        <strong>Focus Tax doesn't block the site. It bills you first.</strong>
        <br />
        You can always pay and proceed. But you have to choose to.
      </div>
    </div>
  );
};
