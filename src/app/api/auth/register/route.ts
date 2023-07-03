import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import bcrypt from 'bcrypt'

export type UserBody = {
  email:string;
  password:string;
}

export async function POST(request:NextRequest) {
  try {
    
    const {email, password}:UserBody = await request.json()
  
    if(!email ||!password) {
      return new NextResponse('one or more fields are missing', {status:400})
    }

    const exist = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(exist) {
      return new NextResponse('user currently exists', {status:401})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data:{
        email:email,
        password:hashedPassword
      }
    })

    return NextResponse.json(user)
    
  } catch (error) {
    
  }
}