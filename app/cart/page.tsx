import React from 'react'
import CartPage from './components/CartPage'
import { getUserCart } from '../backendApiCalls/api'
import { Cart } from '../admin/Interfaces/Interfaces'

type Props = {}

export default async function Page({}: Props) {
  function dummey(){
    return 
  }
  return (
    <div>
        <CartPage updatable={true} setStep={dummey} component={<p></p>}/>
    </div>
  )
}