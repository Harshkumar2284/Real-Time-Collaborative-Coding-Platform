import React, { useEffect } from 'react'
import Button from '../ui/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.png'

export default function Navbar({setModal}) {
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      setUser(token)
      console.log(token)
    }else{
      setUser(null)
    }
  },[])
  const [user,setUser] = useState(null)
  return (
    <nav className='secondary-bg top-0 w-full h-24 flex items-center justify-between'>
      <div className='flex ml-7'>
        <img src={icon} height={50} width={50} className=' mr-2 hover:cursor-pointer' />
        <h1 className='primary-text text-3xl hover:cursor-pointer font-semibold'><span className='text-4xl font-bold'>S</span>yn<span className='text-4xl font-bold'>C</span>ode</h1>
      </div>
      {
        !user ? (
          <div>
            <Button onClick = {()=>setModal("login")} className='mr-5 px-4 py-2'>Login</Button>
            <Button onClick = {()=>setModal("register")} variant='secondary' className='mr-20 px-4 py-2'>Register</Button>
          </div>
        ) :
          (
            <div>
              <Button variant='danger' onClick = {()=>{
                localStorage.removeItem("token")
                setUser(null)
                navigate('/')
              }} className='mr-7 px-4 py-2'>LogOut</Button>
            </div>
          )
      }
    </nav>
  )
}
