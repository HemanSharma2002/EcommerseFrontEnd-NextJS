import React from 'react'
import OrderPage from './component/OrderPage'

type Props = {}

export default function page({}: Props) {
  return (
    <div><OrderPage step={0} checkout={false}/></div>
  )
}