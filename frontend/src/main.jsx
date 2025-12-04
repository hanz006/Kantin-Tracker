import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import MenuDetail from './pages/MenuDetail'
import Dashboard from './pages/Dashboard'
import MenuForm from './pages/MenuForm'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminPanel from './pages/AdminPanel'
import './styles.css'

function App() {
  const [user, setUser] = useState(null)
  
  useEffect(()=>{
    try{ 
      const u = JSON.parse(localStorage.getItem('user') || 'null')
      setUser(u)
    }catch(e){ setUser(null) }
  }, [])

  const logout = ()=>{ 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <BrowserRouter>
      <header className="topbar">
        <Link to="/" className="brand">KantinTracker</Link>
        <nav>
          {user ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/cart">Cart</Link>
              {user.role === 'seller' && <Link to="/dashboard">Dashboard</Link>}
              {user.role === 'seller' && <Link to="/admin">Orders</Link>}
              <button onClick={logout} className="btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/foods/:id" element={<MenuDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/foods/new" element={<MenuForm />} />
        <Route path="/foods/:id/edit" element={<MenuForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
