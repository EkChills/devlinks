"use client"

import {SubmitHandler, useForm} from 'react-hook-form'
import InputEl from './InputEl'
import Link from 'next/link'
import { useState } from 'react'
import { BasicSchema, UserType } from '@/lib/types/formTypes'
import {zodResolver} from '@hookform/resolvers/zod'




const LoginInputs = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<UserType>({resolver:zodResolver(BasicSchema)})
  // const [formInputs, setFormInputs] = useState<{email:string, password:string}>({email:'', password:''})
  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const {name, value} = e.target
  //   setFormInputs((prevInputs) => ({...prevInputs, [name]:value}))
  // }

  const onSubmit:SubmitHandler<UserType> = (data) => {
    console.log(data.email);
    console.log(data.password);
    
    console.log('hbkj');
    
  }

  console.log(errors.email);
  console.log(errors.password);
  
  
  
  return (
    <form className='flex flex-col space-y-[1.5rem]' onSubmit={handleSubmit(onSubmit)}>
      <InputEl register={register} isError={errors.email} imagePath="/images/icon-email.svg" id="email" label='email' labelText="Email address" placeholderText='e.g. alex@email.com' />
      <InputEl register={register}  isError={errors.password}  imagePath="/images/icon-password.svg" id='password' label='password' labelText="Password" type='password' placeholderText='Enter your password' />
      <button type='submit' className='w-full h-[2.875rem] bg-[#633CFF] text-center rounded-[.5rem] text-base font-semibold text-white'>Login</button>
      <div className='flex flex-col leading-[150%] text-center'>
        <p className='text-[#737373] text-base font-medium'>Don&apos;t have an account?</p>
        <Link href={'/register'} className='text-[#633CFF] text-base font-medium'>Create account</Link>
      </div>
    </form>
  )
}

export default LoginInputs