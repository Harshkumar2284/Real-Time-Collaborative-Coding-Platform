import React, { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import { useState } from 'react'
import Modal from '../components/ui/Modal'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Hero from '../components/landing/Hero'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const [modal,setModal] = useState("hidden")
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate('/dashboard')
    }
  },[])
  return (
    <div>
      <Navbar setModal = {setModal} modal = {modal}/>
      <Modal display={modal}>
        {modal==="login" && <Login setModal={setModal}/>}
        {modal==="register" && <Register setModal={setModal}/>}
      </Modal>
      <Hero />
    </div>
  )
}
