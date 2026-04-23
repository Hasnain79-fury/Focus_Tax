import styles from './YouTube.module.css';
import { siteData } from '../../../data/siteData';

const thumbGradients = {
  a: styles.thumbA,
  b: styles.thumbB,
  c: styles.thumbC,
  d: styles.thumbD,
  e: styles.thumbE,
  f: styles.thumbF,
};

export const YouTube = () => {
  const videos = siteData.youtube.videos;

  return (
    <div className={styles.youtube}>
      <div className={styles.grid}>
        {videos.map((video) => (
          <div key={video.id} className={styles.card}>
            <div className={`${styles.thumb} ${thumbGradients[video.thumb]}`}></div>
            <div className={styles.info}>
              <div className={styles.chIcon}></div>
              <div>
                <div className={styles.title}>{video.title}</div>
                <div className={styles.sub}>{video.channel} · {video.views}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
