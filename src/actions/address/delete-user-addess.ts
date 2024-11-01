"use server"
import prisma from "@/lib/prisma";


export const deleteAddress = async(userId:string)=>{

    try {

        const deleltedAddress = await prisma.userAddress.delete({
            where:{userId}
        })
        console.log({deleltedAddress});
        
        return {
            ok:true,
            deleltedAddress
        }
    } catch (error) {
        console.log(error);
		return {
			ok: false,
			message: 'Error 400- Frankito Request',
		};
    }
}