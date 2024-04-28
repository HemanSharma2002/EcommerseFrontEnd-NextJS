"use client"
import React from 'react'
import CheckoutPage from './component/CheckoutPage'
import { Auths, useAuth } from '@/app/auth/auth'
import { useRouter } from 'next/navigation'
type Props = {}

export default function page({ }: Props) {
  const auth: Auths = useAuth()
  const router = useRouter()

  if (!auth.Auth) {
    auth.setitemInCart(0)
    router.push(`/user/authorization/signin`)
  }


  return (
    <div><CheckoutPage /></div>
  )
}