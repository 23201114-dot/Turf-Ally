import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './api'

export default function Login() {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', email: '', first_name: '', last_name: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginUser({ username: form.username, password: form.password })
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      navigate('/')
      window.location.reload()
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerUser(form)
      // Auto-login after register
      const res = await loginUser({ username: form.username, password: form.password })
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      navigate('/')
      window.location.reload()
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-margin-mobile dark">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-container/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary-fixed-dim text-[32px]">sports_soccer</span>
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface tracking-tighter">TurfAlly</h1>
          </div>
          <p className="text-on-surface-variant font-body-sm">The Future of Sports Booking</p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-surface-container-low p-1 rounded-xl">
            <button
              onClick={() => { setTab('login'); setError('') }}
              className={`flex-1 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200 ${tab === 'login' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
            >Login</button>
            <button
              onClick={() => { setTab('register'); setError('') }}
              className={`flex-1 py-2 rounded-lg font-label-uppercase text-label-uppercase transition-all duration-200 ${tab === 'register' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
            >Register</button>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-error-container/20 border border-error/30 text-on-error-container text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-error">error</span>
              {error}
            </div>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Username</label>
                <input
                  id="login-username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Password</label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                  placeholder="Enter password"
                />
              </div>
              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 active:scale-95 transition-all neon-glow-primary disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">First Name</label>
                  <input
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-3 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Last Name</label>
                  <input
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-border-subtle rounded-lg px-3 py-2.5 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Username</label>
                <input
                  id="register-username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                  placeholder="Choose a username"
                />
              </div>
              <div>
                <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-label-uppercase font-label-uppercase text-on-surface-variant mb-2 tracking-wider">Password</label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border border-border-subtle rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                  placeholder="Create a password"
                />
              </div>
              <button
                id="register-submit"
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-label-uppercase text-label-uppercase font-bold hover:opacity-90 active:scale-95 transition-all neon-glow-primary disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-on-surface-variant font-body-sm mt-6">
          Demo credentials: <span className="text-primary-fixed-dim font-bold">shehab / password123</span>
        </p>
      </div>
    </div>
  )
}
