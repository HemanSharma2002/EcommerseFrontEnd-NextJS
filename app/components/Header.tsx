"use client"
import React, { useEffect, useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import axios from 'axios'
import { LocalMall, Search, ShoppingBagRounded } from '@mui/icons-material'
import Link from 'next/link'
import { Auths, useAuth } from '../auth/auth'
import { getAllCategoryApi, getUserCart } from '../backendApiCalls/api'
import { Cart } from '../admin/Interfaces/Interfaces'
import { ShoppingBag } from 'lucide-react'

type Props = {}
interface Category {
    name: String,
    url: string,
    children: Category[]
}

export default function Header({ }: Props) {
    const [category, setcategory] = useState<Category[]>([])
    const [search, setsearch] = useState("")
    const auth:Auths=useAuth()
    function loadPage() {
        
        getAllCategoryApi().then(resp => setcategory(resp.data)).catch(err => console.error(err))
        if (!auth.Auth){
            return 
        }
        getUserCart().then(resp => {
            const cart:Cart=resp.data
            auth.setitemInCart(cart.totalItem)
        }).catch(err => console.error(err))
    }
    useEffect(() => loadPage(), [auth.Auth])
    return (
        <div>
            <div className='flex flex-row w-full'>
                <div className=' text-2xl w-1/6  flex justify-center items-center'>
                    Logo
                </div>
                <div className=' flex flex-col  w-5/6'>
                    <div className=' w-full flex flex-col items-end px-10 pt-1'>
                        {auth.user.auth?<div className=' flex flex-row gap-2 '>
                            <div className='x-2 pt-1 '><Link href={`/user`} className=' p rounded-md duration-200 cursor-pointer'>{auth.user.username}</Link></div>
                            <div>|</div>
                            <div ><button className='hover:bg-blue-950 hover:text-white px-2 py-1 rounded-md duration-200' onClick={()=>{
                                auth.logout()
                            }}>Sign Out</button></div>
                        </div>
                        :<div className=' flex flex-row gap-2 '>
                            <div ><button className='hover:bg-blue-950 hover:text-white px-2 py-1 rounded-md duration-200'><Link href={`/user/authorization/signin`}>Sign In</Link></button></div>
                            <div>|</div>
                            <div ><button className='hover:bg-blue-950 hover:text-white px-2 py-1 rounded-md duration-200'><Link  href={`/user/authorization/signup`}>Create an account</Link></button></div>
                        </div>
                        }
                    </div>
                    <nav className=' py-2 flex flex-row justify-between items-end px-10 '>
                        <div className=' w-2/3 '>
                            <div>
                                <NavigationMenu className=' text-blue-950 px-3  '>
                                    <NavigationMenuList>
                                        {
                                            category.map(top => (
                                                <NavigationMenuItem key={Number(top.name)}>
                                                    <NavigationMenuTrigger >{top.name}</NavigationMenuTrigger>
                                                    <NavigationMenuContent className=' text-blue-950 ' >
                                                        {
                                                            top.children.map(second => (
                                                                <div key={Number(second.name)}>
                                                                    <Link className=' text-xl font-semibold  hover:underline' href={second.url}>{second.name}</Link>
                                                                    <div className=' px-2 '>
                                                                        {
                                                                            second.children.map(third => (
                                                                                <Link className=' hover:underline' key={Number(third.name)} href={third.url}>{third.name}</Link>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                            ))

                                        }
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            About
                                        </NavigationMenuLink>
                                    </NavigationMenuList>

                                </NavigationMenu>
                            </div>
                        </div>
                        <div className=' flex flex-row gap-3'>
                            <div className=' flex flex-row gap-2  bg-blue-950 rounded-2xl pr-5 text-white'>
                                <input type="text" className='p-2 bg-blue-950 pl-5 rounded-2xl' value={search} placeholder='Search ' onChange={(e) => setsearch(e.target.value as string)} />
                                <Search className='m-2' />
                            </div>
                            <Link href={`/cart`} className=' flex flex-row gap-2 '>
                                <div className=' border-2 rounded-full p-1 border-blue-950 hover:bg-blue-950 group hover:text-white'><LocalMall className='text-blue-950 group-hover:text-white' /></div>
                                <p className=' '>{auth.itemInCart}</p>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
            <div className='h-[4px] w-screen bg-blue-950'></div>
        </div>
    )
}