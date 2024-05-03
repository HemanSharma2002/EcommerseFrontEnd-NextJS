import React from 'react'
import CartPage from './components/CartPage'
import { getUserCart } from '../backendApiCalls/api'
import { Cart } from '../admin/Interfaces/Interfaces'

type Props = {}

export default async function Page({}: Props) {
  
  return (
    <div>
        <CartPage updatable={true} setStep={()=>{
          return
        }} component={<p></p>}/>
    </div>
  )
}