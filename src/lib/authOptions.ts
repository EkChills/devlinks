import {AuthOptions} from 'next-auth'
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from '../../prisma/prisma';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '@prisma/client';

export const baseUrl =
process.env.NODE_ENV === "production"
  ? "https://devlinks-eosin.vercel.app"
  : "http://localhost:3000";

export const authOptions:AuthOptions = {
  adapter:PrismaAdapter!(prisma) as Adapter,
  providers:[
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id:'credentials',
      name:"credentials",
      credentials:{
        email:{label:"Email", type:"text", placeholder:"damned@gmail.com"},
        password:{label:"Password", type:"password"}
      },
      async authorize(credentials){
        const res = await fetch(`${baseUrl}/api/auth/login`, {
          method:"POST",
          body:JSON.stringify(
            {
              email:credentials?.email,
              password:credentials?.password,
            }
          )
        })

        const user:User = await res.json()

        if(user) {
          return user
        } 

        return null
      }
    })
  ],
  session:{
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, account, user }) {
      
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = account.userId
      }
      if(user) {        
        return {...token, ...user}
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      
      session.accessToken = token.accessToken as string
      session.userId  = token.id as string
      
      return session
    }
  },
  pages:{
    signIn:'/login',
    newUser:'/register'
  },
  secret: process.env.SECRET,
}