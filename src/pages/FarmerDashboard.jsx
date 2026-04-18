import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js'
import styles from './FarmerDashboard.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const NAV_ITEMS = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'register', icon: '🌱', label: 'Crop Registration' },
  { id: 'inventory', icon: '📊', label: 'My Products' },
  { id: 'orders', icon: '📜', label: 'My Orders' },
  { id: 'weather', icon: '🌦️', label: 'Weather & Alerts' },
]

const INITIAL_PRODUCTS = [{
  id: 1, name: 'Premium Wheat', type: 'Grains', batch: 'FCX-6512',
  price: 2150, qty: 43, grade: 'Grade A+', verified: true,
}]

export default function FarmerDashboard({ onLogout }) {
  const [active, setActive] = useState('dashboard')
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [form, setForm] = useState({ name: '', type: 'Grains', qty: '', price: '', grade: 'Grade A+' })

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Expected Yield',
      data: [15, 28, 22, 35, 30],
      borderColor: '#2d6a4f',
      backgroundColor: 'rgba(45,106,79,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#40916c',
      pointRadius: 5,
    }]
  }

  const chartOptions = {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: '#f0f0f0' }, ticks: { color: '#888' } },
      x: { grid: { display: false }, ticks: { color: '#888' } },
    }
  }

  const handleRegister = () => {
    if (!form.name || !form.qty || !form.price) return alert('Please fill all fields!')
    const batch = 'FCX-' + Math.floor(1000 + Math.random() * 9000)
    setProducts(prev => [{ id: Date.now(), ...form, batch, verified: true }, ...prev])
    setForm({ name: '', type: 'Grains', qty: '', price: '', grade: 'Grade A+' })
    alert('✅ Crop batch verified and added to Blockchain!')
    setActive('inventory')
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        logo="🌾 FarmChainX"
        items={NAV_ITEMS}
        active={active}
        onNav={setActive}
        onLogout={onLogout}
        theme="light"
      />
      <main className={styles.main}>
        {/* Ticker */}
        <div className={styles.topNav}>
          <div className={styles.tickerWrap}>
            <div className={styles.ticker}>
              🌾 WHEAT: ₹2,150 (+1.2%) &nbsp;|&nbsp; 🍚 RICE: ₹3,400 (-0.5%) &nbsp;|&nbsp; 🍅 TOMATO: ₹42 (+4.1%) &nbsp;|&nbsp; 🌽 MAIZE: ₹1,950 (+0.8%)
            </div>
          </div>
          <div className={styles.weatherCard}>
            <span style={{ fontSize: '1.4rem' }}>☀️</span>
            <div><strong>32°C</strong><br /><small>Hyderabad, TS</small></div>
          </div>
        </div>

        {/* Dashboard */}
        {active === 'dashboard' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Farm Analytics</h1>
            <div className={styles.statGrid}>
              <div className={`${styles.statCard} ${styles.green}`}><h4>Active Batches</h4><b>{products.length}</b></div>
              <div className={`${styles.statCard} ${styles.white}`}><h4>Total Revenue</h4><b>₹42,500</b></div>
              <div className={`${styles.statCard} ${styles.green}`}><h4>Market Reach</h4><b>14 Buyers</b></div>
            </div>
            <div className={styles.chartCard}>
              <h3>Yield Projection (2026 Season)</h3>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Register */}
        {active === 'register' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Register New Harvest</h1>
            <div className={styles.formCard}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Crop Name</label>
                  <input placeholder="e.g. Sona Masoori Rice" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label>Crop Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Grains</option><option>Vegetables</option><option>Fruits</option><option>Pulses</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Quantity (Quintals)</label>
                  <input type="number" placeholder="43" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
                </div>
                <div className={styles.formGroup}>
                  <label>Price/Qtl (₹)</label>
                  <input type="number" placeholder="2150" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Quality Grade</label>
                <select value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })}>
                  <option>Grade A+</option><option>Grade A</option><option>Grade B</option>
                </select>
              </div>
              <button className={styles.submitBtn} onClick={handleRegister}>🚀 Register to Blockchain</button>
            </div>
          </div>
        )}

        {/* Inventory */}
        {active === 'inventory' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Blockchain Inventory</h1>
            {products.map(p => (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.productHeader}>
                  <div>
                    <h2>{p.name} <span className={`${styles.badge} ${styles.badgeV}`}>VERIFIED</span> <span className={`${styles.badge} ${styles.badgeL}`}>LISTED</span></h2>
                    <small>{p.type} • Batch: {p.batch} • Harvested Today</small>
                  </div>
                  <div style={{ textAlign: 'right' }}><small>QR Ready</small><br />🔳</div>
                </div>
                <div className={styles.dataRow}>
                  <div><small>PRICE/QTL</small><br /><b>₹{p.price}</b></div>
                  <div><small>STOCK</small><br /><b>{p.qty} Qtl</b></div>
                  <div><small>QUALITY</small><br /><b>{p.grade}</b></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
        {active === 'orders' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Incoming Orders</h1>
            <div className={styles.formCard} style={{ maxWidth: '100%' }}>
              <table className={styles.table}>
                <thead>
                  <tr><th>ORDER ID</th><th>BUYER</th><th>PRODUCT</th><th>STATUS</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>#ORD-7712</b></td>
                    <td>Reliance Retail</td>
                    <td>Premium Wheat</td>
                    <td><span className={`${styles.badge} ${styles.badgeV}`}>Payment Confirmed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Weather */}
        {active === 'weather' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Agricultural Intelligence</h1>
            <div className={styles.statGrid}>
              <div className={`${styles.statCard} ${styles.white}`}><h4>Soil Moisture</h4><b>24%</b><p><small>Ideal for sowing</small></p></div>
              <div className={`${styles.statCard} ${styles.white}`}><h4>Rain Chance</h4><b>5%</b><p><small>Next 7 days</small></p></div>
              <div className={`${styles.statCard} ${styles.white}`}><h4>Wind Speed</h4><b>12 km/h</b><p><small>Safe for spraying</small></p></div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
