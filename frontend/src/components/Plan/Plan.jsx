import styles from './Plan.module.css';

const dayOneTasks = [
  ['AM', 'Setup: Manifest V3 structure, popup.html, chrome.storage wired up. Blocklist UI working.'],
  ['PM', 'Core friction: URL detection → overlay injection → timer countdown → bypass on success.'],
  ['PM', 'Challenge modes: Math problem generation + intent text input. Both unlock the page.'],
];

const dayTwoTasks = [
  ['AM', 'Research mode toggle: 30-min bypass window. sessionStorage so refresh doesn\'t reset it.'],
  ['AM', 'Edge cases: Handle refresh, new tab, iframe quirks, CSP restrictions in MV3.'],
  ['PM', 'Demo + pitch: README, 90-second video, package as .zip. Lead with the stance.'],
];

const Day = ({ title, tag, tasks }) => (
  <div className={styles.day}>
    <div className={styles.dayHeader}>
      <div className={styles.dayTitle}>{title}</div>
      <div className={styles.dayTag}>{tag}</div>
    </div>
    <div className={styles.tasks}>
      {tasks.map(([time, text]) => (
        <div className={styles.task} key={`${title}-${time}-${text.slice(0, 12)}`}>
          <div className={styles.taskTime}>{time}</div>
          <div className={styles.taskText}>{text}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Plan = () => {
  return (
    <div className={styles.plan} id="plan">
      <div className={styles.title}>48-hour build plan</div>
      <div className={styles.grid}>
        <Day title="Day 1" tag="foundation" tasks={dayOneTasks} />
        <Day title="Day 2" tag="polish + ship" tasks={dayTwoTasks} />
      </div>
    </div>
  );
};
