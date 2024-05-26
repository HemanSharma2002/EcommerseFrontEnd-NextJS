"use client"
import React, { useState } from 'react'

type Props = {}


export default function AdminDashboard({ }: Props) {
  const [otp, setotp] = useState("")
  return (
    <div className=' flex items-center justify-center text-7xl h-full'>
      Admin Dashboard
    </div>
  )
}