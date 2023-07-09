import { authOptions } from "@/lib/authOptions"
import { prisma } from "../../../../prisma/prisma"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { Link } from "@/store/features/linksSlice"

export async function GET () {
  const session = await getServerSession(authOptions)
  
  
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

    const reformedLinks = links.map((link) => ({id:link.id, platform:link.platform, url:link.link, userid:session.userId}))
    const deletedLinks = await prisma.link.deleteMany()
    const postedLinks = await prisma.link.createMany({
      data:[
        ...reformedLinks
      ]
    })

    if(!deletedLinks || !postedLinks) {
      return new NextResponse('something went wrong:cant delete or fetch create ', {status:500})
    }

    return NextResponse.json({msg:'success'})
    
  } catch (error) {
    console.log(error);
    return new NextResponse('internal server error', {status:500})
  }

}