"use client"

import { Link, SelectedLink, addLink, addLinks, setEditing } from '@/store/features/linksSlice'
import { store } from '@/store/store'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
import { useSession } from 'next-auth/react'

import { authOptions } from '@/lib/authOptions'
import { ClimbingBoxLoader, HashLoader, PulseLoader } from 'react-spinners'
import LinkError from './LinkError'
import DragContext from './providers/DragContext'

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
  const {data:session, status} = useSession()
  const dispatch = useAppDispatch()
  const {links,  isEditing} = useAppSelector((store) => store.links)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const queryClient = useQueryClient()

  
  const {data, isFetching, isLoading, isError, error, status:stats} = useQuery({
    queryKey:['links'],
    queryFn:async():Promise<{links:Link[]}> => {
      try {
        const res = await axios('/api/links')
        const data:{links:Link[]} = await res.data 
        console.log(data);
        dispatch(addLinks(data.links))
        return data
      } catch (error) {
        console.log(error);
        
        throw new Error('Failed to fetch data');
      }

    },
    retryDelay:Infinity
  },)

  const addNewLink = () => {
    dispatch(addLink({
      id:uuid(),
      url:'',
      platform:'github',
      userid:session?.userId as string
    }))
  }


  async function onSubmit(){
    try {
      setIsSaving(true)
      const res = await axios.post('/api/links', links)
      const data = await res.data
      console.log(data);
      if(data) {
        queryClient.invalidateQueries('links' as any)
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
      dispatch(setEditing(false))
    }
  }
console.log(error, isLoading);




  return (
    <form className=" bg-white rounded-lg shadow-sm p-[1.5rem] sm:p-[2.5rem] flex-[1.3] min-h-[calc(100vh-6rem)] xl:overflow-y-scroll xl:max-h-screen w-full xl:left-[41%]   xl:fixed  xl:max-w-[56%]" onSubmit={handleSubmit(onSubmit)}>
      <DragContext onDragEnd={(result) => {
        console.log(result.source.index);
        
            if (!result.destination) {
              return;
          }
          const newItems = [...links];
          const [removed] = newItems.splice(result.source.index, 1);
          newItems.splice(result.destination.index, 0, removed);
          dispatch(addLinks(newItems))

          // setItems(newItems)
      }}>
        <div className="flex flex-col space-y-[.5rem]">
          <h3 className="text-[#333333] font-bold leading-[150%] text-[1.5rem] sm:text-[2rem]">Customize your links</h3>
          <p className="leading-[150%] text-[#737373] font-medium text-base max-w-[18.4375rem] sm:max-w-[41rem]">Add/edit/remove links below and then share all your profiles with the world!</p>
        </div>
        <button className='mt-[2.5rem] text-base font-semibold hover:bg-[#EFEBFF] transition-colors duration-500 text-[#633CFF] leading-[150%] py-[.69rem] w-full rounded-[.5rem] text-center border border-[#633CFF] ' onClick={addNewLink}>Add new link</button>
       {isLoading && <div className='items-center justify-center rounded-[.75rem] mt-[1.5rem] flex flex-col  pt-[3rem] pb-[3rem] space-y-[1.5rem]'>
          <div className='flex items-center space-x-4'>
          <h3 className='text-[1.1rem] font-semibold text-[#737373]'>Loading Links</h3>
          <PulseLoader size={16} color='#737373' />
          </div>
        </div>}
        {isError && <LinkError />}
        { !error && !isLoading && links.length === 0 ? <EmptyLinks /> : <AllLinks register={register} errors={errors} linkItems={data?.links as Link[]} />}
        {/* {<hr className='absolute inset-x-[-1rem]' />} */}
        <div className='  border-[#D9D9D9] border-t-[0.0625rem] flex flex-col absolute left-[0] bottom-0 right-[0] xl:relative py-[1rem] xl:py-[1.5rem] sm:px-[2.5rem] px-[1.5rem] justify-center' >
          <button disabled={links.length === 0 || isFetching || !isEditing} className='leading-[150%] rounded-[.5rem] bg-[#633CFF] text-base text-[white] font-semibold py-[.69rem] w-full text-center xl:ml-auto xl:w-auto xl:px-[1.69rem] disabled:opacity-[.25] flex items-center justify-center'>
        
            {isSaving ? <Image src={'/images/save-roll.svg'} width={20} height={20} alt='spinner' /> :
            'Save' }
          </button>
        </div>
        </DragContext>
      </form>
  )
}