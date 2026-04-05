import React from 'react'
import Header from '../components/room/Header'
import IDE from '../components/room/IDE'

export default function Room() {
    return (
        <div>
            <Header />
            <div className='w-full flex'>
                <div className='w-9/12'>
                    <IDE />
                </div>
                <div className='w-3/12'>

                </div>
            </div>
        </div>
    )
}
