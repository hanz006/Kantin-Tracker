import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart(){
  const { cart, removeFromCart, updateQty, getTotal, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  if(cart.length === 0) return (
    <div className="page">
      <h2>Your Cart</h2>
      <p>Your cart is empty.</p>
      <button onClick={()=>navigate('/home')}>Browse Menu</button>
    </div>
  )

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(item=> (
          <div key={item.foodId} className="cart-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Rp {item.price}</p>
            </div>
            <div className="item-controls">
              <input 
                type="number" 
                min="1" 
                value={item.quantity} 
                onChange={e=>updateQty(item.foodId, parseInt(e.target.value)||1)} 
              />
              <button onClick={()=>removeFromCart(item.foodId)} className="btn-remove">Remove</button>
            </div>
            <div className="item-subtotal">
              Rp {item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: Rp {getTotal()}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="btn-clear">Clear Cart</button>
          <button onClick={()=>navigate('/checkout')} className="btn-checkout">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
