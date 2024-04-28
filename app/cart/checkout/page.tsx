"use client"
import React from 'react'
import CheckoutPage from './component/CheckoutPage'
import { validate } from '@/app/admin/Interfaces/Interfaces'
type Props = {}

export default function page({}: Props) {
    validate()
    
  return (
    <div><CheckoutPage/></div>
  )
}