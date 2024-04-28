"use client"
import { Order, validate } from '@/app/admin/Interfaces/Interfaces'
import { getUserOrders } from '@/app/backendApiCalls/api'
import { CircularProgress, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { Box, BoxesIcon, ChevronDown, MenuIcon, Search } from 'lucide-react'

type Props = {}

export default function OrdersPage({ }: Props) {
  validate()
  const [ordersList, setordersList] = useState<Order[]>()
  const [search, setsearch] = useState("")
  const [menu, setmenu] = useState(false)
  const [sort, setsort] = useState("")
  useEffect(() => loadPage(), [])
  function loadPage() {
    getUserOrders().then(resp => {
      setordersList(resp.data)
      // console.log(resp.data)
    }).catch(resp => resp)
  }
  return (
    <div className=' w-full min-h-screen relative'>
      {ordersList ? <div className=' p-3'>
        <div>

        </div>
        <div className=' py-2 flex flex-row justify-between'>
          <p className='text-2xl flex flex-row gap-3'>Orders {<Box className='mt-1' />}</p>
          <div className=' flex flex-row gap-2  bg-blue-950 rounded-2xl pr-5 text-white'>
            <input type="text" className='p-2 bg-blue-950 pl-5 rounded-2xl w-[500px]' value={search} placeholder='Search ' onChange={(e) => setsearch(e.target.value as string)} />
            <Search className='m-2' />
          </div>
          <div className=' flex flex-row gap-2'>

            <div className=' px-20 relative  '>
              <div className='flex hover:bg-blue-950 px-4 hover:text-white rounded-md flex-row gap-2 ' onClick={() => setmenu(!menu)}>
                <button className=' text-xl p-1 px-3 rounded-md'>Sort</button>
                <MenuIcon className={` m-2 duration-300 ${menu ? " rotate-180" : " rotate-0"}`} />
              </div>
              {menu && <div className=' bg-white absolute left-0 text-center w-full py-3 flex flex-col z-10 gap-3  rounded-md'>
                <button className=' hover: underline ' onClick={() => setsort("price_low")}>Last </button>
                <button className=' hover: underline ' onClick={() => setsort("price_high")}>Last three months</button>
              </div>}
            </div>
          </div>
        </div>
        <div>
          <div>

          </div>
          <div className=' p-2 flex flex-col gap-3' >
            {ordersList.map(order => (
              <div key={order.id}>
                <OrderCard order={order} loadPage={loadPage}  />
              </div>
            ))}
          </div>
        </div>
      </div>
        :
        <CircularProgress className=' absolute left-1/2 top-1/2' color="inherit" />}
    </div>
  )
}