import { authOptions } from "@/lib/authOptions"
import { prisma } from "../../../../prisma/prisma"
import  {v4 as uuid} from 'uuid'
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Link } from "@/store/features/linksSlice"

export async function GET () {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  
  
  try {
    const links = await prisma.link.findMany({
      where:{
        user:{
          email:session?.user.email
        }
      }
    })

    if(!session) {
      return new NextResponse('unauthorized', {status:401})
    }

    return NextResponse.json({links})
    
  } catch (error) {
    console.log(error);
    return new NextResponse('internal server error', {status:500})
  }
}

export async function POST (req:NextRequest) {
  const session = await getServerSession(authOptions)
  const links:Link[] = await req.json()
  try {
    if(!session?.accessToken) {
      return new NextResponse('unauthorized', {status:401})
    } 
      
    if(!links) {
      return new NextResponse('bad request', {status:400})
    }

    const reformedLinks = [...links]
    console.log(reformedLinks);
    
    // const deletedLinks = await prisma.link.deleteMany({
    //   where:{
    //     user:{
    //       id:session.userId
    //     }
    //   }
    // })

    // const postedLinks = await prisma.link.createMany({
    //   data:[
    //     ...reformedLinks
    //   ]
    // })

      const [deletedLinks, postedLinks] = await prisma.$transaction([
        prisma.link.deleteMany({where:{user:{id:session.userId}}}),
        prisma.link.createMany({
          data:[
            ...links
          ]
        })

      ])
    // const [deleted, posted] = await Promise.allSettled([deletedLinks, postedLinks])
    // console.log(deleted)
    // console.log(posted);
    
    

  

    if(!deletedLinks || !postedLinks) {
      return new NextResponse('something went wrong:cant delete or fetch create ', {status:500})
    }

    return NextResponse.json({msg:'success'})
    
  } catch (error) {
    console.log(error);
    return new NextResponse('internal server error', {status:500})
  }

}

