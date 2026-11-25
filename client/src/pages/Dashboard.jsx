
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/api/me', {
      withCredentials: true
    })
      .then(response => {
        setUser(response.data.user)
      })
      .catch(() => {
        navigate('/')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/logout',
        {},
        { withCredentials: true }
      )

      navigate('/')
    } catch {
      alert('Logout failed!')
    }
  }

  if (loading) {
    return <h2>Loading dashboard...</h2>
  }

  if (!user) {
    return null
  }

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <h2>AuthFlow</h2>

        <p className="sidebar-label">MENU</p>

        <Link to="/dashboard" className="sidebar-active">
          ▦ Dashboard
        </Link>

        <Link to="/profile" className="sidebar-link">
          ♙ My Profile
        </Link>

        <button onClick={handleLogout}>
          ↪ Logout
        </button>
      </aside>

      {/* MAIN DASHBOARD */}
      <main className="dashboard-main">

        <header className="dashboard-top">
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your personal workspace.</p>
          </div>

          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* WELCOME SECTION */}
        <section className="dashboard-welcome">
          <p>YOUR PERSONAL SPACE</p>

          <h1>Hello, {user.name}!</h1>

          <span>
            Great to have you back. You're successfully logged in.
          </span>
        </section>

        {/* DASHBOARD CARDS */}
        <section className="dashboard-grid">

          <div className="dashboard-card">
            <h3>My Profile</h3>

            <p className="profile-name">
              {user.name}
            </p>

            <p>{user.email}</p>

            <Link to="/profile" className="profile-view-link">
              View Profile →
            </Link>
          </div>

          <div className="dashboard-card">
            <h3>Account Status</h3>

            <p className="status-active">
              ● Active
            </p>

            <p>Your account is secure and active.</p>
          </div>

        </section>

        <footer className="dashboard-footer">
          AuthFlow © 2026 | Secure Authentication System
        </footer>

      </main>
    </div>
  )
}

export default Dashboard
