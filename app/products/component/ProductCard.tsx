import { Product } from '@/app/admin/Interfaces/Interfaces'
import Link from 'next/link'
import React from 'react'

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <div className=' border-2 border-blue-950' key={Number(product.id)}>
            <Link href={`/products/id/${product.id}`}>
                <div className='w-72  h-[450px] bg-white  text-blue-950 group'>
                    <div className=' w-full h-[300px]   group-hover:h-[280px] duration-300  '>
                        <img className='h-full w-full object-cover  object-top ' src={String(product.images[0].imageUrl)} alt="" />
                    </div>
                    <div className=' p-2'>
                        <p className=' text-xl'>{product.brand}</p>
                        <p>{product.title}</p>
                        <div>
                            <p className='text-xl'>₹ {String(product.discountedPrice)}</p>
                            <div className=' flex flex-row gap-12'>
                                <p className=' line-through'>₹ {String(product.price)}</p>
                                <p>{String(product.discountPresent)} %</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}