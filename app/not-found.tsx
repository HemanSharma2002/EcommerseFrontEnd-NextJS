import React from 'react'

type Props = {}

export default function NotFound({}: Props) {
  return (
    <div className=' flex items-center justify-center h-screen w-full text-7xl gap-1 text-blue-950  '>
      <p className=' animate-bounce duration-300'>4</p>
      <p className=' animate-bounce duration-700'>0</p>
      <p className=' animate-bounce duration-500'>4</p>
      Page
      <p className=' animate-pulse'>not</p> 
       found
      
    </div>
  )
}