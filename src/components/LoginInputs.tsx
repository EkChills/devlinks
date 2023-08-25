"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import InputEl from "./InputEl";
import Link from "next/link";
import { useState } from "react";
import { BasicSchema, UserType } from "@/lib/types/formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import {FcGoogle} from 'react-icons/fc'
import axios from "axios";
import { signIn } from "next-auth/react";
import { PuffLoader } from "react-spinners";
import { cn } from "@/lib/utils";

const LoginInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ resolver: zodResolver(BasicSchema) });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(isLoading);

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    const email = data.email;
    const password = data.password;
    console.log(email, password);

    setIsLoading(true)
    try {
      const callback = await signIn('credentials', {email, password, redirect:false})
      if(callback?.error) {
        console.log(callback.error);
        
       return toast({
          title:"something went wrong"
        })
      }

      if(callback?.ok || !callback?.error) {
        router.push('/dashboard')
        return toast({
          title:"logged in successfully"
        })
      }
      

        
    } catch (error) {
      toast({
        title:"something went wrong"
      })
      console.log(error);
      
    } finally {
      setIsLoading(false)
    }
  };

  async function signGoogle(){
    try {
      const callback = await signIn('google')
      router.push('/dashboard')
    } catch (error) {
      
    }
  }

  return (
    <form
      className="flex flex-col space-y-[1.5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputEl
        register={register}
        isError={errors.email}
        imagePath="/images/icon-email.svg"
        id="email"
        label="email"
        labelText="Email address"
        placeholderText="e.g. alex@email.com"
      />
      <InputEl
        register={register}
        isError={errors.password}
        imagePath="/images/icon-password.svg"
        id="password"
        label="password"
        labelText="Password"
        type="password"
        placeholderText="Enter your password"
      />
      <button
        type="submit"
        className="w-full h-[2.875rem] bg-[#633CFF] text-center rounded-[.5rem] text-base font-semibold text-white flex items-center justify-center"
      >
        {isLoading ? <PuffLoader color="#ffffff" size={20} /> : "Login"}
      </button>
      <div onClick={signGoogle} className={cn('flex items-center border border-gray-500 rounded-[.5rem] justify-center min-h-[2.875rem] group space-x-3 hover:bg-slate-700 transition-all duration-300 cursor-pointer')}>
        <FcGoogle className="text-[2rem]" />
        <p className="font-semibold group-hover:text-white">Sign in with Google</p>
      </div>
      <div className="flex flex-col leading-[150%] text-center">
        <p className="text-[#737373] text-base font-medium">
          Don&apos;t have an account?
        </p>
        <Link
          href={"/register"}
          className="text-[#633CFF] text-base font-medium"
        >
          Create account
        </Link>
      </div>
    </form>
  );
};

export default LoginInputs;
