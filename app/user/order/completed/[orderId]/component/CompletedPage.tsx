"use client"
import React from 'react'
import OrderPage from '../../../[orderId]/component/OrderPage'
import { useParams } from 'next/navigation'
import { PaymentDetail } from '@/app/admin/Interfaces/Interfaces'

type Props = {steps:number}

export default function CompletedPage({steps}: Props) {
  return (
    <div>
        <div>
           
        </div>
        <OrderPage step={steps} checkout={true}/>
    </div>
  )
}