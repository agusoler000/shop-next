/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";


interface PaginationOptions{
    page?:number;
    take?:number;
    gender?:Gender
}

export const getPaginatedProductsWithImages = async ({
    page=1,
    take=12,
    gender
    }
    :PaginationOptions) => {
    if( isNaN(Number(page))) page = 1;
    if( page < 1) page = 1;
    if( isNaN(Number(take))) take = 1;
    if( take < 1) take = 1;
    try {

    //1. Obtener los productos   
    const products = await prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        where:{gender:gender},
        include:{
            ProductImage: {
                take:2,
                select:{
                    url:true
                }
            }
        }
    })

    //2. Obtener el total de paginas
    const totalCount = await prisma.product.count({where:{gender:gender}})
    const totalPages = Math.ceil(totalCount / take)

    return {
        currentPage:page,
        totalPages,
        products: products.map(p => ({
            ...p,
            images: p.ProductImage.map(img => img.url)
        }))
    }
    } catch (error:any) {
        
        throw new Error(error.message);
    }
}