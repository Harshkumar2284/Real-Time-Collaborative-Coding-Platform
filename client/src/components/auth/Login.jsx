import React, { useState } from 'react'
import Button from '../ui/Button'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login({ setModal }) {
  const navigate = useNavigate()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const handleLogin = async()=>{
    const url = import.meta.env.VITE_API_URL
    try {
    const response = await axios.post(`${url}/api/auth/login`,{
      identifier:user,
      password:pass
    })

    localStorage.setItem("token", response.data)
    if(response.status===201){
      navigate('/dashboard')
    }
    } catch (error) {
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='flex items-center flex-col px-10 py-10 elevated z-20 primary-text rounded-2xl w-md'>
      <h1 className='text-3xl font-semibold'>Sign In to SynCode</h1>
      <form onSubmit={handleSubmit} className='mt-10'>
        <label className='block mb-2 font-semibold'>Email or Username:</label>
        <input
          type='text'
          required
          name='email or username'
          className='border rounded-md w-68 px-2 py-1 mb-4'
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <label className='block mb-2 font-semibold'>Password:</label>
        <input
          type='password'
          required
          name='password'
          className='border rounded-md w-68 px-2 py-1 mb-3'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <p className='secondary-text mb-4 font-semibold'>
          Don't have an account?
          <a onClick={() => setModal("register")} className=' hover:text-red-400 hover:underline hover:cursor-pointer'>Sign Up Here!!</a>
        </p>
        <Button variant='primary' className='block w-68 mt-4 py-1' onClick={handleLogin}>Sign In</Button>
        <Button variant='secondary' className='block w-68 mt-3 py-1' onClick={() => setModal("hidden")}>Back</Button>
      </form>
    </div>
  )
}
