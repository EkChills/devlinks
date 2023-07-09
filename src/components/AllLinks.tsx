"use client"

import { useAppSelector } from "@/store/typedHooks"
import SingleLink from "./SingleLink"
import { Link } from "@/store/features/linksSlice"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { FormLink } from "@/lib/types/formTypes"


interface Props {
  linkItems:Link[];
  register:UseFormRegister<any>;
  errors:FieldErrors<{}>
}

const AllLinks = ({linkItems, register, errors}:Props) => {
  const {links} = useAppSelector((store) => store.links)
  
  return (
    <div className=" rounded-[.75rem] mt-[1.5rem] flex flex-col  pt-[3rem] pb-[3rem] space-y-[1.5rem]">
      {links.map((linkItem, index) => {
        const {id, link, platform, url} = linkItem 
        
        return <SingleLink id={id} link={url as string} key={id} register={register} errors={errors} platform={platform} linkIndex={index} />
      })}
    </div>
  )
}

export default AllLinks