import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
const images=[
    "http://localhost:8085/imageStore/view/339d4eb2-2156-40c1-b3c1-6754748871dd",
    "http://localhost:8085/imageStore/view/d4b79001-fc57-4d7e-98a2-38ad5900e403",
    "http://localhost:8085/imageStore/view/d22f05e0-3cc5-4753-8abe-49c709b988dd",
    "http://localhost:8085/imageStore/view/6766380d-ffd5-4487-b5c2-e04aba86c92b"
]
type Props = {}

export default function HomeMainCarosal({ }: Props) {
    return (
        <div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}>
                <CarouselContent>
                    <CarouselItem className=''>
                        <div className=' h-[400px] w-full bg-red-300'>
                            <img src={images[0]} alt="Image 1" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className=''>
                        <div className=' h-[400px] w-full bg-green-300'>
                        <img src={images[1]} alt="Image 1" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className=''>
                        <div className=' h-[400px] w-full bg-blue-300'>
                        <img src={images[2]} alt="Image 2" />
                        </div>
                    </CarouselItem>
                    <CarouselItem className=''>
                        <div className=' h-[400px] w-full bg-indigo-300'>
                        <img src={images[3]} alt="Image 3" />
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}