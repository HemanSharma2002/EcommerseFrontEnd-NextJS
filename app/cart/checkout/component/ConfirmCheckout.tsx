import React, { useEffect, useState } from 'react'
import CartPage from '../../components/CartPage'
import { Address } from '@/app/admin/Interfaces/Interfaces'
import { getActiveAddress } from '@/app/backendApiCalls/api'
import AddressCard from './AddressCard'
import { ArrowBack } from '@mui/icons-material'

type Props = {setStep:Function}

export default function ConfirmCheckout({setStep }: Props) {
    const [address, setaddress] = useState<Address>()
    useEffect(() => {
        getActiveAddress().then(resp => setaddress(resp.data)).catch(resp => console.log(resp))
    }, [])
    function dummey(){
        return
    }
    return (
        <div>
            <div className='px-3 text-blue-950' onClick={()=>setStep(1)}><ArrowBack/></div>
            <CartPage updatable={false} setStep={setStep} component={address ? <AddressCard address={address} updatable={false} loadPage={dummey} setStep={dummey}   /> : <p></p>} />
        </div>
    )
}