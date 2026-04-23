import styles from './Twitter.module.css';
import { siteData } from '../../../data/siteData';

const avatarColorMap = {
  blue: styles.blue,
  green: styles.green,
  purple: styles.purple,
};

export const Twitter = () => {
  const posts = siteData.twitter.posts;

  return (
    <div className={styles.twitter}>
      <div className={styles.header}>
        <div className={styles.tab + ' ' + styles.active}>For you</div>
        <div className={styles.tab}>Following</div>
      </div>
      <div className={styles.feed}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={`${styles.avatar} ${avatarColorMap[post.avatar]}`}></div>
            <div className={styles.content}>
              <span className={styles.name}>{post.name}</span>
              <span className={styles.handle}>{post.handle} · {post.time}</span>
              <div className={styles.text}>{post.text}</div>
              <div className={styles.actions}>
                {post.actions.map((action, idx) => (
                  <span key={idx} className={styles.action}>
                    {action.icon} {action.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
