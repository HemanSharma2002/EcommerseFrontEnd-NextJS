"use client"
import { Order, PaymentDetail, Ratting } from '@/app/admin/Interfaces/Interfaces'
import { Auths, useAuth } from '@/app/auth/auth'
import { addReviewToTheProduct, getUserOrderById, initiateOnlinePayment, updateRazorpayPaymentInformation } from '@/app/backendApiCalls/api'
import AddressCard from '@/app/cart/checkout/component/AddressCard'
import CartCard from '@/app/cart/components/CartCard'
import { ArrowForward } from '@mui/icons-material'
import { Button, CircularProgress, dividerClasses, Rating, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled } from '@mui/material'
import { Box, Check } from 'lucide-react'
import { tree } from 'next/dist/build/templates/app-page'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useRazorpay, { RazorpayOptions } from 'react-razorpay'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#002D62',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#002D62',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#002D62',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#002D62',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

type Props = { step: number, checkout: boolean }

export default function OrderPage({ step, checkout }: Props) {
  const { orderId } = useParams()
  const [order, setorder] = useState<Order>()
  const [viewDetails, setviewDetails] = useState(false)
  const [steper, setsteper] = useState(1)
  const [Razorpay] = useRazorpay()
  const auth: Auths = useAuth()
  const [ratting, setratting] = useState(0)
  const [review, setreview] = useState("")
  const router = useRouter()
  if (!auth.Auth) {
    auth.setitemInCart(0)
    router.push(`/user/authorization/signin`)
  }

  useEffect(() => loadPage(), [step])
  function loadPage() {
    if (step > 2) {
      getUserOrderById(Number(step)).then(resp => {
        console.log(resp.data)
        setorder(resp.data)
      }).catch(resp => console.log(resp)
      )
      return
    }
    getUserOrderById(Number(orderId)).then(resp => {
      console.log(resp.data)
      setorder(resp.data)
      const order: Order = resp.data
      if (order) {
        if (order.orderStatus === "PLACED") {
          setsteper(2)
        }
        if (order.orderStatus === "CONFIRMED") {
          setsteper(2)
        }
        if (order.orderStatus === "SHIPPED") {
          setsteper(4)
        }
        if (order.orderStatus === "DELIVERED") {
          setsteper(5)
        }

      }
    }).catch(resp => console.log(resp)
    )
    console.log(orderId)
  }
  return (
    <div className=' w-full min-h-screen '>
      {order ? <div className=' text-blue-950 p-4 duration-300 flex flex-col gap-2 w-full'>
        <div className=' flex flex-row justify-center w-full'>
          {(!checkout&&order.orderStatus!=="CANCELLED" &&order.orderStatus!=="RETURNED") && <div className='  py-8  w-5/6'>
            <Stepper activeStep={steper} alternativeLabel connector={<QontoConnector />}>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>Pending</StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>Placed</StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>Confirmed</StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>Shipped</StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>Delivered</StepLabel>
              </Step>
            </Stepper>
          </div>}
        </div>
        {checkout && <div className='text-xl flex flex-row justify-center opacity-70'>
          <div className=' flex flex-row gap-2 bg-blue-950 text-white py-10 pl-8 rounded-sm'>
            <p>Your order has been placed</p>
            <p><Box /></p>
            <Link href={`/user/order`}><ArrowForward className=' mb-2 mx-10' /></Link>
          </div>
        </div>}
        <div>
          {!checkout && <div className=' flex flex-col items-end w-full'>
            <div>
              {order.orderStatus === "PENDING" && <Button className=' px-3 py-1 ' sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#002D62" } }} onClick={async (e) => {
                e.preventDefault()
                const online = await initiateOnlinePayment(order.id).then(resp => resp.data).catch(resp => console.log(resp.data))
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
                  handler: function (response) {
                    const rsep: PaymentDetail = {
                      razorpayId: response.razorpay_order_id,
                      razorpayPaymentId: response.razorpay_payment_id,
                      razorpayPaymentSignature: response.razorpay_signature
                    }
                    updateRazorpayPaymentInformation(order.id, rsep).then(response => alert("Response has been saved")).catch(response => console.log(response))
                    setTimeout(() => loadPage(), 500)
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
              }}>Complete your Payment</Button>}
            </div>
          </div>}
        </div>
        <p className='text-2xl'>Order details</p>
        <div className='flex flex-col p-3 rounded-md border border-blue-950'>
          <div className=' flex flex-row justify-between'>
            <div>
              <p>Order date</p>
              <p>Order Id</p>
              <p>Order Total</p>
            </div>
            <div>
              <p>{order.createdAt.substring(0, 10)}</p>
              <p># {order.id}</p>
              <p>Rs. {order.totalDiscountedPrice} {`( ${order.totalItem} item )`}</p>
            </div>
          </div>
        </div>
        <p className=' text-2xl'>Shipment details</p>
        <div className='flex flex-col p-3 gap-2 rounded-md border border-blue-950'>
          <p className=' border-b border-blue-950 text-lg'>Delivery</p>
          <p className='text-lg'>Status : {order.orderStatus}</p>
          <p>Quantity : {` ${order.totalItem} item `}</p>
          {order.deliveryDate &&
            <div>
              <p>Delivery date</p>
              <p>{order.deliveryDate.substring(0, 10)}</p>
            </div>
          }
          <div className=' flex flex-col gap-3'>
            {
              order.orderItems.map(item => (
                <div key={item.id} >
                  <CartCard cartItem={item} updatable={false} loadpage={loadPage} />
                  {(order.orderStatus === "DELIVERED" && !item.reviewed) && <div>
                    <div className=' flex flex-col p-4 gap-2 '>
                      <Rating
                        sx={{ color: "#002D62" }}
                        size='large'
                        name="simple-controlled"
                        value={ratting}
                        onChange={(event, newValue) => {
                          console.log(newValue);
                          
                          setratting(newValue as number);
                        }}
                      />
                      <input className=' py-2 p-2 rounded-md border-2 border-slate-300' type="text" placeholder='Review' value={review} onChange={e => setreview(e.target.value)} />
                      <div>
                        <Button sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#002D62" } }} onClick={async (e)=>{
                          e.preventDefault()
                          const rating:Ratting={
                            rating:ratting,
                            review
                          }
                          await addReviewToTheProduct(item.product.id as number,item.id,rating).then(resp=>console.log(resp)).catch(resp=>console.log(resp))
                          loadPage()
                        }}>
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>}
                </div>
              ))
            }
          </div>
        </div>
        <p className=' text-2xl'>Payment Information</p>
        <div className='flex flex-col  rounded-md border border-blue-950'>
          <div className='p-3  border-b border-blue-950'>
            <p className=' text-lg'>Payment Methods</p>
            {
              order.paymentType === "POD" ?
                <p>POD (Pay on delivery)</p>
                :
                <div className=' flex flex-col gap-2'>
                  <p>Online</p>
                  {order.paymentDetails.razorpayId &&
                    <div className=' flex flex-col gap-2'>
                      <p><Button sx={{ bgcolor: "#002D62", color: 'white', ":hover": { bgcolor: "#002D62" } }} onClick={e => setviewDetails(!viewDetails)}>View details</Button></p>
                      {
                        <div className={`  overflow-hidden flex flex-col gap-1 ${viewDetails ? " h-full" : "h-0"} duration-300 `}>
                          <div className=' flex flex-row justify-between'>
                            <p>Payment Method</p>
                            <p>{order.paymentDetails.paymentMethod} </p>
                          </div>
                          <div className=' flex flex-row justify-between'>
                            <p>Status</p>
                            <p>{order.paymentDetails.status}</p>
                          </div>
                          <div className=' flex flex-row justify-between'>
                            <p>Razorpay  Id</p>
                            <p>{order.paymentDetails.razorpayId}</p>
                          </div>
                          <div className=' flex flex-row justify-between'>
                            <p>Razorpay Payment Id</p>
                            <p>{order.paymentDetails.razorpayPaymentId}</p>
                          </div>
                          <div className=' flex flex-row justify-between'>
                            <p>Razorpay Payment Signature</p>
                            <p>{order.paymentDetails.razorpayPaymentSignature}</p>
                          </div>

                        </div>
                      }
                    </div>
                  }
                </div>
            }
          </div>
          <div className='p-3   '>
            <p>Billing Address</p>
            <div>
              <div className='flex flex-row '>
                <p>{order.shippingAddress.streetAddress},</p>
                <p>{order.shippingAddress.city},</p>
                <p>{order.shippingAddress.state.toUpperCase()}</p>
              </div>
              <p>INDIA</p>
            </div>
          </div>
        </div>
        <p className='text-2xl'>Shipping Adrress</p>
        <div className='flex flex-col p-3 gap-2 rounded-md border border-blue-950'>
          <div>
            <div className='flex flex-row '>
              <p>{order.shippingAddress.streetAddress},</p>
              <p>{order.shippingAddress.city},</p>
              <p>{order.shippingAddress.state.toUpperCase()}</p>
            </div>
            <p>INDIA</p>
          </div>
        </div>
        <p className='text-2xl'>Order Summary</p>
        <div className='flex flex-row justify-between p-3 gap-2 rounded-md border border-blue-950'>
          <div>
            <p>Items:</p>
            <p>Total before Tax:</p>
            <p>Total:</p>
            <p className='text-xl'>Order Total:</p>
          </div>
          <div>
            <p>{order.totalItem} item</p>
            <p>Rs. {order.totalDiscountedPrice}</p>
            <p>Rs. {order.totalDiscountedPrice}</p>
            <p>Rs. {order.totalDiscountedPrice}</p>
          </div>

        </div>

      </div>
        :
        <CircularProgress className=' absolute left-1/2 top-1/2' color="inherit" />}
    </div>
  )
}