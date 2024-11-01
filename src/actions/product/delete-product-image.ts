"use server"
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL!)



export const deleteProductImage = async(imageId:number,url:string)=>{

    if(!url.startsWith('http')){
        return{
            ok:false,
            message:'not allowed'
        }
    }


    const imageName = url.split('/').pop()?.split('.')[0] ?? ''

    try {
        await cloudinary.uploader.destroy(imageName)
        const deletedImg = await prisma.productImage.delete({
            where:{
                id:imageId
            },
            select:{
                product:{
                    select:{
                        slug:true
                    }
                }
            }
        })

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${deletedImg.product.slug}`)
    revalidatePath(`/product/${deletedImg.product.slug}`)
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error,
            message:'No se pudo eliminar'
        }
        
    }

    console.log(imageName);
    

}