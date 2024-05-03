import { CartItem, OrderItem } from '@/app/admin/Interfaces/Interfaces'
import { deleteCartItem, updateCartItem } from '@/app/backendApiCalls/api'
import { Delete } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import SelectInput from '@mui/material/Select/SelectInput'
import { MinusCircle, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = { cartItem: CartItem|OrderItem, loadpage: Function, updatable: boolean }

export default function CartCard({ cartItem, loadpage, updatable }: Props) {
  const [quantity, setquantity] = useState(cartItem.quantity)
  return (
    <div className='h-52 flex flex-row  mx-2 shadow-xl'>
      <Link href={`/products/id/${cartItem.product.id}`} className=' h-full w-44 bg-red-200 object obj'>
        <img className='h-full w-full ' src={String(cartItem.product.images[0].imageUrl)} alt={String(cartItem.product.id)} />
      </Link>
      <div className=' p-3 flex flex-col gap-1 relative w-full'>
        <p className='text-xl'>{cartItem.product.brand}</p>
        <p>{cartItem.product.title}</p>
        <p className='text-xl'>₹ {String(cartItem.product.discountedPrice)}</p>
        <div className=' flex flex-row gap-14'>

          <p>₹ {String(cartItem.product.price)}</p>
          <p>{String(cartItem.product.discountPresent)} %</p>
          <p>Size : {cartItem.size}</p>
        </div>
        {!updatable&& <p>Quantity : {cartItem.quantity}</p>}
        <div>
          {updatable? <div className=' flex flex-row absolute bottom-1 justify-between w-full  '>
            <div className='w-40 '>
              <FormControl fullWidth>
                <InputLabel>Quantity</InputLabel>
                <Select label="Quantity" value={cartItem.quantity} onChange={async (e) => {
                  e.preventDefault()
                  await updateCartItem(cartItem.id, e.target.value as number)
                  loadpage()
                }}>
                  <MenuItem value="1" >1</MenuItem>
                  <MenuItem value="2" >2</MenuItem>
                  <MenuItem value="3" >3</MenuItem>
                  <MenuItem value="4" >4</MenuItem>
                  <MenuItem value="5" >5</MenuItem>
                  <MenuItem value="6" >6</MenuItem>
                  <MenuItem value="7" >7</MenuItem>
                  <MenuItem value="8" >8</MenuItem>
                  <MenuItem value="9" >9</MenuItem>
                  <MenuItem value="10" >10</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className='px-10 text-blue-950 opacity-90' onClick={async () => {
              await deleteCartItem(cartItem.id).then(resp => console.log(resp)).catch(resp => console.log(resp))
              loadpage()
            }
            }><Delete fontSize='large' className='my-2' /></p>
          </div>
          :
          <div></div>
          }
        </div>
      </div>
    </div>
  )
}

