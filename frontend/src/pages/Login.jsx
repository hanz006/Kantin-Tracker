import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
  const res = await api.post('/auth/login', { email, password })
  localStorage.setItem('token', res.data.token)
  // store basic user info if present
  if (res.data.user) localStorage.setItem('user', JSON.stringify(res.data.user))
  navigate('/dashboard')
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  )
}
