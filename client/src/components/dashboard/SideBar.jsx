import React from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    const navigate = useNavigate()
    const createRoom = ()=>{
        const roomId = Math.random().toString(36).substring(2,10)
        navigate(`/room/${roomId}`)
    }
  return (
    <div className='secondary-bg primary-text flex-col mt-10 w-4/6 rounded-xl pl-5 pr-10 py-6 h-84'>
      <p className='text-2xl mb-7 font-bold'>Quick Actions</p>
      <Button variant='primary' onClick={createRoom} className='block w-full h-8 mb-3'>Create Room</Button>
      <Button variant='secondary' className='block w-full h-8 mb-3'>Join Room</Button>
      <Button variant='secondary' className='block w-full h-8 mb-3'>View Docs</Button>
      <Button variant='secondary' className='block w-full h-8 mb-3'>Placeholder</Button>
    </div>
  )
}
