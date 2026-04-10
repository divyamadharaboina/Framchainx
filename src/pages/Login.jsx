import { useState } from 'react'
import styles from './Login.module.css'

const ROLES = [
  { id: 'farmer', label: '🌾 Farmer' },
  { id: 'retailer', label: '🏪 Retailer' },
  { id: 'consumer', label: '🛒 Consumer' },
]

export default function Login({ onLogin }) {
  const [role, setRole] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (!role) return alert('⚠️ Please select your identity')
    if (!username || !password) return alert('⚠️ Missing credentials')
    onLogin(role)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{isRegister ? 'Join FarmChainX' : 'FarmChainX'}</h2>
          <p className={styles.subtitle}>Blockchain-backed agricultural intelligence</p>
        </header>

        <section className={styles.formSection}>
          <label className={styles.sectionLabel}>SELECT IDENTITY</label>
          <div className={styles.roleGrid}>
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                className={`${styles.roleBtn} ${role === r.id ? styles.activeRole : ''}`}
                onClick={() => setRole(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className={styles.inputGroup}>
            {isRegister && (
              <>
                <input 
                  className={styles.input} 
                  type="text" 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                />
                <input 
                  className={styles.input} 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </>
            )}

            <input 
              className={styles.input} 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
            <input 
              className={styles.input} 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit}>
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </section>

        <div className={styles.divider}>
          <span>OR CONTINUE WITH</span>
        </div>

        <div className={styles.socialGrid}>
          <button className={styles.socialBtn}>Google</button>
          <button className={styles.socialBtn}>Apple ID</button>
        </div>

        <footer className={styles.footer}>
          {isRegister ? 'Already a member? ' : 'New to the chain? '}
          <button 
            className={styles.toggleBtn} 
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login here' : 'Register now'}
          </button>
        </footer>
      </div>
    </div>
  )
}