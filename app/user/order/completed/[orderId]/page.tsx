import React from 'react'
import CompletedPage from './component/CompletedPage'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
        <CompletedPage steps={0}/>
    </div>
  )
}