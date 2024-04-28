import React from 'react'
import Dashboard from './component/dashboard';

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className=' flex flex-row h-[900px]'>
        <div className='w-1/5 h-full '><Dashboard/></div>
        <div className='w-4/5 h-full overflow-y-scroll'>{children}</div>
    </div>
  )
}