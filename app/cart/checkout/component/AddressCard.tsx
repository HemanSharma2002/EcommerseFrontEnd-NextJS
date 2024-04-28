import { Address } from '@/app/admin/Interfaces/Interfaces'
import { deleteAddress, setActiveAddress } from '@/app/backendApiCalls/api'
import { Call, Delete } from '@mui/icons-material'
import React from 'react'

type Props = { updatable: boolean, address: Address,load?:Function,step?:Function }

export default function AddressCard({ updatable, address,load,step }: Props) {
  return (
    <div className=' w-full 0 h-48 p-3 flex flex-col gap-2 text-blue-950 shadow-xl'>
      <div className=' flex flex-row justify-between'>
        <div className=' flex flex-row gap-3 pt-2'>
          <p>{address.firstName}</p>
          <p>{address.lastName}</p>
        </div>
        {updatable&&<p  className=' px-2 mx-2 py-1 text-sm mt-1 hover:bg-blue-950 hover:text-white cursor-pointer rounded-md' onClick={async()=>{
          await setActiveAddress(address.id).then(resp=>{
            if(resp.data!=null){
              step(2)
            }
          }).catch(resp=>console.log(resp))

        }}>Deliver Here </p>}
      </div>

      <div className=' flex flex-col gap-2'>
        <div className='flex flex-row gap-3'>
          <p>{address.streetAddress}</p>
          <p>{address.city}</p>
        </div>
        <p>{address.state}</p>
      </div>
      <div className=' flex flex-row gap-2'><p>Pincode :</p>
        <p>{address.pincode
        }</p>
      </div>
      <div className='flex flex-row justify-between pr-2'>
        <div className=' flex flex-row gap-3'>
          <Call />
          <p>{address.mobile}</p>
        </div>
        {updatable && <div>
          <button onClick={async(e)=>{
            e.preventDefault()
            await deleteAddress(address.id).then(resp=>console.log(resp)).catch(resp=>console.log(resp))
            load()
          }}><Delete /></button>
        </div>}
      </div>
    </div>
  )
}