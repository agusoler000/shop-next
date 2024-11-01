"use server"

import prisma from "@/lib/prisma";


export const getCountries = ()=>{
    try {
        const countries = prisma.country.findMany({
            orderBy:{
                name:'asc'
            }
        })
        return countries;
    } catch (error) {
        console.log(error);
        return [];
        
    }
}