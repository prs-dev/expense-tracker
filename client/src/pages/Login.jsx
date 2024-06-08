import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import Loader from '../components/Loader'
import ErrorMsg from '../components/ErrorMsg'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const [err, setErr] = useState('')

  const navigate = useNavigate()

  const { setUser } = useUser()

  const handleChange = e => setData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(data)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
      if (res.ok) {
        const response = await res.json()
        console.log(response)
        localStorage.setItem("token", response?.token)
        setUser(response?.user)
        setData({
          email: '',
          password: ''
        })
        navigate('/')
      } else {
        const response = await res.json()
        setErr(response?.error)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  console.log(err)
  return (
    <div className=' p-10 shadow-md border border-red-200 rounded-md'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 rounded-md'>
        <label htmlFor="">Email</label>
        <input className='p-1 border border-red-200 rounded-sm' type="text" name="email" value={data.email} onChange={handleChange} />
        <label htmlFor="">Password</label>
        <input className='p-1 border border-red-200 rounded-sm' type="password" name="password" value={data.password} onChange={handleChange} />
        <button className='border-2 p-2 border-red-300 rounded-md hover:bg-red-300 hover:text-white' type='submit'>Login</button>
      </form>
      <div className='text-sm text-gray-500 mt-4'>
        <p>Don't have an account, <span className='underline'><Link to="/register">Register</Link></span></p>
      </div>
      {loading && <Loader />}
      {err && <ErrorMsg text={err} />}
    </div>
  )
}

export default Login