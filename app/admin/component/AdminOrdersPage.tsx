"use client"

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { defaultTheme, Order } from '../Interfaces/Interfaces'
import { adminApigetAllOrder, adminApigetOrderById } from '@/app/backendApiCalls/api'
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material'
import { Box, Search } from 'lucide-react'
import OrderCard from '@/app/user/order/components/OrderCard'

type Props = {}

interface Pageing {
  content: Order[],
  size: number,
  number: number,
  totalPages: number,
  totalElements: number
}

export default function AdminOrdersPage({ }: Props) {
  const path = usePathname()
  const router = useRouter()
  const [currentPage, setcurrentPage] = useState<Number>(0)
  const [totalPage, settotalPage] = useState<Number>(1)
  const [search, setsearch] = useState("")
  const [data, setdata] = useState<Pageing>()
  const [status, setstatus] = useState("ALL")
  useEffect(loadPage, [status])
  function loadPage() {
    const param = new URLSearchParams(window.location.search)
    setcurrentPage(Number(param.get("page")) + 1)
    console.log(param.get("page"));

    adminApigetAllOrder(status, Number(param.get("page"))).then(resp => {
      console.log(resp)
      setdata(resp.data)
    }).catch(resp => resp)
  }
  return (
    <div className='w-full md:h-[900px]'>
      {
        data ?
          <div className=' p-3'>
            <div className=' flex flex-row px-5 p-3 justify-between'>
              <div className=' flex items-center'>
                <div className='text-3xl flex flex-row gap-5'>
                  <p>Orders</p>
                  <p className='pt-2'><Box /></p>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <div className=' flex flex-row gap-2  bg-blue-950 rounded-2xl pr-5 text-white'>
                  <input type="text" className='p-2 bg-blue-950 pl-5 rounded-2xl' value={search} placeholder='Search ' onChange={(e) => {
                    setsearch(e.target.value as string)
                    const param = new URLSearchParams(window.location.search)
                    param.set("page", "0")
                    router.push(path.toString() + "?" + param.toString())
                    setcurrentPage(0)
                    setstatus("ALL")
                    if(e.target.value!==""){
                      adminApigetOrderById(Number(e.target.value)).then(resp => setdata(resp.data))
                    }
                    else{
                      loadPage()
                    }
                  }} />
                  <Search className='m-2' />
                </div>
                <ThemeProvider theme={defaultTheme}>
                  <FormControl fullWidth>
                    <InputLabel >Status</InputLabel>
                    <Select label="Satus" value={status} onChange={e => {
                      const param = new URLSearchParams(window.location.search)
                      param.set("page", "0")
                      router.push(path.toString() + "?" + param.toString())
                      setcurrentPage(0)
                      setTimeout(() => setstatus(e.target.value), 300)

                    }}>
                      <MenuItem value="ALL" >ALL</MenuItem>
                      <MenuItem value="PENDING" >PENDING</MenuItem>
                      <MenuItem value="PLACED" >PLACED</MenuItem>
                      <MenuItem value="SHIPPED" >SHIPPED</MenuItem>
                      <MenuItem value="DELIVERED" >DELIVERED</MenuItem>
                      <MenuItem value="CANCELED" >CANCELED</MenuItem>
                      <MenuItem value="RETURNED" >RETURNED</MenuItem>
                    </Select>
                  </FormControl>
                </ThemeProvider>
              </div>
            </div>
            <div>
              <p className='text-lg'>Total elements found : {data.totalElements}</p>
              <p className='text-lg'>Total pages : {data.totalPages}</p>
              <p className='text-lg'>Current page  : {String(currentPage)}</p>
              <div className=' flex flex-row justify-center'>
                <div className=' flex flex-row gap-6'>
                  {currentPage != 1 && <Button sx={{ bgcolor: "#002D62", color: "white", ":hover": { bgcolor: "#00308F" } }} onClick={() => {
                    const param = new URLSearchParams(window.location.search)
                    param.set("page", String(Number(currentPage) - 2))
                    router.push(path.toString() + "?" + param.toString())
                    adminApigetAllOrder(status, Number(currentPage) - 2).then(resp => {
                      console.log(resp)
                      setdata(resp.data)
                    }).catch(resp => resp)
                    setcurrentPage(Number(currentPage) - 1)
                  }} >Prev</Button>}
                  {currentPage != data.totalPages && <Button sx={{ bgcolor: "#002D62", color: "white", ":hover": { bgcolor: "#00308F" } }} onClick={() => {
                    const param = new URLSearchParams(window.location.search)
                    param.set("page", String(currentPage))
                    router.push(path.toString() + "?" + param.toString())
                    adminApigetAllOrder(status, Number(currentPage)).then(resp => {
                      console.log(resp)
                      setdata(resp.data)
                    }).catch(resp => resp)
                    setcurrentPage(Number(currentPage) + 1)
                  }}>Next</Button>}
                </div>
              </div>
            </div>
            <div className=' flex flex-col gap-2 pt-2'>
              {
                data.content.map(order => (
                  <div key={order.id}>
                    <OrderCard order={order} admin={true} loadPage={loadPage} />
                  </div>
                ))
              }
            </div>
          </div>
          :
          <CircularProgress className=' absolute left-1/2 top-1/3' color="inherit" />
      }
    </div>
  )
}