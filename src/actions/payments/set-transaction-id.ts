"use server"

import prisma from "@/lib/prisma";



export const setTransactionIdToOrder = async(orderId:string,transactionId:string) =>{
    try {
    const order = await prisma.order.update({where:{id:orderId},
    data:{transactionId}
    })
    if(!order)return {
        ok:false,
        message:'No se pudo actualizar el transactionId'
    }
    
    return {
         ok:true,
          order
    }
        
    } catch (error) {
        console.log(error);
        
        return {
            ok:false,
            message:'No se pudo actualizar el transactionId'
        }
    }
}