import { selectedLinks } from "@/lib/selected-links";
import Image from "next/image"
import { useState } from "react";
import {useForm} from 'react-hook-form'
import InputEl from "./InputEl";
import InputElLink from "./InputElLink";
import { useAppDispatch, useAppSelector } from "@/store/typedHooks";
import { handleLinkChange, handleSelectChange, setSelectedLink } from "@/store/features/linksSlice";

interface Props {
  imagePath:string;
  id?:string;
  platform:string;
}

const Dropdown = ({imagePath, id, platform}:Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const imageUrl = selectedLinks.find((link) => link.label.trim().toLowerCase() === platform.trim().toLowerCase())
  const {selectedLink} = useAppSelector(store => store.links)
  
  const dispatch = useAppDispatch()
  return (
    <div>
      <label htmlFor={id} className="font-medium text-[#333333] text-[.75rem]">Platform</label>
      <div className={`flex px-4 py-[.75rem] items-center  rounded-md border justify-between  focus-within:border-2 focus-within:border-[#633CFF] focus-within:shadow-lg focus-within:shadow-[rgba(62,58,79,0.25)] bg-white relative`} onClick={() => setIsDropdownOpen(prev => !prev)}>
        <div className="space-x-[.75rem] flex items-center">
        <Image src={imageUrl?.image as string} alt={platform} width={16} height={16}/>
        <span className="text-base text-[#333333] font-medium">{platform}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path stroke="#633CFF" stroke-width="2" d="m1 1 6 6 6-6"/></svg>
        {isDropdownOpen && <div className="absolute left-0 right-0 rounded-[.5rem] bg-white px-[1rem] py-[.5rem] top-[3.5rem] z-20 border border-[#D9D9D9] max-h-[10rem] overflow-y-scroll">
          {selectedLinks.map((link) => (
            <div key={link.id} className="py-[.75rem] border-b border-[#D9D9D9] flex items-center hover:cursor-pointer" onClick={() => dispatch(handleSelectChange({link:{id:id!},platform:link.label}))}>
              <div className="flex items-center space-x-[.75rem]">
                <Image src={link.image} width={16} height={16} alt={link.label} />
                <span className={`font-medium text-base text-[#333333] ${selectedLink.label.trim().toLowerCase() === link.label.trim().toLowerCase() && 'text-[#633CFF]'}`}>{link.label}</span>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}

export default Dropdown