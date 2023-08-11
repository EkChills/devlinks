"use client"

import { useAppSelector } from "@/store/typedHooks";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { selectedLinks } from "@/lib/selected-links";
import ColoredLink from "./ColoredLink";

export default function DesktopLinkPrev() {
  const {data:session} = useSession()
  const {links} = useAppSelector((store) => store.links)
  // const [linksPrev, setLinksPrev] = useState()
  return (
    <div className=" bg-white rounded-lg shadow-sm p-[1.5rem] sm:p-[2.5rem]  hidden xl:flex xl:items-center xl:justify-center flex-1 max-h-screen xl:fixed xl:w-[40%]">
      {/* <div className="w-[19.1875rem] min-h-[39.4375rem] flex flex-col items-start border border-[#737373] rounded-[3rem] p-[.69rem] ">
        <div className="w-[17.8125rem] min-h-[38.1875rem] border border-[#737373] rounded-[3rem] relative">
          <div className="absolute left-[5.8rem] right-[5.8rem]  bg-[white] border-b border-r border-l border-[#737373] min-h-[.62rem] rounded-b-[1rem] rounded-t-[1rem] -top-1 h-[2.4rem]"></div>
          <div className="w-full p-[3rem] flex z-[500] items-center justify-center flex-col">
            <div className="w-[6rem] h-[6rem] rounded-full bg-[#da9f9f]">
            {session?.user.image && <Image src={session?.user.image} width={96} height={96} placeholder="empty" alt="profile pic" className="w-full h-full object-cover rounded-full" />}
            </div>
            <div>
            <p className="mt-[1.56rem] text-[2rem] mx-auto font-bold text-[#333333] leading-[150%] capitalize text-center mb-[0.5rem]">{session?.user.email?.split('@')[0]}</p>
            <p className="font-medium text-base text-[#737373] truncate">{session?.user.email}</p>
            </div>
            <div className="flex flex-col space-y-2 w-full mt-[3.2rem]">
              {
                links.map((link) => {
                  const {platform} = link
                  const foundLink = selectedLinks.find((link) => link.label.trim().toLowerCase() === platform.trim().toLowerCase())
                  console.log(foundLink);
                  
                  return <ColoredLink key={link.id} imageUrl={`${foundLink?.image}`} linkUrl={link.url} linkColor={`${foundLink?.background }`} linkText={`${foundLink?.label}`} />
                  
                })
              }
            </div>
          </div>
        </div>
      </div> */}
      <div className="relative w-[19.1875rem] min-h-[39.4375rem]">
    <svg width="308" height="632" className="absolute inset-0" viewBox="0 0 308 632" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z" stroke="#737373"/>
</svg>
<svg width="286" className="absolute top-[0.69rem] bottom-[0.69rem] left-[.69rem]" height="612" viewBox="0 0 286 612" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z" fill="white" stroke="#737373"/>
</svg>
  <div className="w-full p-[3rem] flex items-center justify-center flex-col absolute inset-x-0">
            <div className="w-[6rem] h-[6rem] rounded-full bg-[#625858]">
            {session?.user.image && <Image src={session?.user.image} width={96} height={96} placeholder="empty" alt="profile pic" className="w-full h-full object-cover rounded-full" />}
            </div>
            <div className="">
            <p className="mt-[1.56rem] text-[2rem] mx-auto font-bold text-[#333333] leading-[150%] capitalize text-center mb-[0.5rem]">{session?.user.email?.split('@')[0]}</p>
            <p className="font-medium text-base text-[#737373] truncate">{session?.user.email}</p>
            </div>
            <div className="flex flex-col space-y-2 w-full mt-[3.2rem] max-h-[17rem] overflow-y-scroll">
              {
                links.map((link) => {
                  const {platform} = link
                  const foundLink = selectedLinks.find((link) => link.label.trim().toLowerCase() === platform.trim().toLowerCase())
                  console.log(foundLink);
                  
                  return <ColoredLink key={link.id} imageUrl={`${foundLink?.image}`} linkUrl={link.url} linkColor={`${foundLink?.background }`} linkText={`${foundLink?.label}`} />
                  
                })
              }
            </div>
          </div>

      </div>

    </div>
  );
}
