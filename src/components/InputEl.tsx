"use client"

import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, UseFormRegister } from "react-hook-form";
import Image from 'next/image'
import { UserType } from "@/lib/types/formTypes";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label:Path<UserType>;
  placeholderText:string;
  id:string;
  type?:string;
  imagePath:string;
  isError?:FieldError | any;
  labelText?:string;
  register:UseFormRegister<UserType>
}
// interface IFormValues {
//   email: string;
//   password: number;
//   confirmPassword:string;
// }



const InputEl = ({label, placeholderText,register, id,type,imagePath,isError,labelText, ...rest }:Props) => {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-[#333333] text-[.75rem]">{labelText}</label>
      <div className={`flex px-4 py-[.75rem] items-center space-x-[.75rem] rounded-md border ${isError ? 'border-[#FF3939]' : 'border-[#D9D9D9]' }   focus-within:border-2 focus-within:border-[#633CFF] focus-within:shadow-lg focus-within:shadow-[rgba(133,121,179,0.25)] bg-white`}>
        <Image src={imagePath} alt="email" width={16} height={16}/>
        <input type={type} className="caret-[#633CFF] text-[#333333] w-full placeholder:text-base placeholder:font-medium placeholder:opacity-50 placeholder:text-[#333333] outline-none" placeholder={placeholderText} {...register(label, {required:true})} {...rest} />
        {isError &&<span className="font-medium text-[#FF3939] text-[.75rem] truncate">{isError.message}</span>}
      </div>
    </div>
  )
}

export default InputEl