import Link from 'next/link'
import React from 'react'

type Props = {}

export default function UserPage({}: Props) {
  return (
    <div className=' flex justify-center items-center h-screen'>
        <div>

        </div>
        <div className=' bg-blue-950 rounded-md text-white px-8 py-2 text-xl'>
        <Link href={`/user/order`} >
            Orders
        </Link>
        </div>
    </div>
  )
}