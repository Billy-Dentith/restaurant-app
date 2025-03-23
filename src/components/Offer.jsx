import Image from 'next/image'
import React from 'react'
import { CountDown } from './CountDown'
import Link from 'next/link'

export const Offer = () => {
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row md:justify-between'>
        {/* TEXT CONTAINER */}
        <div className='flex-1 flex flex-col justify-center gap-8 p-6'>
            <h1 className='text-white text-5xl font-bold xl:text-6xl'>Delicious Beef Burger & French Fries</h1>
            <p className='text-white xl:text-xl'></p>
            <CountDown />
            <Link
              href={`/menu`}
              className="bg-red-500 text-white text-xl text-center font-bold py-3 px-6 rounded-md"
            >
              Order Now
            </Link>
        </div>
        {/* IMAGE CONTAINER */}
        <div className='flex-1 w-full relative md:h-full'>
            <Image src="/offerProduct.png" alt="" fill className='object-contain' />
        </div>
    </div>
  )
}
