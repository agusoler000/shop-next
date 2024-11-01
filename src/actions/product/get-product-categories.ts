/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { ProductCategory } from "@/interfaces/categories.interface";
import prisma from "@/lib/prisma";


export const getCategories = async ():Promise<ProductCategory[] | any> =>{

    try {
   
    const categories = await prisma.category.findMany()
    if(!categories)return {ok:false};
    
    return categories
        

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener producto por slug')   
    }

}