import { defaultTheme, Order, PaymentDetail } from '@/app/admin/Interfaces/Interfaces'
import { Auths, useAuth } from '@/app/auth/auth'
import { adminApiupdateOrderStatus, initiateOnlinePayment, updateRazorpayPaymentInformation } from '@/app/backendApiCalls/api'
import { Button, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import useRazorpay, { RazorpayOptions } from 'react-razorpay'

type Props = { order: Order, loadPage: Function, admin: boolean }

export default function OrderCard({ order, loadPage, admin }: Props) {
    const [Razorpay] = useRazorpay()
    const auth: Auths = useAuth()
    function load() {
        setTimeout(() => loadPage(), 1000)
    }
    return (
        <div  >
            <div className=' border-2 border-blue-950 shadow-md w-full h-full text-blue-950 rounded-md'>
                <div className=' flex flex-row gap-3'>
                    <div>
                        <div className=' flex flex-row'>

                            <div className=' flex flex-col gap-2 p-8  w-52'>
                                <p>Order Id </p>
                                <p># {order.id}</p>
                                {!admin && <Link href={`/user/order/${order.id}`} className='pt-8'>
                                    <Button sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#002D62" } }}>View details</Button>
                                </Link>}
                            </div>
                            <div className=' flex flex-col p-8 gap-4'>
                                <p>Orderd on {order.createdAt.substring(0, 10)}</p>
                                {order.deliveryDate && <p> Deliverd on {order.deliveryDate.substring(0, 10)}</p>}
                                {!admin && <div>
                                    {
                                        order.orderStatus === "PENDING"
                                            ?
                                            <div className=' flex flex-col gap-2'>
                                                <p>Status : {order.orderStatus}</p>
                                                <Button className=' px-3 py-1 ' sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#002D62" } }} onClick={async (e) => {
                                                    e.preventDefault()
                                                    const online = await initiateOnlinePayment(order.id).then(resp => resp.data).catch(resp => console.log(resp.data))
                                                    const options: RazorpayOptions = {
                                                        key: "rzp_test_pzyOMVPvo6O5Od",
                                                        amount: String(order.totalDiscountedPrice * 100),
                                                        currency: "INR",
                                                        name: "Cloth store",
                                                        description: "Test Transaction",
                                                        image: "https://i.pinimg.com/550x/6a/c0/0a/6ac00ab8f4018bb2734d000072567b0f.jpg",
                                                        // callback_url: `http://localhost:3000/user/order/completed/${order.id}`,
                                                        // redirect: false,
                                                        order_id: online,
                                                        handler: function (response) {
                                                            const rsep: PaymentDetail = {
                                                                razorpayId: response.razorpay_order_id,
                                                                razorpayPaymentId: response.razorpay_payment_id,
                                                                razorpayPaymentSignature: response.razorpay_signature
                                                            }
                                                            updateRazorpayPaymentInformation(order.id, rsep).then(response => alert("Response has been saved")).catch(response => console.log(response))
                                                            load()
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

                                                    rzp1.on("payment.failed", function (response:any) {
                                                        alert(response.error.code);
                                                        alert(response.error.description);
                                                        alert(response.error.source);
                                                        alert(response.error.step);
                                                        alert(response.error.reason);
                                                        alert(response.error.metadata.order_id);
                                                        alert(response.error.metadata.payment_id);
                                                    });

                                                    rzp1.open();
                                                }}>Pay Now</Button>
                                            </div>
                                            :
                                            <p>Status : {order.orderStatus}</p>
                                    }
                                </div>}
                            </div>
                        </div>
                        {admin&&<div className=' px-8'>
                                <ThemeProvider theme={defaultTheme}>
                                    <FormControl fullWidth>
                                        <InputLabel >Status</InputLabel>
                                        <Select label="Satus" value={order.orderStatus} onChange={e => {
                                            adminApiupdateOrderStatus(order.id,e.target.value).then(resp=>resp).catch(r=>console.log(r))
                                            load()
                                        }}>
                                            <MenuItem value="PENDING" >PENDING</MenuItem>
                                            <MenuItem value="PLACED" >PLACED</MenuItem>
                                            <MenuItem value="SHIPPED" >SHIPPED</MenuItem>
                                            <MenuItem value="DELIVERED" >DELIVERED</MenuItem>
                                            <MenuItem value="CANCELED" >CANCELED</MenuItem>
                                            <MenuItem value="RETURNED" >RETURNED</MenuItem>
                                        </Select>
                                    </FormControl>
                                </ThemeProvider>
                            </div>}
                    </div>
                    <div className=' p-2 flex flex-row gap-3  shadow-md  w-4/5 over '>
                        {order.orderItems.map(item => (
                            <div key={item.id} className=' bg-gray-100  h-full w-[150px] flex flex-col items-center rounded-md'>
                                <div className=' h-24 w-24  object object-contain object-center'>
                                    < img className='h-full w-fill ' src={String(item.product.images[0].imageUrl)} alt="" />
                                </div>
                                <div className='p-1'>
                                    <p>{item.product.brand}</p>
                                    <p className=' text-sm'>{item.product.title}</p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}