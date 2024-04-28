import { Auths, useAuth } from "@/app/auth/auth"
import { createTheme } from "@mui/material"
import { useRouter } from "next/navigation"

export interface Size {
    id: Number,
    name: String,
    quantity: Number
}
export interface Image {
    id: Number,
    imageUrl: String
}
export interface Rating {
    id: Number,
    rating: Number,
    review: String,
    username: String,
    createdAt: String
}
export interface Category {
    id: Number,
    name: String,
    parentCategory: Category,
    level: Number
}
export interface Product {
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
export interface Cart {
    id: number,
    cartItems: CartItem[],
    totalPrice: number,
    totalItem: number,
    totalDiscount: number,
    totalDiscountedPrice: number,
    selectedAddress: number
}
export interface CartItem {
    id: number,
    product: Product,
    size: string,
    quantity: number,
    price: number,
    totalDiscount: number,
    dicountedPrice: number
}
export interface Address {
    id?: number,
    firstName: string,
    lastName: string,
    streetAddress: string,
    city: string,
    state: string,
    pincode: string,
    mobile: string,
}
export interface OrderItem {
    id: number,
    size: string,
    quantity: number,
    price: number,
    dicountedPrice: number,
    userId: number,
    deliveryDate: Date,
    product: Product

}
export interface Order {

    id: 1,
    orderItems: OrderItem[],
    orderTime: Date,
    deliveryDate: string,
    shippingAddress: Address,
    paymentType: string,
    paymentDetails: PaymentDetail,
    totalPrice: number,
    totalDiscountedPrice: number,
    discount: number,
    orderStatus: string,
    totalItem: number,
    createdAt: string
}
export interface PaymentDetail {
    paymentMethod?: string,
    status?: string,
    razorpayId: string,
    razorpayPaymentSignature: string
    razorpayPaymentId: string
}

export function validate() {
    const auth: Auths = useAuth()
    const router = useRouter()

    if (!auth.Auth) {
        console.log(auth.Auth);

        auth.setitemInCart(0)
        router.push(`/user/authorization/signin`)
    }

}
export const defaultTheme = createTheme({
    typography: {
        fontFamily: [
            `Montserrat`, `sans-serif`
        ].join(',')
    }
});