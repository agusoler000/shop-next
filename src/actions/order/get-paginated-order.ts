"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma";

// interface PaginationOptions{
//     page?:number;
//     take?:number;

// }

export const getPaginatedOrders = async () =>{
    const session = await auth();
    if(session?.user.role !== 'ADMIN')return{
        ok:false,
        message:'403'
    }

    try {
     const orders = await prisma.order.findMany({orderBy:{
        createAt:'desc'
     } ,
     include:{OrderAddress:true}})
        
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