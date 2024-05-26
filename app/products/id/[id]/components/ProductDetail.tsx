"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductDetailSection from './ProductSection/ProductDetailSection'
import RatingSection from './ProductSection/rating'
import { getProductsById, getProductsBySecondLevelCategory, getProductsByThirdLevelCategory, getProductsRatingStasticsById } from '@/app/backendApiCalls/api'
import { CircularProgress } from '@mui/material'
import ProductCarosal from '@/components/ProductCarosal'
import ProductCard from '@/app/products/component/ProductCard'
import { RateReview } from '@mui/icons-material'
import { BoxSelectIcon, Star, StarHalf } from 'lucide-react'
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

const Men_T_Shirt = {
    top: "Men",
    second: "Casual"
}
const obj = {
    sort: "price_low",
    colors: [],
    pattern: []
}
interface Categorys {
    top: string,
    second: string,
    third: string
}

type Props = {}

export default function ProductDetail({ }: Props) {

    const param = useParams()
    const [product, setproduct] = useState<Product>()
    const [stastics, setstastics] = useState<[String[]]>([[]])
    const [third, setthird] = useState<Product[]>([])
    const [category, setcategory] = useState<Categorys>()
    useEffect(() => loadPage(), [param.id])
    function loadPage() {
        getProductsById(Number(param.id)).then(resp => {
            setproduct(resp.data)
            const product: Product = resp.data
            const category: Categorys = {
                top: product.category.parentCategory.parentCategory.name as string,
                second: product.category.parentCategory.name as string,
                third: product.category.name as string
            }
            setcategory(category)
            getProductsByThirdLevelCategory(category, obj, 0).then(resp => setthird(resp.data.content)).catch(err => console.log(err))
        }).catch(err => console.log(err))
        getProductsRatingStasticsById(Number(param.id)).then(resp => setstastics(resp.data)).catch(err => console.log(err))
    }

    return (
        <div className=' min-h-screen w-screen relative'>
            {product ? <div className='w-full pt-3 flex flex-col gap-3 py-3'>
                <ProductDetailSection product={product} />
                {product.totalRating != 0 ? <RatingSection avgRating={product.avgRating} totalRating={product.totalRating} stastics={stastics} /> :
                    <div className='text-xl text-white py-2 text-center bg-blue-950 flex flex-row gap-3 justify-center'>
                        <BoxSelectIcon />
                        <p>No Rating Avilable</p>
                        <BoxSelectIcon />
                    </div>
                }
                <div>
                    <p className=' text-2xl text-blue-950 px-5 py-3'>More products</p>
                    {third && <div className=' flex flex-wrap px-5 gap-2 justify-center md:justify-self-start '>
                        {third.map(product => (
                            <div key={product.id as number}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>}
                </div>

            </div>
                :
                <CircularProgress className=' absolute left-1/2 top-1/2' color="inherit" />}
        </div>
    )
}


