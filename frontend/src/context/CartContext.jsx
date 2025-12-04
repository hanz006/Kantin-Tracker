import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('cart') || '[]') }catch(e){ return [] }
  })

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    setCart(prev => {
      const found = prev.find(p=>p.foodId===item.foodId)
      if(found){
        return prev.map(p=> p.foodId===item.foodId ? {...p, quantity: p.quantity + (item.quantity||1)} : p)
      }
      return [...prev, {...item, quantity: item.quantity||1}]
    })
  }

  function removeFromCart(foodId){ setCart(prev => prev.filter(p=>p.foodId!==foodId)) }
  function clearCart(){ setCart([]) }
  function updateQty(foodId, qty){ setCart(prev => prev.map(p=> p.foodId===foodId?{...p, quantity: qty}:p)) }
  function getTotal(){ return cart.reduce((s,i)=> s + (i.price||0)* (i.quantity||1), 0) }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQty, getTotal }}>
      {children}
    </CartContext.Provider>
  )
}
