import React from 'react'
import icon from '../../assets/icon.png'
import { useParams } from 'react-router-dom'
import Button from '../ui/Button'

export default function Header() {
    const {roomId} = useParams()
  return (
    <div className='secondary-bg h-24 w-full flex items-center justify-between'>
      <div className='flex ml-7'>
        <img src={icon} height={50} width={50} className=' mr-2 hover:cursor-pointer'/>
        <h1 className='primary-text text-3xl hover:cursor-pointer font-semibold'><span className='text-4xl font-bold'>S</span>yn<span className='text-4xl font-bold'>C</span>ode</h1>
      </div>
      <div className='primary-text font-semibold mt-2'>
        Room ID : <span className='font-bold mr-2 ml-2'>{roomId}</span>|<span onClick={()=>navigator.clipboard.writeText(roomId)} className='ml-2 hover:underline hover:cursor-pointer'>copy room id</span>
      </div>
      <Button variant='danger' className='mt-2 px-2 py-1 font-semibold text-lg mr-10'>Leave Room</Button>
    </div>
  )
}
