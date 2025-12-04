import React, { useEffect, useState, useContext } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function Home(){
  const [foods, setFoods] = useState([])
  const { addToCart } = useContext(CartContext)

  useEffect(()=>{ api.get('/foods').then(r=>setFoods(r.data)).catch(console.error) }, [])

  return (
    <div className="page">
      <h2>Menu Kantin</h2>
      <div className="list">
        {foods.map(f=> (
          <div key={f._id} className="card">
            {f.imageUrl && <img src={f.imageUrl.startsWith('/')? `http://localhost:5000${f.imageUrl}`: f.imageUrl} alt={f.name} />}
            <div className="info">
              <h3>{f.name}</h3>
              <p>{f.category}</p>
              <p>Rp {f.price}</p>
              <p>Status: {f.status}</p>
              <div style={{display:'flex',gap:8}}>
                <Link to={`/foods/${f._id}`}>Detail</Link>
                {f.status==='available' && <button onClick={()=> addToCart({ foodId: f._id, name: f.name, price: f.price, quantity:1 })}>Pesan</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
