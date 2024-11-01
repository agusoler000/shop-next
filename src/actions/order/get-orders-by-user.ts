"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma";


export const getOrdersByUser = async () =>{
    const session = await auth();
    if(!session?.user)return{
        ok:false,
        message:'No session'
    }

    try {
     const orders = await prisma.order.findMany({where:{userId:session.user.id},include:{OrderAddress:true}})
        
     return {
        ok:true,
        orders
     }

    } catch (error) {
        console.log(error)
        return {
            ok:false,
            message:' Error'
         }
        
    }
    
}