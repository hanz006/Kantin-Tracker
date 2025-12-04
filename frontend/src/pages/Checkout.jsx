import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Checkout(){
  const { cart, getTotal, clearCart } = useContext(CartContext)
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()

  if(cart.length === 0){
    return (
      <div className="page">
        <h2>Checkout</h2>
        <p>No items to checkout.</p>
        <button onClick={()=>navigate('/home')}>Browse Menu</button>
      </div>
    )
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const items = cart.map(c=>({ food: c.foodId, name: c.name, price: c.price, quantity: c.quantity }))
      const total = getTotal()
      const res = await api.post('/orders', { items, total })
      clearCart()
      navigate(`/order-confirmation/${res.data._id}`)
    }catch(err){
      alert(err?.response?.data?.message || 'Order failed')
    }
  }

  return (
    <div className="page checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cart.map(item=>(
          <div key={item.foodId} className="checkout-item">
            <span>{item.name} x{item.quantity}</span>
            <span>Rp {item.price * item.quantity}</span>
          </div>
        ))}
        <div className="checkout-total">
          <strong>Total: Rp {getTotal()}</strong>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Notes (optional):</label>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Special requests..."></textarea>
        <button type="submit">Place Order</button>
      </form>
    </div>
  )
}
