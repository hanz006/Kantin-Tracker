import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [menus, setMenus] = useState([])
  const [user, setUser] = useState(null)

  const load = async ()=>{
    try{
      const res = await api.get('/foods')
      setMenus(res.data)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{ load() }, [])

  useEffect(()=>{
    try{ const u = JSON.parse(localStorage.getItem('user') || 'null'); setUser(u) }catch(e){ setUser(null) }
  }, [])

  const logout = ()=>{ localStorage.removeItem('token'); window.location.href = '/login' }

  return (
    <div className="page">
      <h2>Menu Dashboard</h2>
      <div className="actions">
        {user && user.role === 'seller' && <Link to="/foods/new">+ Add Menu</Link>}
        <button onClick={logout}>Logout</button>
      </div>
      <div className="list">
        {menus.map(m=> (
          <div key={m._id} className="card">
            {m.imageUrl && <img src={m.imageUrl.startsWith('/')? `http://localhost:5000${m.imageUrl}` : m.imageUrl} alt="food" />}
            <div className="info">
              <h3>{m.name}</h3>
              <p>Price: Rp {m.price}</p>
              <p>Status: {m.status}</p>
              {user && user.role === 'seller' && <Link to={`/foods/${m._id}/edit`}>Edit</Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
