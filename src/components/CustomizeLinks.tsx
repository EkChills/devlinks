"use client"

import { Link, SelectedLink, addLink, addLinks } from '@/store/features/linksSlice'
import { store } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import axios from 'axios'
import EmptyLinks from './EmptyLinks'
import AllLinks from './AllLinks'
import { selectedLinks } from '@/lib/selected-links'
import { useForm } from 'react-hook-form'
import { FormLink, FormLinkSchema } from '@/lib/types/formTypes'
import {v4 as uuid} from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from './ui/use-toast'
import Image from 'next/image'

const getLinks = async():Promise<{links:Link[]}> => {
  const res = await fetch('/api/links')
  if(!res.ok) {
    throw new Error('an error ocurred while fetching resource')
  }
  const data = await res.json()
  return data
}



export default function CustomizeLinks() {
  const {register,handleSubmit, formState:{errors}} = useForm()
  const dispatch = useAppDispatch()
  const {links} = useAppSelector((store) => store.links)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  console.log(links);
  
  const {data, isFetching, isLoading, isError} = useQuery({
    queryKey:['jobs'],
    queryFn:async():Promise<{links:Link[]}> => {
      const res = await axios('/api/links')
      const data:{links:Link[]} = await res.data 
      dispatch(addLinks(data.links))
      return data
    },
    cacheTime:Infinity,
    staleTime:Infinity,
  })

  const addNewLink = () => {
    dispatch(addLink({
      id:uuid(),
      link:'',
      platform:'github'
    }))
  }


  async function onSubmit(){
    try {
      setIsSaving(true)
      const res = await axios.post('/api/links', links)
      const data = await res.data
      console.log(data);
      if(data) {
        toast({
          title:'Success! Changes have been applied.'
        })
      }
      
    } catch (error) {
      console.log(error);
      toast({
        title:'Unable to save your changes. Please check your network connection and try again.'
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  

  return (
    <form className=" bg-white rounded-lg shadow-sm p-[1.5rem] sm:p-[2.5rem] flex-[1.3] min-h-[calc(100vh-6rem)] relative" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-[.5rem]">
          <h3 className="text-[#333333] font-bold leading-[150%] text-[1.5rem] sm:text-[2rem]">Customize your links</h3>
          <p className="leading-[150%] text-[#737373] font-medium text-base max-w-[18.4375rem] sm:max-w-[41rem]">Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <button className='mt-[2.5rem] text-base font-semibold hover:bg-[#EFEBFF] transition-colors duration-500 text-[#633CFF] leading-[150%] py-[.69rem] w-full rounded-[.5rem] text-center border border-[#633CFF] ' onClick={addNewLink}>Add new link</button>
        {links.length === 0 ? <EmptyLinks /> : <AllLinks register={register} errors={errors} linkItems={data?.links as Link[]} />}
        <div className='  border-[#D9D9D9] border-t-[0.0625rem] flex flex-col absolute left-[0] right-[0] mt-[1.5rem] py-[1rem] xl:py-[1.5rem] sm:px-[2.5rem] px-[1.5rem] justify-center' >
          <button disabled={links.length === 0} className='leading-[150%] rounded-[.5rem] bg-[#633CFF] text-base text-[white] font-semibold py-[.69rem] w-full text-center xl:ml-auto xl:w-auto xl:px-[1.69rem] disabled:opacity-[.25] flex items-center justify-center'>
        
            {isSaving ? <Image src={'/images/save-roll.svg'} width={20} height={20} alt='spinner' /> :
            'Save' }
          </button>
        </div>
      </form>
  )
}
