"use client"
import { Box, LucideBoxes, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

export default function Dashboard({ }: Props) {
    const path=usePathname()
    return (
        <div className=' h-full border-2 border-r-blue-950 p-3 text-blue-950'>
            <div className='text-2xl'>
                Admin Panel
            </div>
            <div className=' p-2 flex flex-col gap-3'>
                <div className='text-xl'>Dashboard</div>
                <div className=' flex flex-col gap-3 w-full text-lg'>
                    <Link href={`/admin/products`} className={` flex flex-row gap-5 hover:bg-blue-950 hover:text-white py-2 px-3 rounded-sm ${path==`/admin/products`?` bg-blue-950 text-white`:` text-blue-950`}`}>
                        <p>Products</p>
                        <p><ShoppingCart /></p>
                    </Link>
                    <Link href={`/admin/products`} className={` flex flex-row gap-5 hover:bg-blue-950 hover:text-white py-2 px-3 rounded-sm ${path==`/admin/products`?` bg-blue-950 text-white`:` text-blue-950`}`} >
                        <p>Orders</p>
                        <p><Box /></p>
                    </Link>
                    <Link href={`/admin/users`} className={` flex flex-row gap-5 hover:bg-blue-950 hover:text-white py-2 px-3 rounded-sm ${path==`/admin/users`?` bg-blue-950 text-white`:` text-blue-950`}`} >
                        <p>User</p>
                        <p><User /></p>
                    </Link>
                    <Link href={`/admin/addproduct`} className={` flex flex-row gap-5 hover:bg-blue-950 hover:text-white py-2 px-3 rounded-sm ${path==`/admin/addproduct`?` bg-blue-950 text-white`:` text-blue-950`}`}>
                        <p>Add product</p>
                        <p><LucideBoxes /></p>
                    </Link>
                </div>
            </div>
        </div>
    )
}