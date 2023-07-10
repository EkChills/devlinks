import { NextRequest, NextResponse } from "next/server";
import { UserBody } from "../register/route";
import { prisma } from "../../../../../prisma/prisma";
import bcrypt from 'bcrypt'
import { signJwt } from "@/lib/jwt";

export async function POST(req:NextRequest) {

    const body:UserBody = await req.json();
    console.log(body);
    
  
    if(!body.email || !body.password) {
      return new NextResponse(`required field email or password missing in the request body`, {status:422})
    }
  
    const user = await prisma.user.findUnique({
      where: {
        email:body.email
      }
    })

    if(!user) {   
      return new NextResponse('user does not exist', {status:404})
    }

    if(!(await bcrypt.compare(body.password, user.password!))) {
      return new NextResponse('incorrect password', {status:401})
    }
    
    const accessToken = signJwt({email:user.email})
    return NextResponse.json({...user, accessToken})
    
  } 
