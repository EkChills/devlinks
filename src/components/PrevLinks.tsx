"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectedLinks } from '@/lib/selected-links'
import ColoredLink from './ColoredLink'
import { Link, addLinks } from '@/store/features/linksSlice'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export default function PrevLinks() {
  const {data:session} = useSession()
  const dispatch = useAppDispatch()
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
  console.log(session);
  

  return (
    <div className="w-full p-[3rem] flex items-center justify-center flex-col absolute inset-x-0 sm:absolute sm:mx-auto sm:max-w-[21.8125rem] sm:bg-white sm:rounded-[1.5rem] sm:top-[12rem]">
            <div className="w-[6rem] h-[6rem] rounded-full bg-[#f0aeae] border-4 border-[#633CFF]">
            {session?.user.image && <Image src={session?.user.image} width={96} height={96} placeholder="empty" alt="profile pic" className="w-full h-full object-cover rounded-full" />}
            </div>
            <div className="">
            <p className="mt-[1.56rem] text-[2rem] mx-auto font-bold text-[#333333] leading-[150%] capitalize text-center mb-[0.5rem]">{session?.user.email?.split('@')[0]}</p>
            <p className="font-medium text-base text-[#737373] truncate">{session?.user.email}</p>
            </div>
            <div className="flex flex-col space-y-2 w-full mt-[3.2rem] max-h-[17rem] overflow-y-scroll">
              {
                data?.links.map((link) => {
                  const {platform} = link
                  const foundLink = selectedLinks.find((link) => link.label.trim().toLowerCase() === platform.trim().toLowerCase())
                  console.log(foundLink);
                  
                  return <ColoredLink key={link.id} imageUrl={`${foundLink?.image}`} linkUrl={link.url} linkColor={`${foundLink?.background }`} linkText={`${foundLink?.label}`} />
                  
                })
              }
            </div>
          </div>
  )
}
