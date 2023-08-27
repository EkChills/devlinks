"use client"

import LottieError from '@/components/LottieError';
import React, {useEffect} from 'react'

export default function Error({error, reset}:{error:Error, reset:() => void}) {

  useEffect(() => {
    console.log(error);
    
  },[error])

  return (
    <div className='sm:max-w-[46.1rem] sm:mx-auto flex flex-col items-center '>
    <LottieError />
    <h2 className='font-bold text-[1.125rem] sm:text-[1.25rem] mb-6'>Something went wrong</h2>
  </div>
  )
}