"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function About({ }: Props) {
    const router=useRouter()
    return (<>
        <main >
            <div onClick={()=>router.push(`/`)}>
                <img src="http://localhost:8085/imageStore/view/d22f05e0-3cc5-4753-8abe-49c709b988dd" alt="Server Image" />
            </div>
            <div onClick={()=>router.push(`/`)}>
                <img src="http://localhost:8085/imageStore/view/339d4eb2-2156-40c1-b3c1-6754748871dd" alt="Server Image" />
            </div>
        </main>
    </>
    )
}