import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'You visit a distraction site',
    desc: 'Twitter, Reddit, YouTube. The page starts to load. Focus Tax intercepts before you can scroll.',
  },
  {
    num: '02',
    title: 'Pay the tax',
    desc: 'Solve a simple math problem or write one sentence about why you\'re here. The friction takes 15 seconds. That\'s the point.',
  },
  {
    num: '03',
    title: 'Proceed with intention',
    desc: 'The page reveals. You chose to be here. That changes everything about how you use the next 10 minutes.',
  },
];

export const HowItWorks = () => {
  return (
    <div className={styles.how}>
      <div className={styles.inner}>
        <div className={styles.title}>// how it works</div>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.num} className={styles.step}>
              <div className={styles.num}>{step.num}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.desc}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
