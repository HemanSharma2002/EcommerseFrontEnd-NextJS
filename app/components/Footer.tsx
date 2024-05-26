import { Copyright, StoreIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Footer({ }: Props) {
  return (
    <div className=' w-full min-h-32 bg-slate-900 text-white'>

      <div className=' flex flex-row px-8 justify-between'>
        <div className=' text-2xl   flex flex-row gap-2 justify-center items-center'>
          {/* <StoreIcon className=' h-12 w-10' />
          <p className=' text-2xl font-semibold'>Spring Store</p> */}
          <div className=' w-40 rounded-md'>
            <img className=' rounded-md' src="https://i.postimg.cc/MTF0TKYq/Spring-Store-Logo.png" alt="" />
          </div>
        </div>
        <div className=' pt-2  px-2 text-center'>
          <div>
            <h1 className=' text-lg'>Router Links</h1>
            <p><Link href={`/`}>Home</Link></p>
            <p><Link href={`/admin`}>Admin</Link></p>
            <p><Link href={`http://localhost:8085/swagger-ui/index.html`}> API Documentation</Link></p>
          </div>
        </div>
      </div>
      <div className=' flex flex-row gap-3 py-2 justify-center'>
        <Copyright />
        All rights reserved under @SpringStore
      </div>
    </div>
  )
}