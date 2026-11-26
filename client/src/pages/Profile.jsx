
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/me', {
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

  if (loading) return <h2>Loading profile...</h2>
  if (!user) return null

  return (
    <div className="dashboard-page">

      <aside className="dashboard-sidebar">
        <h2>AuthFlow</h2>

        <p className="sidebar-label">MENU</p>

        <Link to="/dashboard" className="sidebar-link">
          ▦ Dashboard
        </Link>

        <Link to="/profile" className="sidebar-active">
          ♙ My Profile
        </Link>

        <button
          onClick={async () => {
            await axios.post('/api/logout', {}, {
              withCredentials: true
            })
            navigate('/')
          }}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="dashboard-main">

        <header className="dashboard-top">
          <div>
            <h2>My Profile</h2>
            <p>View your account information.</p>
          </div>

          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        <section className="dashboard-welcome">
          <p>ACCOUNT INFORMATION</p>
          <h1>{user.name}</h1>
          <span>Your AuthFlow profile details.</span>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Personal Details</h3>

            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Status:</strong> Active</p>

            <Link to="/dashboard" className="profile-view-link">
              ← Back to Dashboard
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Profile
