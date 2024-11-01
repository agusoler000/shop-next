"use serve"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getOrderById = async(id:string)=>{
    const session = await auth();
    if(!session?.user)return {ok:false, message:'No session'}
    try {

    const order = await prisma.order.findFirst({
        where:{id},
        include:{
            OrderAddress:true,
            OrderItem:{
                select:{
                    price:true,
                    quantity:true,
                    size:true,
                    product:{
                        select:{
                            title:true,
                            slug:true,
                            ProductImage:{
                                select:{
                                    url:true
                                },
                                take:1
                            }
                        }
                    }
                }
            }
        }
    }
    )
    if(!order)throw new Error('404 - not order found')
    if(session.user.role === 'user'){
        if(session.user.role !== order.userId){
            throw `${id} Esta orden no pertenece al usuario`
        }
    }
    

    
        return {
            ok:true,
            order
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
}