import React from 'react'

export default function Button({
    children,
    variant="primary",
    className="",
    ...props
}){
    const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  }

  return (
    <button className={` rounded-md font-medium transition cursor-pointer ${variants[variant]} ${className}`}{...props}>
      {children}
    </button>
  )
}
