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
    <div className=" bg-white rounded-lg shadow-sm p-[1.5rem] sm:p-[2.5rem]  hidden xl:flex xl:items-center xl:justify-center flex-1 max-h-screen">
      <div className="w-[19.1875rem] min-h-[39.4375rem] flex flex-col items-start border border-[#737373] rounded-[3rem] p-[.69rem] ">
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
      </div>

    </div>
  );
}
