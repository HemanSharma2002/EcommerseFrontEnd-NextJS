"use client"
import React, { useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Loader2, LockIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { log } from 'console'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError, AxiosResponse } from 'axios'
import { resendOtpApi, verifyOtpApi } from '@/app/backendApiCalls/api'
import { ApiResponse } from '@/app/admin/Interfaces/Interfaces'

type Props = {}

export default function Verify({ }: Props) {
    const { id } = useParams()
    const [otp, setotp] = useState<String>()
    const { toast } = useToast()
    const [isVerifyingOtp, setisVerifyingOtp] = useState(false)
    const [isResedActive, setisResedActive] = useState(false)
    const router = useRouter()
    async function verifyOtp() {
        try {
            const resp: AxiosResponse = await verifyOtpApi(Number(id), String(otp))
            const data: ApiResponse = resp.data
            if (data.success) {
                toast({
                    title: "Verification Success",
                    description: data.message
                })
                router.push(`/user/authorization/signin`)
            }
            else {
                toast({
                    title: "Verification Failed",
                    description: data.message,
                    variant: "destructive"
                })
            }
            setisVerifyingOtp(true)
        } catch (error) {
            console.error(error);

            const resp = error as AxiosError<ApiResponse>
            toast({
                title: "Verification Failed",
                description: resp.message,
                variant: "destructive"
            })
        } finally {
            setisVerifyingOtp(false)
        }
    }
    async function resendOtp() {
        try {
            setisVerifyingOtp(true)
            console.log(id);

            const resp: AxiosResponse = await resendOtpApi(Number(id))
            const data: ApiResponse = resp.data
            if (data.success) {
                toast({
                    title: "Verification Success",
                    description: data.message
                })
            }
            else {
                toast({
                    title: "Verification Failed",
                    description: data.message,
                    variant: "destructive"
                })
            }
        } catch (error) {
            const resp = error as AxiosError<ApiResponse>
            toast({
                title: "Verification Failed",
                description: resp.message,
                variant: "destructive"
            })
        } finally {
            setisVerifyingOtp(false)
        }
    }
    return (
        <div className=' w-full h-[682px] flex flex-row'>
            <div className=' w-2/3 '>
                <img src="https://images.pexels.com/photos/1563355/pexels-photo-1563355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image source" />
            </div>
            <div className=' w-1/3 flex items-center justify-center'>

                <div className='min-h-52 w-full flex flex-col items-center gap-20 pt-4 relative'>
                    <div className=' flex flex-col items-center'>
                        <div>
                            <div className=' p-3 w-min bg-[#002D62] rounded-full'>
                                <LockIcon className=' bg-[#002D62] text-white ' />
                            </div>
                        </div>
                        <p className=' text-center text-2xl  text-blue-950 p-2 px-10  w-full'>User Verification</p></div>
                    <div className=' flex flex-row gap-4'>
                        <InputOTP maxLength={6} onChange={(e) => setotp(e)}>
                            <InputOTPGroup>
                                <InputOTPSlot className=' border border-black' index={0} />
                                <InputOTPSlot className=' border border-black' index={1} />
                                <InputOTPSlot className=' border border-black' index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot className=' border border-black' index={3} />
                                <InputOTPSlot className=' border border-black' index={4} />
                                <InputOTPSlot className=' border border-black' index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className=' flex flex-row gap-3 '>
                            <button className=' border-2 border-blue-950 bg-blue-950 text-white rounded-md px-2 hover:bg-white hover:text-blue-950' onClick={() => resendOtp()}>Resend</button>
                            {isVerifyingOtp && <Loader2 className=' animate-spin mt-2' />}
                        </div>
                    </div>
                    <div className=' flex flex-row gap-3 '>
                        <button className=' border-2 border-blue-950 bg-blue-950 text-white rounded-md p-2 hover:bg-white hover:text-blue-950' onClick={() => verifyOtp()}>Verify OTP</button>
                        {isResedActive && <Loader2 className=' animate-spin mt-2' />}
                    </div>
                </div>
            </div>

        </div>
    )
}