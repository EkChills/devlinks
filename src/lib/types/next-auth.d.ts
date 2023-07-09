import { User } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    accessToken:string;
    userId:string;
    user:User
  }
}