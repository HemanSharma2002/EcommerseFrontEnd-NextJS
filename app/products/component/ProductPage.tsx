"use client"
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, CircularProgress, dividerClasses, FormControlLabel, FormGroup, Stack } from '@mui/material'
import { ChevronDown } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import axios from 'axios'
import { error } from 'console'
import { Product } from '@/app/admin/Interfaces/Interfaces'
import ProductCard from './ProductCard'
import { getProductsBySecondLevelCategory, getProductsByThirdLevelCategory, getProductsByTopLevelCategory } from '@/app/backendApiCalls/api'
interface Page {
  content: Product[]
  , totalPages: number
}

interface Param {
  top: String,
  second: String,
  third: String,
  id: String
}
type Props = {}

export default function ProductPage({ }: Props) {
  const router = useRouter()
  const param = useParams()
  const [color, setcolor] = useState<String[]>([])
  const [pattern, setpattern] = useState<String[]>([])
  const [menu, setmenu] = useState(false)
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPage, settotalPage] = useState()
  const [page, setpage] = useState<Page>()
  const [sort, setsort] = useState("price_low")
  useEffect(() => loadPage(), [sort, color.length, pattern.length])

  function loadPage() {
    const obj = {
      sort: sort,
      colors: color,
      pattern: pattern
    }
    console.log(obj)
    if (param?.top && param?.second && param?.third) {
      getProductsByThirdLevelCategory(param, obj, currentPage - 1).then(resp => {
        setpage(resp.data)
        console.log(resp.data)
        settotalPage(resp.data.totalPages)
      }).catch(err => console.log(err))
      console.log("third")
    }
    else if (param?.top && param?.second) {
      getProductsBySecondLevelCategory(param, obj, currentPage - 1).then(resp => {
        setpage(resp.data)
        console.log(resp.data)
        settotalPage(resp.data.totalPages)
      }).catch(err => console.log(err))
      console.log("second")
    }
    else {
      getProductsByTopLevelCategory(param, obj, currentPage - 1).then(resp => {
        setpage(resp.data)
        console.log(resp.data)
        settotalPage(resp.data.totalPages)
      }).catch(err => console.log(err))
      console.log("top")
    }
  }
  console.log(param)
  return (
    <div className='p-2 w-full h-full relative'>
      {page?<div>
        <div className=' flex flex-row justify-between'>
          <div className=' flex flex-row gap-6 px-12  opacity-50 py-2'>
            <p>/</p>
            <p className=' hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}`)}>{param.top}</p>
            {param.second &&
              <div className=' flex flex-row gap-6'>
                <p>/</p>
                <p className=' hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}/${param.second}/`)}>{param.second}</p>
              </div>
            }
            {param.third &&
              <div className=' flex flex-row gap-6'>
                <p>/</p>
                <p className=' hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}/${param.second}/${param.third}`)}>{param.third}</p>
              </div>
            }
          </div>
          <div className=' px-20 relative  '>
            <div className='flex hover:bg-blue-950 px-4 hover:text-white rounded-md flex-row gap-2 ' onClick={() => setmenu(!menu)}>
              <button className=' text-xl p-1 px-3 rounded-md'>Sort</button>
              <ChevronDown className={` m-2 duration-300 ${menu ? " rotate-180" : " rotate-0"}`} />
            </div>
            {menu && <div className=' bg-white absolute left-0 text-center w-full py-3 flex flex-col z-10 gap-3  rounded-md'>
              <button className=' hover: underline ' onClick={() => setsort("price_low")}>Price: low to high</button>
              <button className=' hover: underline ' onClick={() => setsort("price_high")}>Price: high to low</button>
            </div>}
          </div>
        </div>
        <div className='p-2 h-[720px] w-full flex flex-row'>
          <div className='  w-1/4 h-full overflow-y-scroll p-2'>
            <div className=' flex flex-col gap-3'>
              <p className=' px-2 text-xl underline'>{page?.totalElements} Products found</p>
              <p className=' px-2 hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}`)}>{param?.top}</p>
              <p className=' px-2 hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}/${param.second}`)}>{param?.second}</p>
              <p className=' px-2 hover:underline cursor-pointer' onClick={() => router.push(`/products/${param.top}/${param.second}/${param.third}`)}>{param?.third}</p>
              <p className=' px-2 hover:underline cursor-pointer' onClick={() => router.push(`/products/latest`)}>Latest Collections</p>
              <div>
                <Accordion>
                  <AccordionSummary className=' px-2' expandIcon={<ChevronDown />}>
                    Color
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>

                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "White")) {
                          setcolor(color.filter(c => c != "White"))
                          return
                        }
                        setcolor([...color, "White"])
                      }} />} label="White" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "Black")) {
                          setcolor(color.filter(c => c != "Black"))
                          return
                        }
                        setcolor([...color, "Black"])
                      }} />} label="Black" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "Beige")) {
                          setcolor(color.filter(c => c != "Beige"))
                          return
                        }
                        setcolor([...color, "Beige"])
                      }} />} label="Beige" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "Blue")) {
                          setcolor(color.filter(c => c != "Blue"))
                          return
                        }
                        setcolor([...color, "Blue"])
                      }} />} label="Blue" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "Red")) {
                          setcolor(color.filter(c => c != "Red"))
                          return
                        }
                        setcolor([...color, "Red"])
                      }} />} label="Red" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (color.some(s => s == "Grey")) {
                          setcolor(color.filter(c => c != "Grey"))
                          return
                        }
                        setcolor([...color, "Grey"])
                      }} />} label="Grey" />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary className=' px-2' expandIcon={<ChevronDown />}>
                    Pattern
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (pattern.some(p => p == "Solid")) {
                          setpattern(pattern.filter(p => p != "Solid"))
                          return
                        }
                        setpattern([...pattern, "Solid"])
                      }} />} label="Solid" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (pattern.some(p => p == "Check")) {
                          setpattern(pattern.filter(p => p != "Check"))
                          return
                        }
                        setpattern([...pattern, "Check"])
                      }} />} label="Check" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (pattern.some(p => p == "Printed")) {
                          setpattern(pattern.filter(p => p != "Printed"))
                          return
                        }
                        setpattern([...pattern, "Printed"])
                      }} />} label="Printed" />
                      <FormControlLabel control={<Checkbox onChange={e => {
                        if (pattern.some(p => p == "Pattern")) {
                          setpattern(pattern.filter(p => p != "Pattern"))
                          return
                        }
                        setpattern([...pattern, "Pattern"])
                      }} />} label="Pattern" />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </div>
          <div className='  w-3/4 h-full m-2  border-2 rounded-md border-blue-950 relative overflow-y-scroll'>

            {page && <div className=' p-4 flex flex-wrap  gap-5 justify-center'>
              {
                page.content.map(
                  product => (
                    <div key={Number(product.id)}>
                      <ProductCard product={product} />
                    </div>
                  )
                )
              }
              

            </div>}
            <div className=' absolute bottom-4 left-96 right-96'>
              <Pagination>
                <PaginationContent className='gap-4'>
                  {currentPage != 1 && <PaginationItem>
                    <PaginationPrevious onClick={() => {
                      if (currentPage == 1) {
                        return
                      }
                      setcurrentPage(currentPage - 1)
                    }} />
                  </PaginationItem>}
                  <PaginationItem>
                    <PaginationContent>{currentPage}</PaginationContent>
                  </PaginationItem>

                  {currentPage != totalPage && <PaginationItem>
                    <PaginationNext onClick={() => {
                      if (currentPage == totalPage) {
                        return
                      }
                      setcurrentPage(currentPage + 1)
                    }} />
                  </PaginationItem>}
                </PaginationContent>

              </Pagination>

            </div>
          </div>
        </div>
      </div>
      :<CircularProgress className=' absolute left-1/2 top-1/2' color="inherit" />}
    </div>
  )
}