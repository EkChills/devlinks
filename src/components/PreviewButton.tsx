"use client"

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, Children } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?:string;
  children:React.ReactNode
  routeTo?:string;
}

const PreviewButton = ({children, className,routeTo, ...rest}:Props) => {
  const router  = useRouter()
  return (
    <button className={cn('py-[.69rem] px-[1.69rem] rounded-[.5rem]', className)} onClick={() => router.push(routeTo as string)} {...rest}>{children}</button>
  )
}

export default PreviewButton