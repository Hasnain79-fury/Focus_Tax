import styles from './SiteSelector.module.css';

export const SiteSelector = ({ currentSite, onSiteChange, customUrl, onCustomUrlChange }) => {
  const sites = [
    { id: 'twitter', label: 'twitter.com' },
    { id: 'facebook', label: 'facebook.com' },
    { id: 'reddit', label: 'reddit.com' },
    { id: 'youtube', label: 'youtube.com' },
    { id: 'custom', label: 'Custom URL' },
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
      {currentSite === 'custom' && (
        <input 
          type="text" 
          value={customUrl} 
          onChange={(e) => onCustomUrlChange(e.target.value)} 
          className={styles.customInput} 
          placeholder="https://..."
        />
      )}
    </div>
  );
};
