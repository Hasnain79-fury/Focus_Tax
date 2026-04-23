import styles from './Facebook.module.css';
import { siteData } from '../../../data/siteData';

const avatarColorMap = {
  blue: styles.blue,
  green: styles.green,
  purple: styles.purple,
};

export const Facebook = () => {
  const posts = siteData.facebook.posts;

  return (
    <div className={styles.facebook}>
      <div className={styles.header}>
        <div className={styles.search}>Search Facebook</div>
      </div>
      <div className={styles.feed}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <div className={styles.top}>
              <div className={`${styles.avatar} ${avatarColorMap[post.avatar]}`}></div>
              <div>
                <div className={styles.name}>{post.name}</div>
                <div className={styles.time}>{post.time}</div>
              </div>
            </div>
            <div className={styles.text}>{post.text}</div>
            <div className={styles.stats}>
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.action}>Like</button>
              <button type="button" className={styles.action}>Comment</button>
              <button type="button" className={styles.action}>Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
