import React, { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import { useState } from 'react'
import Modal from '../components/ui/Modal'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Hero from '../components/landing/Hero'
import { useNavigate } from 'react-router-dom'
import SoftAurora from '../components/landing/SoftAurora'

export default function Landing() {
  const navigate = useNavigate()
  const [modal, setModal] = useState("hidden")
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate('/dashboard')
    }
  }, [])
  return (
    <div>
      <SoftAurora
        speed={0.6}
        scale={1.5}
        brightness={1}
        color1="#f7f7f7"
        color2="#e100ff"
        noiseFrequency={2.5}
        noiseAmplitude={1}
        bandHeight={0.5}
        bandSpread={1}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={1}
        enableMouseInteraction
        mouseInfluence={0.25}
      />
      <Navbar setModal={setModal} modal={modal} />
      <Modal display={modal}>
        {modal === "login" && <Login setModal={setModal} />}
        {modal === "register" && <Register setModal={setModal} />}
      </Modal>
      <Hero />
    </div>
  )
}
