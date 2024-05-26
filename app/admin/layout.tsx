"use client"
import React from 'react'
import Dashboard from './component/dashboard';
import { Auths, useAuth } from '../auth/auth';
import { useRouter } from 'next/navigation';

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const auth:Auths=useAuth();
    const router=useRouter();
    function isAdmin(){
      function verifyAdminStatus(){
        if(auth.user.role==="ADMIN"){
          return
        }
        router.push("/")
      }
      verifyAdminStatus()
    }
    isAdmin()
  return (
    <div className=' flex flex-row h-[900px]'>
        <div className='w-1/5 h-full '><Dashboard/></div>
        <div className='w-4/5 h-full overflow-y-scroll'>{children}</div>
    </div>
  )
}