import Image from 'next/image'
import React from 'react'

export default function EmptyLinks() {
  return (
    <div className='bg-[#FAFAFA] rounded-[.75rem] mt-[1.5rem] flex flex-col items-center pt-[3rem] pb-[3rem]'>
      <Image src={'/images/illustration-empty.svg'} width={124.766} height={80} alt='empty links' className='mb-[1.5rem] sm:mb-[2.5rem] text-center' />
      <h3 className="text-[1.5rem] sm:text-[2.5rem] text-[#333333] font-bold leading-[150%]">Let&apos;s get you started</h3>
      <p className="text-base text-[#737373] font-medium leading-[150%] text-center mt-[1.5rem] max-w-[30.5rem]">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
    </div>
  )
}
