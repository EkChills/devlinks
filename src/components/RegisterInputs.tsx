"use client"

import {SubmitHandler, useForm} from 'react-hook-form'
import InputEl from './InputEl'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicSchemaWithPass, UserType } from '@/lib/types/formTypes'




const RegisterInputs = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<UserType>({resolver:zodResolver(BasicSchemaWithPass)})

  const onSubmit:SubmitHandler<UserType> = (data) => {
    
  }
  
  return (
    <form className='flex flex-col space-y-[1.5rem]' onSubmit={handleSubmit(onSubmit)}>
      <InputEl register={register}  labelText='Email Address' label='email' id='email' isError={errors.email} imagePath="/images/icon-email.svg" placeholderText='e.g. alex@email.com' />
      <InputEl register={register}  labelText='Create Password' label='password' id='password' isError={errors.password} imagePath="/images/icon-password.svg" type='password' placeholderText='At least .8 characters' />
      <InputEl register={register} labelText='Confirm Password' label='confirmPassword' id='confirm-password' isError={errors.confirmPassword} imagePath="/images/icon-password.svg" type='password' placeholderText='At least .8 characters' />
      <button className='w-full h-[2.875rem] bg-[#633CFF] text-center rounded-[.5rem] text-base font-semibold text-white'>Login</button>
      <div className='flex flex-col leading-[150%] text-center'>
        <p className='text-[#737373] text-base font-medium'>Already have an account?</p>
        <Link href={'/login'} className='text-[#633CFF] text-base font-medium'>Login</Link>
      </div>
    </form>
  )
}

export default RegisterInputs