import { Product } from '@/app/admin/Interfaces/Interfaces'
import ProductCard from '@/app/products/component/ProductCard'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


type Props = {
    products?: Product[],
    category?: string
}

export default function ProductCarosal({ products, category }: Props) {
    return (
        <main>
            {products?.length!=0
            &&<p className=' text-xl text-blue-950 px-3 py-2 '>{category}</p>}
            <Carousel >
                <CarouselContent className=''>
                    {products?.map((product) => (
                        <CarouselItem className=' basis-auto' key={product.id as number}>
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent  >
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </main>
    )
}