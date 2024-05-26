import React, { useState } from 'react'
import { AddShoppingCart, Circle, Done, LocalMall, LocationCity, ShoppingBag, Star } from '@mui/icons-material'
import axios from 'axios'
import { addToUserCart } from '@/app/backendApiCalls/api'
import { Auths, useAuth } from '@/app/auth/auth'
import { useRouter } from 'next/navigation'
import { LucideBoxSelect, ShoppingBagIcon } from 'lucide-react'
import Link from 'next/link'
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

type Props = { product: Product, isAdmin?: boolean }

export default function ProductDetailSection({ product, isAdmin }: Props) {
    const router = useRouter()

    const [selectedSize, setselectedSize] = useState("")
    const [pincode, setpincode] = useState("")
    const [message, setMessage] = useState(``)
    const [quantity, setquantity] = useState<number>(1)
    const [addedTocart, setaddedTocart] = useState(false)
    const auth: Auths = useAuth()
    function timeout() {
        setTimeout(() => setaddedTocart(false), 3000)
    }
    const [selectedImage, setSelectedImage] = useState(product?.images[0].imageUrl)
    return (
        <div className=' w-full'>
            <div className='px-8 py-2 flex flex-row  gap-5 opacity-50  text-sm'>
                <p>Home</p>
                <p>/</p>
                <p>{product.category.parentCategory.parentCategory.name}</p>
                <p>/</p>
                <p>{product.category.parentCategory.name}</p>
                <p>/</p>
                <p>{product.category.name}</p>
                <p>/</p>
                <p>{product.title}</p>
            </div>
            <div>
                <p>

                </p>
            </div>
            {/* Products Detail Section */}
            <div className=' min-h-screen w-full flex flex-row'>
                {/* Images */}
                <div className=' h-full  w-3/5  '>
                    <div className='w-full flex flex-row p-5  overflow-visible'>
                        <div className='  w-2/5 h-[600px] overflow-scroll hori grid grid-cols justify-center gap-3 py-2'>
                            {
                                product.images.map(image => (
                                    <div className={` w-40 h-52 bg-white object object-scale-down ${selectedImage === image.imageUrl ? " border-2 border-blue-950" : " "}`}
                                        onClick={() => setSelectedImage(image.imageUrl)}
                                        key={Number(image.id)}>
                                        <img className={` h-full w-full `} src={String(image.imageUrl)} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className='  w-3/5 h-[600px] object object-scale-down'>
                            <img className='w-full h-full' src={selectedImage ? String(selectedImage) : String(product.images[0].imageUrl)} alt="" />
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className=' h-full w-2/5 text-blue-950'>
                    <div className=' flex  flex-col gap-2 items-center text-center'>
                        <p>{product.brand.toUpperCase()}</p>
                        <div className='text-xl'>
                            <p>{product.title}</p>

                        </div>
                        <div className='flex flex-row gap-5'>
                            <p className='bg-green-700 text-white rounded-md p-1 px-3'>{product.avgRating != 0 && String(product.avgRating)} <Star className='pb-2' /></p>
                            <p className='p-1 px-2'>{String(product.totalRating)} Ratings</p>
                        </div>
                        <p className=' text-xl'>₹ {String(product.discountedPrice)}</p>
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-row gap-2'>MRP: <p className=' line-through'>₹ {String(product.price)}</p></div>
                            <p>{`(${product.discountPresent}%OFF)`}</p>
                        </div>
                        <p className='text-sm'>Price inclusive of all taxes</p>
                        <p>{product.color.toUpperCase()}</p>
                        <div className=' flex flex-wrap gap-4'>
                            {
                                product.sizes.map(size => (
                                    <div key={String(size.name)}>
                                        {<p className={` border-2 cursor-pointer border-blue-950 p-3 font-semibold text-blue-950  rounded-full ${size.name === selectedSize ? " bg-blue-950 text-white" : " hover:bg-blue-950 hover:text-white"}`}
                                            onClick={e => {
                                                e.preventDefault()
                                                setselectedSize(String(size.name))
                                                setMessage("")
                                            }}
                                        >{size.name}</p>}
                                    </div>
                                ))
                            }
                        </div>
                        <div className=' bg-white w-full min-h-20 text-sm flex flex-col items-center justify-center gap-2'>
                            {selectedSize === "" ? <div className='flex flex-row items-center justify-center gap-2'>
                                <div>
                                    <LocationCity />
                                </div>
                                <div>
                                    Select your size to know your estimated delivery date.
                                </div>
                            </div>
                                :
                                <div className='flex flex-row items-center justify-center gap-3'>
                                    <div>
                                        <LocationCity />
                                    </div>
                                    <div>
                                        <input className=' py-2 border-2 border-blue-950 px-2' type="text" value={pincode} onChange={e => setpincode(e.target.value)} />
                                    </div>
                                    <button className='px-2 text-white bg-blue-950 py-2'
                                        onClick={async (e) => {
                                            e.preventDefault()
                                            try {

                                                const code = await fetch(`https://api.postalpincode.in/pincode/${pincode}`).then(resp => resp.json())
                                                // console.log(code)
                                                if (code[0].PostOffice == null) {
                                                    setMessage(`Enter a valid pincode`)
                                                    return
                                                }

                                                setMessage(`Delivery avilable with in 3-5 working days at ${code[0].PostOffice[0].Division} ( Pincode: ${pincode} ) `)
                                            }
                                            catch (error) {
                                                console.log(error)
                                            }
                                        }}>Check</button>
                                </div>

                            }
                            {
                                message !== "" && <div className='flex flex-row items-center justify-center gap-2'>

                                    <div>
                                        {message}
                                    </div>
                                </div>
                            }
                        </div>
                        {!isAdmin ? <div className='flex flex-col items-center w-3/5 text-center'>
                            {!addedTocart ? <button className='flex flex-row gap-2 py-2 px-8 border-2 w-full justify-center bg-blue-950 text-white font-bold' onClick={async () => {
                                if (!auth.Auth) {
                                    router.push(`/user/authorization/signin`)
                                    return
                                }
                                if (selectedSize === "") {
                                    setMessage("Select size !!")
                                    return
                                }
                                const object = {
                                    productId: product.id,
                                    size: selectedSize,
                                    quantity: quantity
                                }
                                addToUserCart(object).then(resp => console.log(resp)).catch(resp => console.log(resp))
                                auth.setitemInCart((prev: number) => prev + 1)
                                setaddedTocart(!addedTocart)
                                timeout()
                            }}>
                                <LocalMall />
                                <p>ADD TO BAG</p>
                            </button> :
                                <button className='flex flex-row gap-2 py-2 px-8 border-2 w-full justify-center bg-blue-950 text-white font-bold' onClick={async () => {
                                    setaddedTocart(!addedTocart)


                                }}>
                                    <Done />
                                    <p>Product Added</p>
                                </button>}
                            <p className='text-sm'>HANDPICKED STYLES | ASSURED QUALITY </p>
                        </div>
                            :
                            <div>

                            </div>
                        }
                        <div>
                            <div className='text-start mx-5 font-semibold py-2'>Product Details</div>
                            <ul className='text-start mx-10 flex flex-col gap-2 text-sm'>
                                {
                                    product.description.split("/").map(element => (
                                        <li key={element} className=' flex flex-row'><Circle className='p-2' />
                                            {element}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isAdmin &&
                <div className=' px-10 rounded-lg '>
                    <Link href={`/admin/addproduct`} >
                        <button className='flex flex-row gap-2 py-2 px-8 border-2 w-full rounded-lg justify-center bg-blue-950 text-white font-bold'>
                            <LucideBoxSelect />
                            <p>Add more products</p>
                        </button>
                    </Link>
                </div>
            }
        </div>
    )
}