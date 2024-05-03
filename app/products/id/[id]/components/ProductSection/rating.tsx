import { ChevronLeft, Label } from '@mui/icons-material'
import React, { useState } from 'react'
import RatingBox from './RatingBox'
import { PieChart } from '@mui/x-charts'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { getProductsRatingsById } from '@/app/backendApiCalls/api'
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
  createdAt?: String
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

type Props = {
  totalRating: Number,
  avgRating: Number,
  stastics: [
    String[]
  ]
}
const rating: Rating = {
  id: 10,
  rating: 3.5,
  review: "Great Product",
  username: "Heman Sharma"
}
interface Data{
  id:number,
  value:number,
  label:string
}

export default function RatingSection({ avgRating, totalRating, stastics }: Props) {
  const{id}=useParams()
  const [ratings, setratings] = useState<Rating[]>([])
  const [ratingMenu, setratingMenu] = useState(false)
  let data:Data[] = []
  if (stastics) {
    stastics.map(element => {
      const obj:Data = {
        id: Number(element[0]),
        value: Number(element[1]),
        label: `${element[0]}  Star`
      }
      data.push(obj)
    })
  }
  return (
    <div className='flex flex-col items-center py-4 w-full'>
      <div className=' w-full text-center text-blue-950  py-3 text-xl font-semibold flex flex-row justify-center items-center gap-4'>
        <div className=' bg-blue-950 h-[2px] w-96 rounded-md'></div>
        <div>Ratings</div>
        <div className=' bg-blue-950 h-[2px] w-96 rounded-md'></div>
      </div>
      {/* Add Rating */}
      <div className='text-blue-950 w-full'>
        <div className=' min-h-40 w-full bg-slate-800 text-white'>
          <div className='w-full h-full text-white flex flex-col items-center p-5 '>
            <div className='flex flex-row gap-3 p-2'>
              <div className='flex flex-row gap-3'>
                <p>Total Ratings :</p>
                <p>{String(totalRating)}</p>
              </div>
              <div className='flex flex-row gap-3'>
                <p>Avg Rating :</p>
                <p>{String(avgRating)}</p>
              </div>
            </div>
            <div className='bg-white rounded-md'>
              <PieChart className=' h-40 w-40 text-white' sx={{ color: "white" }} series={[
                {
                  data: data, highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  paddingAngle: 2,
                  innerRadius: 31,color:"white"
                },
              ]}
                width={400}
                height={200}
                pad
              />
            </div>
            <div className='p-3 hover:underline cursor-pointer flex flex-row gap-2' onClick={async e=>{
              e.preventDefault()
              if(ratings.length!=0){
                setratingMenu(!ratingMenu)
                return
              }
              await getProductsRatingsById(String(id)).then(resp => setratings(resp.data)).catch(err => console.log(err))
              setratingMenu(!ratingMenu)
            }}>
              <p>Reviews</p>
              <p className={`${ratingMenu?" -rotate-90":" rotate-90"} duration-300`}><ChevronLeft/></p>
            </div>
          </div>
        </div>
        {ratings &&
          <div className={`w-full p-5 flex flex-col gap-2 duration-500 ${ratingMenu?" block":" hidden"}`}>
            {
              ratings.map(rating => (
                <div key={Number(rating.id)}>
                  <RatingBox rating={rating} />
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

