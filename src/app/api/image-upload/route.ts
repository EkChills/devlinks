import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(req:NextRequest) {
  const body:{
    image:string
  } = await req.json()
  try {
    const session = await getServerSession(authOptions)
    const updatedUser = await prisma.user.update({
      where:{
        email:session?.user.email!
      },
      data:{
        image:body.image
      }
    })
    if(!updatedUser) {
      return new NextResponse('an error ocurred when connecting to the db', {status:404})
    }
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`)
  }
}