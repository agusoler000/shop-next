/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { auth } from "@/auth";
import { Size } from "@/interfaces";
import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId:string;
    quantity:number;
    size:Size
}

export const placeOrder = async(productIds:ProductToOrder[],address:Address) =>{
    const session = await auth();
    const userId = session?.user.id
    if(!userId){
        
    return {
        ok:false,
        message:'No user Session'
    }
    }
    
    const products = await prisma.product.findMany({
        where:{
            id:{
                in: productIds.map(p =>p.productId)
            }
        }
    })
    
   // Calcular los montos
   const itemsInOrder = productIds.reduce((count,p)=>count + p.quantity,0)
   
   // Los totales
   const {subTotal,tax,total} = productIds.reduce((totals,product)=>{
    const productQuantity = product.quantity
    const producto = products.find(p => p.id === product.productId)
    if(!producto) throw new Error(`ERROR FATAL CON EL ${product.productId}`)
        
    const subttotal = producto.price * productQuantity
    totals.subTotal += subttotal
    totals.total += subttotal  * 1.21
    totals.tax += subttotal * 0.21
        
    return totals
   }, {subTotal:0, tax:0, total:0})
   
    // CREAR TRANSACCIÓN
   try {
    const dbTx = await prisma.$transaction(async(tx)=>{
        //1. Actualizar stock 
    
        const updatedProductPromises = products.map( (product)=>{
            //acumular valores
            const productQuantity = productIds.filter(
                p => p.productId === product.id
            ).reduce((acc,item)=> item.quantity + acc,0)
            if(productQuantity === 0) throw new Error(`${product.id} no tiene cantidad definida`)
            return tx.product.update({where:{id:product.id}, data:{
            inStock: {
                decrement: productQuantity
            }
        }})
        })
    
        //2. Crear la orden - Encabezado - Detalles
        const updatedProducts = await Promise.all(updatedProductPromises)
        //Si hay valores negativos no hay stock
        updatedProducts.forEach(p => {
            if(p.inStock < 0){
                throw new Error('No hay stock suficiente del producto ' + p.id )
            }
            }
        )
        const order = await tx.order.create({
            data:{
                userId,
                itemsInOrder,
                subtotal:subTotal,
                tax:tax,
                total:total,  
                isPaid:false,          
                OrderItem: {
                    createMany:{
                        data:productIds.map(p => 
                            ({quantity:p.quantity, 
                                size:p.size, 
                                productId: p.productId, 
                                price: products.find(product => product.id === p.productId)?.price || 0
                            }))
                    }
                }
    
            }
        })
        
        //3. Crear la dirección
        const {country,...restAddress} = address
        const addressDb = await tx.orderAddress.create({
            data:
                {...restAddress,
                    countryId:address.country,
                    orderId:order.id            
                }
            
        })
    
    
        return {
            order,
            updatedProducts:updatedProducts,
            orderAddress:addressDb
        }
    
       })

       return {
        ok:true,
        order:dbTx.order

       }
    
   } catch (error:any) {
    console.log({error});
    return {
        ok:false,
        message:error?.message
    }
   }
   
    





    // return {
    //     ok:false
    // }
}