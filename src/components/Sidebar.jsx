import styles from './Sidebar.module.css'

export default function Sidebar({ logo, items, active, onNav, onLogout, wallet, theme = 'dark' }) {
  return (
    <div className={`${styles.sidebar} ${styles[theme]}`}>
      <div className={styles.logo}>{logo}</div>
      <nav className={styles.nav}>
        {items.map(item => (
          <div
            key={item.id}
            className={`${styles.navItem} ${active === item.id ? styles.activeItem : ''}`}
            onClick={() => onNav(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {wallet && (
        <div className={styles.wallet}>
          <small className={styles.walletLabel}>WALLET</small>
          <code className={styles.walletAddr}>{wallet}</code>
        </div>
      )}

      {onLogout && (
        <button className={styles.logoutBtn} onClick={onLogout}>
          🚪 Logout
        </button>
      )}
    </div>
  )
}
