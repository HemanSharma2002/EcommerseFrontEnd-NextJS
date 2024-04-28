import { Address } from '@/app/admin/Interfaces/Interfaces';
import { getActiveAddress, getAddress, postAdress } from '@/app/backendApiCalls/api';
import { ThemeProvider } from '@emotion/react';
import { Email, LocationCity } from '@mui/icons-material';
import { Box, Button, createTheme, dividerClasses, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard';

type Props = {setStep:Function}
const defaultTheme = createTheme({
    typography: {
        fontFamily: [
            "Montserrat", "sans-serif"
        ].join(',')
    }
});


export default function AddressPage({ setStep}: Props) {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [streetAddress, setstreetAddress] = useState("")
    const [city, setcity] = useState("")
    const [state, setstate] = useState("")
    const [pincode, setpincode] = useState("")
    const [mobile, setmobile] = useState("")
    const [message, setmessage] = useState("")

    const [address, setaddress] = useState<Address[]>()
    const [activeAddress, setactiveAddress] = useState<Address>()
    useEffect(()=>loadPage(),[])
    function loadPage(){
        getAddress().then(resp=>setaddress(resp.data)).catch(resp=>console.log(resp))
        getActiveAddress().then(resp=>setactiveAddress(resp.data)).catch(resp=>console.log(resp))
    }

    return (
        <div className='w-full h-full flex flex-row'>
            <div className=' w-1/4 h-[720px] p-2 overflow-scroll'>
                {activeAddress?
                <div className=' border-2 border-blue-950' onClick={()=>setStep(2)}>
                <AddressCard updatable={false} address={activeAddress} load={loadPage} step={setStep}/>
                </div>
            :
            <div className=' h-48 w-full flex justify-center items-center text-xl shadow-md  gap-2 mb-2'>   <LocationCity/> <p>Add Address</p></div>
            }
                <div>
                    {
                        address?.map(ad=>(
                            <div key={ad.id}>
                                <AddressCard updatable={true} address={ad} load={loadPage} step={setStep}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='h-full w-3/4 px-8'>
                <ThemeProvider theme={defaultTheme}>
                    <Box component='form' onSubmit={async(e) => {

                        e.preventDefault()
                        const address: Address = {
                            firstName,
                            lastName,
                            streetAddress,
                            pincode,
                            city,
                            state,
                            mobile
                        }
                        await postAdress(address).then(resp=>console.log(resp)).catch(resp=>console.log(resp))
                        
                        loadPage()
                        setStep(2)
                    }} sx={{ mt: 1 }}>

                        <div className='flex flex-row gap-3'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                value={firstName}
                                onChange={e => setfirstName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                value={lastName}
                                onChange={e => setlastName(e.target.value)}
                            />
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="streetAddress"
                            label="Street Address"
                            name="streetAddress"
                            autoComplete="streetAddress"
                            autoFocus
                            value={streetAddress}
                            onChange={e => setstreetAddress(e.target.value)}
                        />
                        <div className='flex flex-row gap-3'>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="pincode"
                                label="Pincode"
                                name="pincode"
                                autoComplete="pincode"
                                autoFocus
                                value={pincode}
                                onChange={async (e) => {
                                    e.preventDefault()
                                    setpincode(e.target.value)

                                    const code = await fetch(`https://api.postalpincode.in/pincode/${e.target.value}`).then(resp => resp.json())
                                    // console.log(code)
                                    if (code[0].PostOffice == null) {
                                        setmessage(`Enter a valid pincode *`)
                                        setcity("")
                                        setstate("")
                                        return
                                    }
                                    setcity(code[0].PostOffice[0].Block)
                                    setstate(code[0].PostOffice[0].State)
                                    setmessage("")
                                    console.log(code)



                                }}
                            />
                            
                        </div>
                        <div>{message}</div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                            autoFocus
                            value={city}
                            onChange={e => setcity(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoComplete="state"
                            autoFocus
                            value={state}
                            onChange={e => setstate(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile"
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            value={mobile}
                            onChange={e => setmobile(e.target.value)}
                        />
                        <div></div>
                        <div className=' flex flex-col items-center'><Button type='submit' sx={{ padding: "10px", bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#00308F" } }}>Add Address</Button></div>
                    </Box>
                </ThemeProvider>
            </div>

        </div>
    )
}