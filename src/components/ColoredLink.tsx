"use client"

import Image from "next/image";
import { toast } from "./ui/use-toast";

interface Props {
  imageUrl:string;
  linkText:string;
  linkColor:string;
  linkUrl:string;
}

const ColoredLink = ({imageUrl, linkText, linkColor, linkUrl}:Props) => {
  const onColoredClick = (linkText:string):void => {
    navigator.clipboard.writeText(linkText)
    toast({
      title:'link copied successfully🛬'
    })
  }
  return (
    <div className={`rounded-[.5rem] ${`bg-[${linkColor}]`} p-[1rem] flex space-x-[1rem] items-center cursor-pointer w-full`} style={{backgroundColor:linkColor}} onClick={() => onColoredClick(linkUrl)}>
      <Image src={imageUrl} width={20} height={20} alt="icon" />
      <p className="text-base leading-[150%] text-white flex-1 ">{linkText}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#fff" d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/></svg>
    </div>
  )
}

export default ColoredLink