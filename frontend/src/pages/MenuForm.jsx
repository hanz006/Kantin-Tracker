import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function MenuForm(){
  const { id } = useParams()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('available')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    if(!id) return
    api.get(`/foods/${id}`).then(res=>{
      setName(res.data.name)
      setPrice(res.data.price)
      setStatus(res.data.status)
      setImage(null)
      setDescription(res.data.description || '')
      setCategory(res.data.category || '')
    }).catch(console.error)
  }, [id])

  const submit = async (e)=>{
    e.preventDefault()
    try{
      const form = new FormData()
      form.append('name', name)
      form.append('price', price)
      form.append('status', status)
      form.append('description', description)
      form.append('category', category)
      if(image) form.append('image', image)

      if(id){
        await api.put(`/foods/${id}`, form)
      }else{
        await api.post('/foods', form)
      }
      navigate('/dashboard')
    }catch(err){
      alert(err?.response?.data?.message || 'Failed')
    }
  }

  return (
    <div className="form-page">
      <h2>{id? 'Edit' : 'Add'} Menu</h2>
      <form onSubmit={submit}>
        <input placeholder="name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="price" value={price} onChange={e=>setPrice(e.target.value)} />
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="soldout">Sold Out</option>
        </select>
        <input placeholder="category" value={category} onChange={e=>setCategory(e.target.value)} />
        <textarea placeholder="description" value={description} onChange={e=>setDescription(e.target.value)} rows={4} />
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
