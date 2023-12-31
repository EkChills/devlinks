"use client"

import { useAppDispatch, useAppSelector } from "@/store/typedHooks";
import Dropdown from "./Dropdown";
import InputElLink from "./InputElLink";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormLink } from "@/lib/types/formTypes";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, dropLink } from "@/store/features/linksSlice";
import DraggableDnd from "./providers/DraggableDnd";

interface Props {
  id:string;
  platform:string;
  link:string;
  linkIndex:number | string
  register?:UseFormRegister<FormLink>,
  errors:any
}

const SingleLink = ({id, platform, link, linkIndex, register, errors}:Props) => {
  const {selectedLink, links} = useAppSelector(store => store.links)  
  const dispatch = useAppDispatch()


  const queryClient = useQueryClient()

  const mutation = useMutation(delLink => {
    return axios.delete(`/api/links/${id}`)
  }, 
  {
    onSuccess:() => {
      queryClient.invalidateQueries('links' as any)
      dispatch(dropLink(id))
      toast({
        title:"Link Deleted! ✨"
      })
    },
  }
  )

  const removeLink = async() => {
      const res = await axios(`/api/links`)
      const linkData:{links:Link[]} = await res.data
      
      
      const localLink = links.find((link) => link.id === id)
      const foundLink = linkData.links.find((link) => link.url === localLink?.url)
      if(foundLink) {
        mutation.mutate() 
        return
      }
      dispatch(dropLink(id))
  }

  
  
  
  return (
    <DraggableDnd id={id} index={linkIndex as number}>
      {(provided) => (
         <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="bg-[#FAFAFA] p-[1.25rem] rounded-[.75rem] flex flex-col space-y-[.75rem]">
         <div className="flex items-center justify-between">
           <div className="flex items-center space-x-[.5rem]">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/></svg>
           <p className="text-base font-bold text-[#737373]">Link {linkIndex as number + 1}</p>
           </div>
           { mutation.isLoading ? <Image src={'/images/del-spinner.svg'} width={20} height={20} alt="delete spinner" /> : <p className="text-base font-medium text-[#737373] hover:cursor-pointer" onClick={removeLink} >Remove</p>}
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
      )}
   
    </DraggableDnd>
  )
}

export default SingleLink