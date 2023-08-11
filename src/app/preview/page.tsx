import ColoredLink from "@/components/ColoredLink"
import PrevLinks from "@/components/PrevLinks"
import PreviewButton from "@/components/PreviewButton"
import { authOptions } from "@/lib/authOptions"
import { selectedLinks } from "@/lib/selected-links"
import { Link } from "@/store/features/linksSlice"
import { useAppSelector } from "@/store/typedHooks"
import axios from "axios"
import { getServerSession } from "next-auth"
import Image from "next/image"



const Preview = async() => {
  return (
    <main className="bg-[#FAFAFA]">

    <div className="sm:p-[1.5rem] sm:min-h-[22.3125rem] rounded-b-[2rem] sm:bg-[#633CFF] sm:relative">
      <nav className="px-[1.5rem] py-[1rem] flex justify-between space-x-4 sm:bg-white sm:rounded-[.75rem]">
        <PreviewButton className="text-[#633CFF] font-semibold text-base border border-[#633CFF] w-full sm:max-w-[8.3125rem] sm:text-center sm:px-0" routeTo="/dashboard">
          Back to Editor
        </PreviewButton>
        <PreviewButton className="text-white font-semibold text-base  bg-[#633cff] w-full sm:max-w-[8.3125rem] sm:text-center sm:px-0">
          Share Link
        </PreviewButton>
      </nav>
      <section className="pt-[3rem]">
        <PrevLinks/>
      </section>

    </div>
    </main>
  )
}

export default Preview