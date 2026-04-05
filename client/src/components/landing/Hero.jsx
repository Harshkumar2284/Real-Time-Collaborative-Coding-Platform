import React from 'react'
import coding from '../../assets/coding.jpg'
import Button from '../ui/Button'

export default function Hero() {
    return (
        <div className='w-full flex-col items-center mt-20 mb-20'>
            <div className='w-3/4 ml-40 flex justify-evenly'>
                <img className=' rounded' src={coding} height={300} width={700} />
                <div className='mt-10'>
                    <p className='primary-text text-5xl font-semibold'>Code Together</p>
                    <p className='primary-text text-6xl font-bold'>Instantly.</p>
                </div>
            </div>
            <div className='flex'>
                <Button variant="primary" className='ml-140 mt-8 px-4 text-4xl primary-text py-3'>Get Started</Button>
                <Button variant="secondary" className='ml-10 mt-8 px-4 text-4xl primary-text py-3'>Video Demo</Button>
            </div>
        </div>
    )
}
