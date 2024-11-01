"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const changeUserRole = async(userId:string,role:string)=>{

    const session = await auth();
    const rolPrisma: Role = role as Role
    if(session?.user.role !== 'ADMIN')return{
        ok:false,
        message:'403'
    }
    try {
        await prisma.user.update({
           where:{id:userId},
           data:{role:rolPrisma}
        })
    
        revalidatePath('/admin/users')
        return {
            ok:true,
       
        
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: 'Error al cambiar el rol'
        
        }
        
    }

}