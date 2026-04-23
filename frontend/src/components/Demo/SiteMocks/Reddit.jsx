import styles from './Reddit.module.css';
import { siteData } from '../../../data/siteData';

export const Reddit = () => {
  const posts = siteData.reddit.posts;

  return (
    <div className={styles.reddit}>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.votes}>
            <div className={`${styles.arrow} ${styles.up}`}>▲</div>
            <div className={styles.score}>{post.votes}</div>
            <div className={styles.arrow}>▼</div>
          </div>
          <div className={styles.body}>
            <div className={styles.sub}>{post.sub}</div>
            <div className={styles.title}>{post.title}</div>
            <div className={styles.meta}>Posted by {post.author} · {post.time} · {post.comments}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
