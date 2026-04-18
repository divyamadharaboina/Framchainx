import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './ConsumerDashboard.module.css';

const NAV_ITEMS = [
  { id: 'prof', icon: '👤', label: 'Identity Node' },
  { id: 'shop', icon: '🛒', label: 'Smart Market' },
  { id: 'history', icon: '📜', label: 'Order Ledger' },
  { id: 'trace', icon: '🚚', label: 'Order Tracking' },
];

const PRODUCTS = [
  { id: 1, name: 'Organic Wheat', price: 56, trust: '98%', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { id: 2, name: 'Fuji Apples', price: 120, trust: '95%', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400' },
  { id: 3, name: 'Organic Tomatoes', price: 34, trust: '92%', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
  { id: 4, name: 'Raw Honey', price: 450, trust: '99%', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
];

export default function ConsumerDashboard({ onLogout }) {
  const [active, setActive] = useState('prof');
  const [cart, setCart] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [gas, setGas] = useState(12);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  
  // Tracking State
  const [trackingHash, setTrackingHash] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const [history, setHistory] = useState([
    { id: 'TX-9921-X', date: 'Mar 2nd', item: 'Organic Wheat', amount: 56, status: 'Mined' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => setGas(Math.floor(Math.random() * 5 + 10)), 5000);
    return () => clearInterval(interval);
  }, []);

  // Marketplace & Cart Logic
  const addToCart = (product) => setCart([...cart, { ...product, cartId: Date.now() }]);
  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));

  const executeCheckout = () => {
    if (cart.length === 0) return;
    const newEntries = cart.map(item => ({
      id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
      date: 'Mar 17th',
      item: item.name,
      amount: item.price,
      status: 'Mined'
    }));
    setHistory([...newEntries, ...history]);
    setCart([]);
    setActive('history');
  };

  const deleteOrder = (txId) => {
    if (window.confirm("Delete transaction record from local node?")) {
      setHistory(history.filter(tx => tx.id !== txId));
    }
  };

  // Tracking Logic
  const handleTrack = () => {
    if (!trackingHash) return;
    const mockData = {
      'TX-9921-X': { status: 'In Transit', location: 'Hyderabad Hub', update: 'Mar 17, 2026 - 10:30 AM', step: 2 },
      'default': { status: 'Dispatched', location: 'Regional Center', update: 'Mar 17, 2026 - 02:15 PM', step: 1 }
    };
    setTrackingResult(mockData[trackingHash] || mockData['default']);
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        logo="🌾 FarmChainX"
        items={NAV_ITEMS}
        active={active}
        onNav={setActive}
        onLogout={onLogout}
        wallet="0x71C...842F42"
        theme="dark"
      />

      <main className={styles.main}>
        <div className={styles.chainStatus}>
          <div><span className={styles.statusDot} /> <small>Mainnet v2.4 • Node Active</small></div>
          <div><small>Gas Price: {gas} Gwei</small></div>
        </div>

        {/* --- IDENTITY NODE --- */}
        {active === 'prof' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Identity Node</h1>
            <div className={styles.profileBanner}>
              <div className={styles.avatar} />
              <div>
                <h1>Divya</h1>
                <p>Node Operator • Verified Consumer • Level 12</p>
              </div>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}><h3>1,240</h3><p>Tokens Earned</p></div>
              <div className={styles.statCard}><h3>98%</h3><p>Trust Score</p></div>
              <div className={styles.statCard}><h3>{history.length}</h3><p>Ledger Entries</p></div>
            </div>
          </div>
        )}

        {/* --- SMART MARKET --- */}
        {active === 'shop' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Smart Market</h1>
            <div className={styles.marketGrid}>
              {PRODUCTS.map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <div className={styles.trustBadge}>TRUST: {p.trust}</div>
                  <img src={p.img} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p className={styles.priceTag}>₹{p.price}</p>
                  <button className={styles.buyBtn} onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ORDER LEDGER --- */}
        {active === 'history' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Order Ledger</h1>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>TX HASH</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx) => (
                  <React.Fragment key={tx.id}>
                    <tr 
                      className={`${styles.ledgerRow} ${expandedRow === tx.id ? styles.rowActive : ''}`}
                      onClick={() => setExpandedRow(expandedRow === tx.id ? null : tx.id)}
                    >
                      <td className={styles.productCell}>
                        <img src={PRODUCTS.find(p => p.name === tx.item)?.img || 'https://via.placeholder.com/40'} alt="" />
                        <span>{tx.item}</span>
                      </td>
                      <td className={styles.hashText}>{tx.id}</td>
                      <td>{tx.date}</td>
                      <td>₹{tx.amount}</td>
                      <td>
                        <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); deleteOrder(tx.id); }}>✕</button>
                      </td>
                    </tr>
                    {expandedRow === tx.id && (
                      <tr className={styles.detailsRow}>
                        <td colSpan="5">
                          <div className={styles.detailsContent}>
                            <div className={styles.detailsGrid}>
                              <div><strong>Contract:</strong> 0x821...992a<br/><strong>Status:</strong> <span style={{color: '#00ff88'}}>Confirmed</span></div>
                              <div><strong>Origin:</strong> Verified Cluster<br/><strong>Logistics:</strong> IoT Verified</div>
                              <button 
                                className={styles.buyBtn} 
                                style={{width: 'auto', padding: '8px 15px', fontSize: '0.7rem'}}
                                onClick={() => {setTrackingHash(tx.id); setActive('trace'); handleTrack();}}
                              >
                                Track Package
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- ORDER TRACKING --- */}
        {active === 'trace' && (
          <div className={styles.section}>
            <h1 className={styles.pageTitle}>Order Tracking</h1>
            <div className={styles.traceBox}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Enter TX Hash (e.g. TX-9921-X)"
                  value={trackingHash} 
                  onChange={(e) => setTrackingHash(e.target.value)} 
                  className={styles.traceInput} 
                />
                <button className={styles.buyBtn} style={{ width: '120px' }} onClick={handleTrack}>Track</button>
              </div>
            </div>

            {trackingResult && (
              <div className={styles.trackingCard}>
                <div className={styles.trackingHeader}>
                  <h3>Status: <span style={{ color: '#00ff88' }}>{trackingResult.status}</span></h3>
                  <p>Hash: {trackingHash}</p>
                </div>
                <div className={styles.timeline}>
                  <div className={`${styles.timelineStep} ${trackingResult.step >= 0 ? styles.completed : ''}`}>
                    <strong>Order Confirmed</strong>
                    <p>Transaction mined successfully</p>
                  </div>
                  <div className={`${styles.timelineStep} ${trackingResult.step >= 1 ? styles.completed : ''}`}>
                    <strong>Handed to Logistics</strong>
                    <p>Regional Center Dispatch</p>
                  </div>
                  <div className={`${styles.timelineStep} ${trackingResult.step >= 2 ? styles.active : ''}`}>
                    <strong>{trackingResult.location}</strong>
                    <p>Last Update: {trackingResult.update}</p>
                  </div>
                  <div className={styles.timelineStep}>
                    <strong>Out for Delivery</strong>
                    <p>ETA: Tomorrow</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- CART DRAWER WITH PAYMENTS --- */}
      <aside className={styles.cartDrawer}>
        <h3 className={styles.sidebarTitle}>Current Cart</h3>
        <div className={styles.cartList}>
          {cart.length === 0 ? <p className={styles.emptyMsg}>Cart is empty</p> : 
            cart.map((item) => (
              <div key={item.cartId} className={styles.cartItem}>
                <div><span>{item.name}</span><p>₹{item.price}</p></div>
                <button onClick={() => removeFromCart(item.cartId)}>✕</button>
              </div>
            ))
          }
        </div>

        {cart.length > 0 && (
          <div className={styles.paymentSection}>
            <p className={styles.paymentLabel}>Payment Method</p>
            <div className={styles.paymentGrid}>
              <button 
                className={`${styles.payOption} ${paymentMethod === 'wallet' ? styles.payActive : ''}`}
                onClick={() => setPaymentMethod('wallet')}
              >
                🪙 Wallet
              </button>
              <button 
                className={`${styles.payOption} ${paymentMethod === 'upi' ? styles.payActive : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                📱 UPI
              </button>
              <button 
                className={`${styles.payOption} ${paymentMethod === 'card' ? styles.payActive : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                💳 Card
              </button>
            </div>
          </div>
        )}

        <div className={styles.cartFooter}>
          <div className={styles.totalRow}><span>Total</span><strong>₹{cart.reduce((s, i) => s + i.price, 0)}</strong></div>
          <button className={styles.buyBtn} disabled={cart.length === 0} onClick={executeCheckout}>
            {paymentMethod === 'wallet' ? 'Sign & Checkout' : `Pay via ${paymentMethod.toUpperCase()}`}
          </button>
        </div>
      </aside>
    </div>
  );
}