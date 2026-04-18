import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Filler, Tooltip, Legend
} from 'chart.js'
import styles from './RetailerDashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const NAV_ITEMS = [
  { id: 'ai_core', icon: '🧠', label: 'AI Dashboard' },
  { id: 'buy', icon: '🛒', label: 'Global Sourcing' },
  { id: 'stock', icon: '📦', label: 'Smart Inventory' },
  { id: 'loyalty', icon: '💎', label: 'Loyalty Hub' },
]

const PRODUCTS = [
  { category: 'GRAIN', name: 'Basmati Rice', quality: '98.5%', price: '115/kg' },
  { category: 'GRAIN', name: 'Pearl Millets', quality: '94.0%', price: '48/kg' },
  { category: 'SPICE', name: 'Lakadong Turmeric', quality: '99.2%', price: '245/kg' },
  { category: 'SUPER', name: 'Chia Seeds', quality: '88.4%', price: '340/kg' },
  { category: 'NUTS', name: 'Kashmiri Walnuts', quality: '96.1%', price: '680/kg' },
  { category: 'OIL', name: 'Cold-Pressed Oil', quality: '97.3%', price: '215/L' },
]

export default function RetailerDashboard({ onLogout }) {
  const [active, setActive] = useState('ai_core')
  const [consoleMsg, setConsoleMsg] = useState('> AI-Blockchain Terminal Initialized...')
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStatus, setScanStatus] = useState('Awaiting Batch Input...')

  useEffect(() => {
    if (active === 'ai_core') {
      const timer = setTimeout(() => {
        setScanProgress(94)
        setScanStatus('Analysis Complete: 94.2% Pure')
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [active])

  const navigate = (id) => {
    setConsoleMsg(`> AI Node syncing ${id} data...`)
    setActive(id)
    setTimeout(() => setConsoleMsg(`> View: ${id.toUpperCase()} | Node: Active`), 600)
  }

  const txSim = (item) => {
    const hash = '0x' + Math.random().toString(16).substr(2, 10).toUpperCase()
    setConsoleMsg(`> Executing Smart Contract for ${item}...`)
    setTimeout(() => {
      alert(`✅ PROCUREMENT SUCCESSFUL\nBlockchain Hash: ${hash}`)
      setConsoleMsg(`> Confirmed: ${hash}`)
    }, 800)
  }

  return (
    <div className={styles.layout}>
      <Sidebar logo="FARMCHAINX" items={NAV_ITEMS} active={active} onNav={navigate} onLogout={onLogout} theme="dark" />

      <div className={styles.mainWrapper}>
        <header className={styles.header}>
          <div className={styles.networkStatus}><span className={styles.pulseDot} /> Network: <span className={styles.greenText}>Mainnet-v2.0</span></div>
          <div className={styles.headerRight}>
            <div style={{ textAlign: 'right' }}><small className={styles.dimText}>Retailer Terminal</small><br /><b>Green-Life Node</b></div>
            <div className={styles.avatar} />
          </div>
        </header>

        <main className={styles.content}>
          {/* AI DASHBOARD */}
          {active === 'ai_core' && (
            <div className={styles.view}>
              <div className={styles.aiPanel}>
                <span className={styles.aiLabel}>PREDICTIVE AI ACTIVE</span>
                <h2>Automated Quality Verification</h2>
                <div className={styles.scanContainer}>
                  <div className={styles.scanBox}><div className={styles.scanLine} />🌿</div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.progressTrack}><div className={styles.progressBar} style={{ width: `${scanProgress}%` }} /></div>
                    <small className={styles.dimText}>{scanStatus}</small>
                  </div>
                </div>
              </div>
              <div className={styles.panel}>
                <h3>Demand Forecast (Next 30 Days)</h3>
                <div style={{ height: '200px' }}>
                  <Line 
                    data={{
                      labels: ['W1', 'W2', 'W3', 'W4'],
                      datasets: [{ data: [120, 160, 140, 230], borderColor: '#74c69d', backgroundColor: 'rgba(116,198,157,0.1)', fill: true, tension: 0.4 }]
                    }}
                    options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* GLOBAL SOURCING */}
          {active === 'buy' && (
            <div className={styles.view}>
              <div className={styles.aiPanelGreen}><p>✨ <strong>AI Recommendation:</strong> Turmeric prices are rising. <strong>Bulk buy advised.</strong></p></div>
              <div className={styles.panel}>
                <table className={styles.table}>
                  <thead><tr><th>Category</th><th>Product</th><th>Quality</th><th>Price</th><th>Action</th></tr></thead>
                  <tbody>
                    {PRODUCTS.map((p, i) => (
                      <tr key={i}>
                        <td><span className={`${styles.tag} ${p.category === 'GRAIN' ? styles.tagGreen : styles.tagPurple}`}>{p.category}</span></td>
                        <td>{p.name}</td><td>{p.quality}</td><td>₹{p.price}</td>
                        <td><button className={styles.btn} onClick={() => txSim(p.name)}>Procure</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SMART INVENTORY */}
          {active === 'stock' && (
            <div className={styles.view}>
              <div className={styles.panel}>
                <h3>Blockchain-Anchored Stock</h3>
                <table className={styles.table}>
                  <thead><tr><th>Asset Hash</th><th>Product</th><th>Shelf Life</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td className={styles.hash}>0x7Ae...40f2</td><td>Golden Corn</td><td>14 Days</td><td className={styles.greenText}>Healthy</td></tr>
                    <tr><td className={styles.hash}>0x9Cc...11b9</td><td>Lakadong Turmeric</td><td>340 Days</td><td className={styles.greenText}>Healthy</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LOYALTY HUB */}
          {active === 'loyalty' && (
            <div className={styles.view}>
              <div className={styles.loyaltyGrid}>
                <div className={styles.panel}>
                  <h3>Scan Authenticity Trends</h3>
                  <div className={styles.statRow}>
                    <div className={styles.bigStat}><span className={styles.greenText}>+24%</span><small>Weekly Scans</small></div>
                    <div className={styles.bigStat}><span>1,240</span><small>Tokens Issued</small></div>
                  </div>
                  <div className={styles.barChartSim}>
                    {[60, 80, 45, 90, 70, 100].map((h, i) => <div key={i} className={styles.bar} style={{ height: `${h}%` }} />)}
                  </div>
                </div>
                <div className={styles.panel}>
                  <h3>Reward Campaigns</h3>
                  <div className={styles.campaignList}>
                    <div className={styles.campaignCard}>
                      <div><b>🌿 Green-Verify</b><br/><small>5 Tokens per scan</small></div>
                      <div className={styles.tagGreen}>ACTIVE</div>
                    </div>
                    <div className={styles.campaignCard}>
                      <div><b>🌾 Bulk Discount</b><br/><small>10% Off verified buys</small></div>
                      <div className={styles.tagPurple}>UPCOMING</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        <div className={styles.consoleBar}>{consoleMsg}</div>
      </div>
    </div>
  )
}