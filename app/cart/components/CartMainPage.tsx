"use client"
import React from 'react'
import CartPage from './CartPage'

type Props = {}

export default function CartMainPage({}: Props) {
    function dummey(){
        return 
      }
  return (
    <div>
        <CartPage updatable={true} setStep={dummey} component={<p></p>}/>
    </div>
  )
}