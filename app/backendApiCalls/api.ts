import { Address, PaymentDetail } from "../admin/Interfaces/Interfaces";
import backend from "./ApiClient";
interface Param {
    top: String,
    second: String,
    third: String,
    id: String
}


export const getProductsByThirdLevelCategory = (param: Param, obj: unknown, pageno: unknown,) => backend.put(`/api/products/${param.top}/${param.second}/${param.third}/${pageno}`, obj)
export const getProductsBySecondLevelCategory = (param: Param, obj: unknown, pageno: unknown,) => backend.put(`/api/products/${param.top}/${param.second}/${pageno}`, obj)
export const getProductsByTopLevelCategory = (param: Param, obj: unknown, pageno: unknown,) => backend.put(`/api/products/${param.top}/${pageno}`, obj)
export const getProductsById = (param: Param) => backend.get(`/api/products/id/${param.id}`)
export const getProductsRatingStasticsById = (param: Param) => backend.get(`/api/products/ratings/stats/${param.id}`)
export const getProductsRatingsById = (id: String) => backend.get(`/api/products/ratings/${id}`)
export const loginApi = () => backend.post(`/login`)
export const confirmLoginStatus=()=>backend.post(`/login-status`)
export const getUsername = () => backend.get(`users/username`)
export const signUpApi = (prop:unknown) => backend.post(`/createNewUser`,prop)
export const getAllCategoryApi=()=>backend.get(`/api/products/category`)
export const getUserCart=()=>backend.get(`/user/cart`)
export const addToUserCart=(item:unknown)=>backend.post(`/user/cart`,item)
export const deleteCartItem=(id:number)=>backend.delete(`/user/cart/${id}`)
export const updateCartItem=(cartItemId:number,quantity:number)=>backend.put(`/user/cart/${cartItemId}/${quantity}`)
export const postAdress=(address:Address)=>backend.post(`/users/address`,address)
export const getAddress=()=>backend.get(`/users/address`)
export const deleteAddress=(id:string)=>backend.delete(`/users/address/${id}`)
export const setActiveAddress=(id:string)=>backend.put(`/users/activeAddress/${id}`)
export const getActiveAddress=()=>backend.get(`/users/activeAddress`)
export const createOrder=(paymentStatus:boolean,address:Address)=>backend.post(`user/order/${paymentStatus}`,address)
export const getUserOrders=()=>backend.get(`user/order`)
export const getUserOrderById=(orderId:Number)=>backend.get(`user/order/${orderId}`)
export const initiateOnlinePayment=(orderId:number)=>backend.get(`/payment/${orderId}`)
export const updateRazorpayPaymentInformation=(orderId:number,paymentInfo:PaymentDetail)=>backend.post(`/payment/${orderId}/razorpay-info`,paymentInfo)