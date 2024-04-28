"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductDetailSection from './ProductSection/ProductDetailSection'
import RatingSection from './ProductSection/rating'
import { getProductsById, getProductsRatingStasticsById } from '@/app/backendApiCalls/api'
import { CircularProgress } from '@mui/material'
interface Size {
    id: Number,
    name: String,
    quantity: Number
}
interface Image {
    id: Number,
    imageUrl: String
}
interface Rating {
    id: Number,
    rating: Number,
    review: String,
    username: String,
    createdAt: String
}
interface Category {
    id: Number,
    name: String,
    parentCategory: Category,
    level: Number
}
interface Product {
    id: Number,
    title: String,
    brand: String,
    price: Number,
    discountedPrice: Number,
    discountPresent: Number,
    description: String,
    pattern: String,
    color: String,
    quantity: Number,
    sizes: Size[],
    images: Image[],
    ratings: Rating[],
    totalRating: Number,
    avgRating: Number,
    createdAt: String,
    category: Category
}

type Props = {}

export default function ProductDetail({ }: Props) {

    const param = useParams()
    const [product, setproduct] = useState<Product>()
    const [stastics, setstastics] = useState<unknown>()
    useEffect(() => loadPage(), [param.id])
    function loadPage() {
        getProductsById(param).then(resp => setproduct(resp.data)).catch(err => console.log(err))
        getProductsRatingStasticsById(param).then(resp => setstastics(resp.data)).catch(err => console.log(err))
    }
    
    return (
        <div className=' min-h-screen w-screen relative'>
            {product ? <div className='w-full pt-3'>
                <ProductDetailSection product={product}/>
                <RatingSection avgRating={product.avgRating} totalRating={product.totalRating} stastics={stastics}/>
            </div>
            :
            <CircularProgress className=' absolute left-1/2 top-1/2'   color="inherit"/>}
        </div>
    )
}


