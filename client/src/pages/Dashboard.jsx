import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/dashboard/SideBar'
import RecentRooms from '../components/dashboard/RecentRooms'

export default function Dashboard() {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  useEffect(() => {
    const check = localStorage.getItem("token")
    if (check) {
      setToken(check)
    } else {
      navigate('/')
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <div className='w-4/6  flex justify-center'>
          <RecentRooms />
        </div>
        <div className='w-2/6 flex justify-center'>
          <SideBar />
        </div>
      </div>
    </div>
  )
}
