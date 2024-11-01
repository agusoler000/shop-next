/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { PaypalOrderStatusResponse } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"



export const paypalCheckPayment = async (transactionId:string)=>{
    const authToken = await getPaypalBearerToken()
    console.log('ACCESS TOKEN: ', authToken)
  if(!authToken){
    return {
      ok:false,
      message:'No se pudo verificar la session'
    }
  }
  const resp = await verifyPaypalPayment(transactionId,authToken)

  if(!resp){
    return {
      ok:false,
      message:' Error al Procesar el pago'
    }
  }

  const {status,purchase_units} = resp
  const {} = purchase_units[0].reference_id
  console.log("---");
  
  console.log(purchase_units[0].invoice_id)
  console.log("---");
  const {invoice_id:orderId} = purchase_units[0]
  if(status !== 'COMPLETED'){
    return {
      ok:false,
      message:'No se realizó el pago'
    }
  }

  try {
    
    await prisma.order.update(
      {where:{ id: orderId},
      data:{isPaid:true,paidAt: new Date()}
    })

    revalidatePath(`/orders/${orderId}`)

  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:'500 - Algo ha salido mal'
    }

  

  }
    
}


const getPaypalBearerToken = async():Promise<string | null> =>{
const PAYPAL_CLIENT_ID =  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET
const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,'utf-8').toString('base64')
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Authorization", `Basic ${base64Token}`);

const urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");

const requestOptions: any = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};
const authUrl = process.env.PAYPAL_OAUTH_URL || ''
try {
 const result = await fetch(authUrl, {...requestOptions,cache:'no-store'})
  .then((response) => response.json())
  
  return result.access_token
} catch (error) {
    console.log(error)
    return null
}




}


const verifyPaypalPayment = async(transactionId:string,token:string):Promise<PaypalOrderStatusResponse | null> =>{
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};
const url = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`
try {
  
 const response = await fetch(url, {...requestOptions, cache:'no-store'})
    .then((response) => response.json())
    return response
} catch (error) {
  console.log(error)
  return null
}

}