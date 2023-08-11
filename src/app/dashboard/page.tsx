"use client"

import CustomizeLinks from "@/components/CustomizeLinks"
import DesktopLinkPrev from "@/components/DesktopLinkPrev"



const Dashboard = () => {
  return (
    <div className="px-[1rem] sm:px-[1.5rem] pt-[6rem] pb-[1.5rem]">
      <div className="xl:flex xl:space-x-[1.5rem] w-full relative ">
      <DesktopLinkPrev />
      <CustomizeLinks />
      </div>
    </div>
  )
}

export default Dashboard