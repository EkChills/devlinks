import { NextResponse, NextRequest } from "next/server"
import { prisma } from "../../../../../prisma/prisma"


export async function DELETE(req:NextRequest, {params}:{params:{linkId:string}}) {
 

  try {
    const deletedLink = await prisma.link.delete({
      where:{
        id:params.linkId
      }
    })

    if(!deletedLink) {
      return new  NextResponse('something went wrong', {status:400})
    }

    return NextResponse.json({deletedLink})
  } catch (error) {
    return new NextResponse('internal server error', {status:500})
  }
}