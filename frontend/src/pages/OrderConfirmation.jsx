import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

export default function OrderConfirmation(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(()=>{
    api.get(`/orders/${id}`).then(r=>setOrder(r.data)).catch(console.error)
  }, [id])

  if(!order) return <div className="page">Loading...</div>

  return (
    <div className="page confirmation-page">
      <div className="confirmation-box">
        <h2>✓ Order Placed!</h2>
        <p>Order ID: {order._id}</p>
        <p>Status: {order.status}</p>
        <h3>Items:</h3>
        <ul>
          {order.items.map((item,i)=>(
            <li key={i}>{item.name} x{item.quantity} - Rp {item.price * item.quantity}</li>
          ))}
        </ul>
        <h3>Total: Rp {order.total}</h3>
        <p>Thank you for your order! Please wait at the canteen counter.</p>
        <Link to="/home" className="btn">Back to Home</Link>
      </div>
    </div>
  )
}
