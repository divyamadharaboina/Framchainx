import { useState } from 'react'
import Login from './pages/Login'
import FarmerDashboard from './pages/FarmerDashboard'
import RetailerDashboard from './pages/RetailerDashboard'
import ConsumerDashboard from './pages/ConsumerDashboard'

export default function App() {
  const [currentRole, setCurrentRole] = useState(null)

  const handleLogin = (role) => setCurrentRole(role)
  const handleLogout = () => setCurrentRole(null)

  if (!currentRole) return <Login onLogin={handleLogin} />

  const dashboards = {
    farmer: <FarmerDashboard onLogout={handleLogout} />,
    retailer: <RetailerDashboard onLogout={handleLogout} />,
    consumer: <ConsumerDashboard onLogout={handleLogout} />,
  }

  return dashboards[currentRole] || <Login onLogin={handleLogin} />
}
