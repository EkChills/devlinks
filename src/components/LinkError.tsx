import React from 'react'
import LottieError from './LottieError'

export default function LinkError() {
  return (
    <div className='sm:max-w-[46.1rem] sm:mx-auto flex flex-col items-center '>
    <LottieError  />
    <h2 className='font-bold text-[1.125rem] sm:text-[1.25rem] mb-6'>Something went wrong</h2>
    <p className='text-center text-[#757575] font-normal text-[1rem] sm:text-[1.125rem]'>Sorry pal, check your network connection and try again.</p>
  </div>
  )
}
