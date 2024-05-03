"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Order } from '../Interfaces/Interfaces'
import { CircularProgress } from '@mui/material'
import { adminApigetUsersData } from '@/app/backendApiCalls/api'
import { useAuth } from '@/app/auth/auth'
import { Search } from 'lucide-react'

type Props = {}
interface Pageing {
    content: User[],
    size: number,
    number: number,
    totalPages: number,
    totalElements: number
}
interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    mobile: string,
}
export default function AdminUserPage({ }: Props) {

    const path = usePathname()
    const router = useRouter()
    const [currentPage, setcurrentPage] = useState<Number>(0)
    const [totalPage, settotalPage] = useState<Number>(1)
    const [search, setsearch] = useState("")
    const [data, setdata] = useState<Pageing>()
    useEffect(loadPage, [])
    function loadPage() {
        const param = new URLSearchParams(window.location.search)
        adminApigetUsersData(Number(param.get("page"))).then(resp => {
            console.log(resp)
            setdata(resp.data)
        }).catch(resp => resp)
    }
    return (
        <div className=' w-full h-[900px] relative'>

            {data ?
                <div className=' w-full'>
                    <div className='px-8 p-2 py-4 flex flex-row justify-between '>
                        <p className=' text-2xl'>Users Detail</p>
                        <div className=' flex flex-row gap-2  bg-blue-950 rounded-2xl pr-5 text-white'>
                            <input type="text" className='p-2 bg-blue-950 pl-5 rounded-2xl' value={search} placeholder='Search ' onChange={(e) => setsearch(e.target.value as string)} />
                            <Search className='m-2' />
                        </div>
                    </div>
                    <div className='w-full p-3 px-5'>
                        <table className=' w-full ' >
                            <thead className='w-full'>
                                <tr className=' w-full flex flex-row text-lg justify-center bg-gray-200'>
                                    <td className=' h-max  w-40'>Id</td>
                                    <td className=' h-max  w-40'>First Name</td>
                                    <td className=' h-max  w-40'>LastName</td>
                                    <td className=' h-max  w-80' >Email</td>
                                    <td className=' h-max  w-40'>Role</td>
                                    <td className=' h-max  w-40'>Mobile</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.content.map(user => (
                                        <tr key={user.id} className={`w-full flex flex-row  justify-center ${user.id % 2 == 0 ? "bg-gray-200" : " bg-white"}`}>
                                            <td className=' h-max w-40'>{user.id}</td>
                                            <td className=' h-max w-40'>{user.firstName}</td>
                                            <td className=' h-max w-40'>{user.lastName}</td>
                                            <td className=' h-max w-80 '>{user.email}</td>
                                            <td className=' h-max w-40'>{user.role}</td>
                                            <td className=' h-max w-40'>{user.mobile}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <CircularProgress className=' absolute left-1/2 top-1/3' color="inherit" />
            }
        </div>
    )
}