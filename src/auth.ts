/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthConfig } from "next-auth"
// import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import {z} from 'zod'
import prisma from "./lib/prisma"
import bcryptjs from 'bcryptjs';


export const authConfig: NextAuthConfig = {


    providers: [ Credentials({
        async authorize (credentials) {
         const parsedCredentials = z.object({email: z.string().email(), password: z.string().min(6)}).safeParse(credentials)
         if(!parsedCredentials.success)return null;
         const {email,password} = parsedCredentials.data
         const user = await prisma.user.findUnique({where:{email:email.toLowerCase()}})
 
         if(!user)return null;
 
         if(!bcryptjs.compareSync(password,user.password))return null;
         
         const { password:_,...rest } = user;
        
         
         return rest;
         }
     }) ] ,
     pages:{
         signIn: '/auth/login',
         newUser:  '/auth/new-account'
     },
     callbacks:{
         async jwt({token,user}) {
             // console.log({token,user});
             if(user){
             token.data = user;
             }
             return token
         },
         async session({session,token}) {
  
             
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             session.user = token.data as any
             return session
         },
         authorized({ auth, request: { nextUrl } }) {
            console.log({auth});
            
            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //   if (isLoggedIn) return true;
            //   return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //   return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
          },
         
     }
 
 }
    




export const {  signIn, signOut, auth, handlers } = NextAuth( authConfig );
