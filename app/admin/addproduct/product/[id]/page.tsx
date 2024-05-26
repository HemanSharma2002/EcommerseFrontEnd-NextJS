"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '../../../Interfaces/Interfaces'
import { getProductsById } from '@/app/backendApiCalls/api'
import { useParams } from 'next/navigation'
import { error } from 'console'
import { AxiosError } from 'axios'
import ProductDetailSection from '@/app/products/id/[id]/components/ProductSection/ProductDetailSection'

type Props = {}

export default function AdminProduct({}: Props) {
  const {id}=useParams()
    const [product, setproduct] = useState<Product>()
    useEffect(()=>loadPage(),[])
    function loadPage(){
        getProductsById(Number(id)).then(resp=>{
          setproduct(resp.data)
        }).catch(
          error=>{
            const Error:AxiosError=error
            console.error("Error",Error);
            
          }
        )
    }
  return (
    <div className=' p-3'>
      {product&&<ProductDetailSection product={product} isAdmin={true}/>}
    </div>
  )
}