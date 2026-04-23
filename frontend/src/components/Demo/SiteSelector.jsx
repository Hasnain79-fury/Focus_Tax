import styles from './SiteSelector.module.css';

export const SiteSelector = ({ currentSite, onSiteChange }) => {
  const sites = [
    { id: 'twitter', label: 'twitter.com' },
    { id: 'reddit', label: 'reddit.com' },
    { id: 'youtube', label: 'youtube.com' },
  ];

  return (
    <div className={styles.selector}>
      <span className={styles.label}>// blocked sites:</span>
      {sites.map((site) => (
        <button
          key={site.id}
          className={`${styles.pill} ${currentSite === site.id ? styles.active : ''}`}
          onClick={() => onSiteChange(site.id)}
        >
          {site.label}
        </button>
      ))}
    </div>
  );
};
