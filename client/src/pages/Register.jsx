
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    try {
      const response = await axios.post(
        '/api/register',
        {
          name,
          email,
          password,
          confirmPassword
        },
        { withCredentials: true }
      )

      alert(response.data.message || 'Registration successful!')
      navigate('/')

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">
          <h1>AuthFlow</h1>
          <h2>Create Your Account</h2>
          <p>Join AuthFlow and get started.</p>
        </div>

        <div className="login-right">
          <h2>Sign Up</h2>
          <p>Enter your details to create an account.</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                  placeholder="Create a password"
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

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button">
              Create Account
            </button>
          </form>

          <p className="register-link">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register
