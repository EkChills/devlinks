"use client"

import {SubmitHandler, useForm} from 'react-hook-form'
import InputEl from './InputEl'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicSchemaWithPass, UserType } from '@/lib/types/formTypes'
import { useToast } from './ui/use-toast'
import axios, { AxiosError } from 'axios'
import {PuffLoader} from 'react-spinners'
import { useState } from 'react'
import {useRouter} from 'next/navigation'




const RegisterInputs = () => {
  const {register, handleSubmit, formState:{errors}} = useForm<UserType>({resolver:zodResolver(BasicSchemaWithPass)})
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const {toast} = useToast()
  const router = useRouter()

  const onSubmit:SubmitHandler<UserType> = async(data) => {
    const email = data.email
    const password = data.password
    console.log(email, password);
    if(password !== data.confirmPassword) {
      toast({
        title:"passwords don't match"
      })
      return
    }
    
    try {
      await setIsRegistering(true)
      const res = await axios.post('/api/auth/register', {
        email:email,
        password:password
      })
      const data = await res.data
      console.log(data);
      toast({
        title:"Account registered successfully! We're thrilled to have you onboard."
      })
      router.push('/login')
    } catch (error) {
      console.log(error);
      
     if(axios.isAxiosError(error)) {
      if(error.response?.status === 401){
        toast({
          title:error.response.data + ''
        })
        return
      }
     }
     toast({
      title:"something went wrong"
     })
  }
  finally {
    setIsRegistering(false)
  }
}
  
  return (
    <form className='flex flex-col space-y-[1.5rem]' onSubmit={handleSubmit(onSubmit)}>
      <InputEl register={register}  labelText='Email Address' label='email' id='email' isError={errors.email} imagePath="/images/icon-email.svg" placeholderText='e.g. alex@email.com' />
      <InputEl register={register}  labelText='Create Password' label='password' id='password' isError={errors.password} imagePath="/images/icon-password.svg" type='password' placeholderText='At least .8 characters' />
      <InputEl register={register} labelText='Confirm Password' label='confirmPassword' id='confirm-password' isError={errors.confirmPassword} imagePath="/images/icon-password.svg" type='password' placeholderText='At least .8 characters' />
      <button className='w-full h-[2.875rem] bg-[#633CFF] text-center rounded-[.5rem] text-base font-semibold text-white flex items-center justify-center'>
        {isRegistering ? <PuffLoader color='#ffffff' size={24} /> : 'Create account'}
      </button>
      <div className='flex flex-col leading-[150%] text-center'>
        <p className='text-[#737373] text-base font-medium'>Already have an account?</p>
        <Link href={'/login'} className='text-[#633CFF] text-base font-medium'>Login</Link>
      </div>
    </form>
  )
}

export default RegisterInputs