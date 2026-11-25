
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Profile() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/api/me', {
      withCredentials: true
    })
      .then(response => setUser(response.data.user))
      .catch(() => navigate('/'))
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, {
        withCredentials: true
      })
      navigate('/')
    } catch {
      alert('Logout failed!')
    }
  }

  if (!user) return <h2>Loading profile...</h2>

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <h2>AuthFlow</h2>
        <Link to="/dashboard" className="sidebar-link">▦ Dashboard</Link>
        <Link to="/profile" className="sidebar-active">♙ My Profile</Link>
        <button onClick={handleLogout}>↪ Logout</button>
      </aside>

      <main className="dashboard-main">
        <h1>My Profile</h1>
        <p>Manage and view your account information.</p>

        <div className="dashboard-card">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p className="status-active">● Active Account</p>
        </div>

        <div className="dashboard-card">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Status:</strong> Active</p>
        </div>
      </main>
    </div>
  )
}

export default Profile
