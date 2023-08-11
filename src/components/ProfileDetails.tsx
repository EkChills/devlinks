"use client";

import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileEmail, ProfileSchema } from "@/lib/types/formTypes";

export default function ProfileDetails() {
  const {data:session, update} = useSession()
  const {register, handleSubmit, formState:{errors}} = useForm<ProfileEmail>({resolver:zodResolver(ProfileSchema)})
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [emailText, setEmailText] = useState<string | null>('')
  const [imageLink, setImageLink] =useState<string | null | undefined>(session?.user.image)
  console.log(imageLink);
  console.log(session);

  useEffect(() => {
    setImageLink(session?.user.image)
    if(session) {
      setEmailText(session?.user.email)

    }
  }, [session?.user.image, emailText, session])
  console.log(emailText);
  
  
  const submitHandler:SubmitHandler<ProfileEmail | FieldValues> =async(data) => {
    console.log(data.email);
    try {
      setIsSaving(true)
      const res = await axios.patch(`/api/profile`, {email:data.email})
      const updatedUser = await res.data
      console.log(updatedUser);
      await update({
        ...session,
        user:{
          ...session!.user,
          email:data.email
        }
      })
      toast({
        title:'success profile updated!😀'
      })
    } catch (error) {
      console.log(error);
      
      toast({
        title:'couldnt save profile'
      })
    } finally{
      setIsSaving(false)
    }
  }
  

  return (
    <form className=" bg-white rounded-lg shadow-sm p-[1.5rem] sm:p-[2.5rem] flex-[1.3] min-h-[calc(100vh-6rem)] relative xl:overflow-y-scroll xl:max-h-screen w-full xl:left-[41%]   xl:fixed  xl:max-w-[56%]" onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col space-y-[.5rem]">
        <h3 className="text-[#333333] font-bold leading-[150%] text-[1.5rem] sm:text-[2rem]">
          Profile Details
        </h3>
        <p className="leading-[150%] text-[#737373] font-medium text-base max-w-[18.4375rem] sm:max-w-[41rem]">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <div className="w-full flex flex-col space-y-4 sm:space-y-0 sm:space-x-4 mt-[2.5rem] sm:flex-row p-[1.25rem] rounded-[.75rem] bg-[#FAFAFA] sm:items-center">
        <div className="sm:flex-1">
          <p className="text-base text-[#737373] font-medium leading-[150%]">
            Profile picture
          </p>
        </div>
        <div className="sm:flex-[1.5] flex-col space-y-[1.5rem] items-start sm:space-y-0 sm:flex-row sm:space-x-[1.5rem] flex sm:items-center">
        { !imageLink ? <div className="w-[12.0625rem] flex items-center justify-center rounded-[.75rem] bg-[#EFEBFF] h-[12.0625rem] flex-col space-y-[.5rem] cursor-pointer">
            <Image
              src={"/images/icon-upload-image.svg"}
              width={40}
              height={40}
              alt="upload image"
            />
            <p className="font-semibold text-[#633CFF] text-base leading-[150%] capitalize">
              + upload image
            </p>
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={async(res) => {
                // Do something with the response
                try {
                  const upload = await axios.patch(`/api/image-upload`, {
                    image:res![res?.length! - 1].fileUrl
                  })
                  const uploadedData:User= await upload.data
                  setImageLink(uploadedData.image)
                  session!.user.image = uploadedData.image
                  await update({
                    ...session,
                    user:{
                      ...session!.user,
                      Image:imageLink
                    }
                  })
                  
                  console.log("Files: ", res);
                  // setImageUrl(res![res?.length! - 1].fileUrl)
                  toast({
                    title:"Upload completed!"
                  })
                } catch (error) {
                  console.log(error);
                  toast({
                    title:"could'nt upload image try again"
                  })
                }

              }}              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div> : <div className="w-[12.0625rem] flex items-center justify-center rounded-[.75rem] bg-[#EFEBFF] h-[12.0625rem] flex-col space-y-[.5rem] cursor-pointer">
            <Image src={imageLink as string} width={193} height={193} placeholder="empty" alt="profile pic" className="w-full h-full object-cover rounded-[.75rem]" />
            </div>}
            <div className={` ${imageLink && ' flex flex-col space-y-[.5rem]' } `}>
            <p className="text-[.75rem] font-medium leading-[150%] text-[#737373] sm:max-w-[7.9375rem] w-full">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
          {
            imageLink && <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={async(res) => {
              // Do something with the response
              try {
                const upload = await axios.patch(`/api/image-upload`, {
                  image:res![res?.length! - 1].fileUrl
                })
                const uploadedData:User= await upload.data
                setImageLink(uploadedData.image)
                session!.user.image = uploadedData.image
                await update({
                  ...session,
                  user:{
                    ...session!.user,
                    Image:imageLink
                  }
                })
                
                console.log("Files: ", res);
                // setImageUrl(res![res?.length! - 1].fileUrl)
                toast({
                  title:"Upload completed!"
                })
              } catch (error) {
                console.log(error);
                toast({
                  title:"could'nt upload image try again"
                })
              }

            }}              onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          }
            </div>
            
         
        </div>
      </div>
      <div className="w-full flex flex-col space-y-4 sm:space-y-0  mt-[2.5rem] sm:flex-row p-[1.25rem] rounded-[.75rem] bg-[#FAFAFA] sm:items-center sm:space-x-[2rem]">
        <label htmlFor="email_input" className="font-medium text-[#737373] leading-[150%] sm:w-[15rem]">Email</label>
        {session?.user.email && <input type="email"   {...register("email", {required:true, value:session.user.email})} className={`px-[1rem] py-[.75rem] rounded-[.5rem] border ${errors.email ? 'border-[#FF3939]' : 'border-[#D9D9D9]'}  w-full focus:border-[#633CFF] focus-within:border-[#633CFF] outline-none focus:shadow-sm focus:shadow-[#633CFF]`} />}
      </div>

      <div className='  border-[#D9D9D9] border-t-[0.0625rem] flex flex-col absolute left-[0] sm:bottom-0 right-[0] mt-[1.5rem] py-[1rem] xl:py-[1.5rem] sm:px-[2.5rem] px-[1.5rem] justify-center' >
          <button disabled={false} className='leading-[150%] rounded-[.5rem] bg-[#633CFF] text-base text-[white] font-semibold py-[.69rem] w-full text-center xl:ml-auto xl:w-auto xl:px-[1.69rem] disabled:opacity-[.25] flex items-center justify-center'>
        
            {isSaving ? <Image src={'/images/save-roll.svg'} width={20} height={20} alt='spinner' /> :
            'Save' }
          </button>
        </div>
      
    </form>
  );
}
