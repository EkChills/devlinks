"use client"

import CustomizeLinks from "@/components/CustomizeLinks"
import DesktopLinkPrev from "@/components/DesktopLinkPrev"
import axios from "axios"

interface Props {

}



const Page = ({}:Props) => {
  return (
    <div className="px-[1rem] sm:px-[1.5rem] pt-[6rem] pb-[1.5rem]">
      <div className="xl:flex xl:space-x-[1.5rem]">
      <DesktopLinkPrev />
      <CustomizeLinks />
      </div>
    </div>
  )
}

export default Page