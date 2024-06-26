import { Avatar, Rating } from '@mui/material'
import React from 'react'
import dayjs from 'dayjs'

interface Rating {
    id: Number,
    rating: Number,
    review: String,
    username: String,
    createdAt?: String
}

type Props = {rating:Rating}

export default function RatingBox({rating}: Props) {
    
  return (
    <div className='w-full min-h-36 border-2 border-blue-950 ' key={Number(rating.id)}>
        <div className='p-2 px-4 w-full flex flex-col gap-2'>
            <div  className=' flex flex-row gap-3 justify-between'>
                <div className=' flex flex-row gap-3'>
                <Avatar src='' />
                <p className='py-2'>{rating.username}</p>
                </div>
                <div className='py-2'>
                    {dayjs(rating.createdAt as string).format('MMM D, YYYY h:mm A')}
                </div>
            </div>
            <div>
                <Rating sx={{color:"#002D62"}} value={Number(rating.rating)} precision={.5} readOnly/>
            </div>
            <div>
                {rating.review}
            </div>
        </div>
    </div>
  )
}