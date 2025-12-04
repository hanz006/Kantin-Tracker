import React, { useEffect, useState } from 'react'
import api from '../api'

export default function AdminPanel(){
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    api.get('/orders/seller').then(r=>setOrders(r.data)).catch(console.error)
  }, [])

  return (
    <div className="page admin-page">
      <h2>All Orders (Seller Panel)</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      <div className="orders-list">
        {orders.map(order=>(
          <div key={order._id} className="order-card">
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>Customer: {order.user?.name || 'Unknown'}</p>
            <p>Status: {order.status}</p>
            <p>Total: Rp {order.total}</p>
            <p>Items:</p>
            <ul>
              {order.items.map((item,i)=>(
                <li key={i}>{item.name} x{item.quantity}</li>
              ))}
            </ul>
            <small>{new Date(order.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
