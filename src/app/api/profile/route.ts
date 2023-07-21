import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req:NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body:{
      email:string
    } = await req.json()
    if(!body.email) {
      return new NextResponse('email is missing', {status:400})
    }
    const updatedUser = await prisma.user.update({
      where:{
        email:session?.user.email!
      },
      data:{
        email:body.email
      }
    })

    if(!updatedUser) {
      return new NextResponse('error ocurred while updating user', {status:500})
    }

    return NextResponse.json(updatedUser)
    
  } catch (error) {
    console.log(error);
    return new NextResponse('internal server error', {status:500})
  }
}