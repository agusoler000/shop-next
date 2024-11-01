"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma";


export const getPaginatedUsers = async()=>{

    const session = await auth();

    if(session?.user.role !== 'ADMIN')return{
        ok:false,
        message:'403'
    }
    
    const users = await prisma.user.findMany({
        orderBy:{name:'desc'}
    })

    return {
        ok:true,
        users
    }

}