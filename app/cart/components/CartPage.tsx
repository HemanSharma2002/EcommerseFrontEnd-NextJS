"use client"
import { Cart, defaultTheme, Order, PaymentDetail } from '@/app/admin/Interfaces/Interfaces'
import { createOrder, getActiveAddress, getUserCart, initiateOnlinePayment, updateRazorpayPaymentInformation } from '@/app/backendApiCalls/api'
import { Alert, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material'
import axios from 'axios'
import { ReactElement, use, useEffect, useState } from 'react'
import CartCard from './CartCard'
import { Auths, useAuth } from '@/app/auth/auth'
import { Info, ShoppingCart } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { red } from '@mui/material/colors'
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { tree } from 'next/dist/build/templates/app-page'
import { Loader, Loader2 } from 'lucide-react'

type Props = { updatable: boolean, component?: ReactElement, setStep: Function }

export default function CartPage({ updatable, component, setStep }: Props) {

  const [Razorpay] = useRazorpay()
  const [cart, setcart] = useState<Cart>()
  const [messge, setmessge] = useState(false)
  const [payment, setpayment] = useState<boolean>(true)
  const [paymentText, setpaymentText] = useState<String>("Online")
  const [isPurchaseActive, setisPurchaseActive] = useState(false)
  function timeout() {
    setTimeout(() => setmessge(false), 3000)
  }
  const auth: Auths = useAuth()
  const router = useRouter()
  if (!auth.Auth) {
    auth.setitemInCart(0)
    router.push(`/user/authorization/signin`)
  }

  useEffect(() => loadPage(), [])
  function loadPage() {
    getUserCart().then(resp => {
      const cart: Cart = resp.data
      setcart(cart)
      auth.setitemInCart(cart.totalItem)
    }).catch(resp => console.log(resp))
  }
  const updatecard = updatable
  return (
    <div className=' min-h-screen w-full'>
      {/* Amounts */}
      {
        cart ?
          <div className='flex flex-row-reverse p-2'>
            <div className=' md:h-[720px] w-1/4  p-5  flex flex-col gap-3 items-center'>
              <div className=' w-full py-2'>{component}</div>
              <div className='text-xl flex flex-col md:flex-row md:justify-between md:px-5 w-full'>
                <p>Price</p>
                <p>{cart.totalPrice ? `₹ ${String(cart.totalPrice)}` : "₹ 0.0"}</p>
              </div>
              <div className='text-xl flex flex-col md:flex-row md:justify-between md:px-5 w-full'>
                <p>Toatal Quantity</p>
                <p>{cart.totalItem ? ` ${String(cart.totalItem)}` : "0"}</p>
              </div>
              <div className='text-xl flex flex-col md:flex-row md:justify-between md:px-5 w-full'>
                <p>Delivery</p>
                <p>Free</p>
              </div>
              <div className='text-xl flex flex-col md:flex-row md:justify-between md:px-5 w-full'>
                <p>Discount</p>
                <p>{cart.totalDiscount ? ` ${String(cart.totalDiscount)} %` : ""}</p>
              </div>
              <div className='w-full h-1 bg-blue-950 rounded-3xl'></div>
              <div className='text-xl flex flex-col md:flex-row md:justify-between md:px-5 w-full'>
                <p>Total Price</p>
                <p>{cart.totalDiscountedPrice ? `₹ ${String(cart.totalDiscountedPrice)}` : "₹ 0.0"}</p>
              </div>

              <div className=' py-5 w-full'>
                {
                  updatable ?
                    <div onClick={() => {
                      if (cart.cartItems.length == 0) {
                        setmessge(true)
                        timeout()
                        return
                      }
                      router.push(`/cart/checkout`)
                    }
                    }>
                      <Button sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#00308F" } }}>Proced to Checkout</Button>
                    </div>
                    :
                    <div className=' flex flex-col gap-10 pt-5 w-full items-center'>
                      <ThemeProvider theme={defaultTheme}>
                        <FormControl fullWidth >
                          <InputLabel  > Payment </InputLabel>
                          <Select name='Payment' onChange={e => {
                            if (e.target.value === "Online") {
                              setpaymentText(e.target.value)
                              setpayment(true)
                            }
                            else {
                              setpaymentText(e.target.value)
                              setpayment(false)
                            }
                          }} value={paymentText} label="Payment ">
                            <MenuItem value={"POD (Pay on Delivery)"} >POD (Pay on Delivery)</MenuItem>
                            <MenuItem value={"Online"} >Online</MenuItem>
                          </Select>
                        </FormControl>
                      </ThemeProvider>
                      <Button sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#00308F" } }} disabled={isPurchaseActive} onClick={async (e) => {
                        e.preventDefault()
                        setisPurchaseActive(true)
                        const address = await getActiveAddress().then(resp => resp.data)
                        const order: Order = await createOrder(payment, address).then(resp => resp.data).catch(resp => console.log(resp.data))
                        console.log(order);
                        
                        if (payment) {
                          const online = await initiateOnlinePayment(order.id).then(resp => resp.data).catch(resp => console.log(resp.data))
                          console.log(online);
                          
                          const options: RazorpayOptions = {
                            key: "rzp_test_DdauDBStpb06aT",
                            amount: String(order.totalDiscountedPrice * 100),
                            currency: "INR",
                            name: "Spring Store",
                            description: "Test Transaction",
                            image: "https://i.postimg.cc/MTF0TKYq/Spring-Store-Logo.png",
                            // callback_url: `http://localhost:3000/user/order/completed/${order.id}`,
                            // redirect: false,
                            order_id: online,
                            allow_rotation:false,
                            handler: function (response) {
                              const rsep: PaymentDetail = {
                                razorpayId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayPaymentSignature: response.razorpay_signature
                              }
                              updateRazorpayPaymentInformation(order.id, rsep).then(response => response).catch(response => console.log(response))
                              setStep(order.id)
                              console.log(response)
                              router.push(`/user/order/completed/${order.id}`)
                            },
                            prefill: {
                              name: order.shippingAddress.firstName + " " + order.shippingAddress.lastName,
                              email: auth.user.username,
                              contact: order.shippingAddress.mobile,
                            },
                            notes: {
                              address: order.shippingAddress.streetAddress + "," + order.shippingAddress.city + "," + order.shippingAddress.state + " " + order.shippingAddress.pincode
                            },
                            theme: {
                              color: "#002D62",
                            },
                          };
                          console.log(options)
                          const rzp1 = new Razorpay(options)

                          rzp1.on("payment.failed", function (response: any) {
                            alert(response.error.code);
                            alert(response.error.description);
                            alert(response.error.source);
                            alert(response.error.step);
                            alert(response.error.reason);
                            alert(response.error.metadata.order_id);
                            alert(response.error.metadata.payment_id);
                          });

                          rzp1.open();
                        }

                        else {
                          router.push(`/user/order/completed/${order.id}`)
                        }
                        auth.setitemInCart(0)
                      }}>Confirm Order {isPurchaseActive &&
                        <div>
                          <Loader2 className=' animate-spin text-white' />
                        </div>
                        }</Button>

                    </div>
                }
                <div>

                </div>
                {messge &&
                  <Alert className=' mt-5' icon={<Info fontSize="inherit" />} severity="info">
                    Add items to cart
                  </Alert>
                }
              </div>
            </div>
            {/* Cart items */}
            <div className='w-3/4 md:h-[720px]  overflow-scroll'>
              {cart.cartItems.length != 0 ? <div className='flex flex-col gap-3 '>
                {cart.cartItems.map(cartitem =>
                  <div key={cartitem.id}>
                    <CartCard cartItem={cartitem} loadpage={loadPage} updatable={updatecard} />
                  </div>
                )}
              </div> :
                <div className='w-3/4 md:h-[720px] flex justify-center items-center text-4xl '>
                  <div className=' flex flex-row gap-5'>
                    <p>Add items to Cart</p>
                    <p><ShoppingCart fontSize='large' /></p>
                  </div>
                </div>
              }
            </div>
          </div> :
          <div>
            <CircularProgress className=' absolute left-1/2 top-1/2' color="inherit" />
          </div>
      }
    </div >
  )
}