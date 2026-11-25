import axios from 'axios'
import { useState } from 'react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


const handleRegister = async (event) => {
  event.preventDefault()

  if (password !== confirmPassword) {
    alert('Passwords do not match!')
    return
  }

  try {
    const response = await axios.post(
      'http://localhost:3000/register',
      {
        name,
        email,
        password,
        confirmPassword
      },
      { withCredentials: true }
    )

    alert(response.data.message || 'Registration successful!')

  } catch (error) {
    alert(error.response?.data?.message || 'Registration failed!')
  }
}


  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-left">

          <div className="brand">
            <div className="brand-icon">A</div>
            <span>AuthFlow</span>
          </div>

          <div className="welcome-text">
            <p className="eyebrow">CREATE ACCOUNT</p>
            <h1>Get started today</h1>
            <p className="subtitle">
              Create your account to access your personal space.
            </p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email address</label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Create Account
            </button>

          </form>

          <p className="signup-text">
            Already have an account?
            <a href="/"> Sign in</a>
          </p>

        </div>

        <div className="login-right">
          <div className="right-content">
            <div className="illustration-icon">✦</div>

            <h2>Start your<br />journey here.</h2>

            <p>
              Create your account and enjoy a simple,
              secure and personalised experience.
            </p>

            <div className="feature">
              <span>✓</span> Quick account creation
            </div>

            <div className="feature">
              <span>✓</span> Secure password storage
            </div>

            <div className="feature">
              <span>✓</span> Your own personal dashboard
            </div>
          </div>

          <p className="right-footer">
            AUTHFLOW · YOUR DIGITAL SPACE
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register
