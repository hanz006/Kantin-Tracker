import React, { useEffect, useState, useContext } from 'react'
import api from '../api'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function MenuDetail(){
  const { id } = useParams()
  const [food, setFood] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  useEffect(()=>{
    api.get(`/foods/${id}`).then(r=>setFood(r.data)).catch(console.error)
  }, [id])

  if(!food) return <div className="page">Loading...</div>

  const handleAddToCart = ()=>{
    addToCart({ foodId: food._id, name: food.name, price: food.price, quantity })
    alert('Added to cart!')
  }

  return (
    <div className="page detail-page">
      <button onClick={()=>navigate(-1)} className="back-btn">← Back</button>
      <div className="detail-container">
        {food.imageUrl && <img src={food.imageUrl.startsWith('/')? `http://localhost:5000${food.imageUrl}`: food.imageUrl} alt={food.name} className="detail-img" />}
        <div className="detail-info">
          <h2>{food.name}</h2>
          <p className="category">{food.category}</p>
          <p className="price">Rp {food.price}</p>
          <p className="description">{food.description}</p>
          <p className={`status ${food.status}`}>Status: {food.status}</p>
          {food.status === 'available' && (
            <div className="order-controls">
              <label>Quantity:</label>
              <input type="number" min="1" value={quantity} onChange={e=>setQuantity(parseInt(e.target.value)||1)} />
              <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
