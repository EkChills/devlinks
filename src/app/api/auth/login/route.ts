import { NextResponse } from "next/server"
import { prisma } from "../../../../../prisma/prisma"
import bcrypt from 'bcrypt'
import { signJwt, verifyJwt } from "@/lib/jwt"

interface RequestBody {
  name:string,
  email:string,
  password:string,
}

export async function POST(request:Request) {
  const body:RequestBody = await request.json()

  const {email, password} = body
  

  if(!email || !password) {
    return new NextResponse('must fill all inputs', {status:400})
  }


  const user = await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  
  console.log({user});
  
  if(!user || !(await bcrypt.compare(password, user.password!)) ) {
    return new NextResponse('user not found', {status:404})
  }

  const accessToken = signJwt({email:user.email})
  return NextResponse.json({...user, accessToken})
}