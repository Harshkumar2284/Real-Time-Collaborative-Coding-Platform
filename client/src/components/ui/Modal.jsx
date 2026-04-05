import React from 'react'

export default function Modal({display,children}) {
  return (
    <div className={`bg-[#0B1015] w-full h-screen absolute top-0 left-0  ${display} flex justify-center items-center z-10` }>
      
        {children}
      
    </div>
  )
}
