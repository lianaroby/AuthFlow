
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await axios.post(
        'https://authflow-xse2.onrender.com/api/login',
        { email, password },
        { withCredentials: true }
      )

      if (response.data.message === 'Login successful!') {
        navigate('/dashboard')
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <h1>AuthFlow</h1>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to your account.</p>
        </div>

        <div className="login-right">
          <h2>Sign In</h2>
          <p>Enter your account details below.</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <p className="register-link">
            Don't have an account? <Link to="/register">Create account</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
