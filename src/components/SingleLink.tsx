"use client"

import { useAppSelector } from "@/store/typedHooks";
import Dropdown from "./Dropdown";
import InputElLink from "./InputElLink";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormLink } from "@/lib/types/formTypes";

interface Props {
  id:string;
  platform:string;
  link:string;
  linkIndex:number | string
  register?:UseFormRegister<FormLink>,
  errors:any
}

const SingleLink = ({id, platform, link, linkIndex, register, errors}:Props) => {
  const {selectedLink} = useAppSelector(store => store.links)  
  
  
  return (
    <div className="bg-[#FAFAFA] p-[1.25rem] rounded-[.75rem] flex flex-col space-y-[.75rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[.5rem]">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/></svg>
        <p className="text-base font-bold text-[#737373]">Link {linkIndex}</p>
        </div>
        <p className="text-base font-medium text-[#737373] hover:cursor-pointer">Remove</p>
      </div>
    <Dropdown imagePath={selectedLink.image} id={id} platform={platform} />
    <InputElLink
        register={register!}
        isError={errors[id] as any}
        tempText={link}
        imagePath="/images/icon-link.svg"
        id={id}
        label={id as "link"}
        labelText="Link"
        type="text"
        placeholderText="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  )
}

export default SingleLink