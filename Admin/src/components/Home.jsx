import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { FiHome, FiUsers, FiBox, FiMessageSquare, FiSettings } from 'react-icons/fi'
import { HiOutlineDocumentReport, HiOutlineCash } from 'react-icons/hi'
import Products from './Products'
import '../CSS/Home.css'

function Home() {
  const metrics = [
    { id: 1, title: 'Total Users', value: '1,234', icon: <FiUsers /> },
    { id: 2, title: 'Total Products', value: '45', icon: <FiBox /> },
    { id: 3, title: 'Total Orders', value: '789', icon: <HiOutlineCash /> },
    { id: 4, title: 'Total Reviews', value: '432', icon: <FiMessageSquare /> }
  ]

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item">
            <span className="nav-icon"><FiHome /></span>
            Dashboard
          </Link>
          <Link to="/admin/users" className="nav-item">
            <span className="nav-icon"><FiUsers /></span>
            Users
          </Link>
          <Link to="/admin/products" className="nav-item">
            <span className="nav-icon"><FiBox /></span>
            Products
          </Link>
          <Link to="/admin/orders" className="nav-item">
            <span className="nav-icon"><HiOutlineCash /></span>
            Orders
          </Link>
          <Link to="/admin/reviews" className="nav-item">
            <span className="nav-icon"><FiMessageSquare /></span>
            Reviews
          </Link>
          <Link to="/admin/reports" className="nav-item">
            <span className="nav-icon"><HiOutlineDocumentReport /></span>
            Reports
          </Link>
          <Link to="/admin/settings" className="nav-item">
            <span className="nav-icon"><FiSettings /></span>
            Settings
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <div className="dashboard-header">
                <h1>Dashboard Overview</h1>
              </div>
              <div className="metrics-grid">
                {metrics.map((metric) => (
                  <div key={metric.id} className="metric-card">
                    <div className="metric-icon">
                      {metric.icon}
                    </div>
                    <div className="metric-details">
                      <h3>{metric.title}</h3>
                      <div className="metric-value">{metric.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          } />
          <Route path="/products/*" element={<Products />} />
          <Route path="/users" element={<div>Users Page (Coming Soon)</div>} />
          <Route path="/orders" element={<div>Orders Page (Coming Soon)</div>} />
          <Route path="/reviews" element={<div>Reviews Page (Coming Soon)</div>} />
          <Route path="/reports" element={<div>Reports Page (Coming Soon)</div>} />
          <Route path="/settings" element={<div>Settings Page (Coming Soon)</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default Home