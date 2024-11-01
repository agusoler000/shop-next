"use client"

import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';
import { currencyFormater } from '../../../../utils/currencyFormatter';
import { useRouter } from 'next/navigation';

export const OrderSummary = () => {
  const router = useRouter()
    const [loaded, setloaded] = useState(false)
    const {itemInCart,subtotal,tax,total} = useCartStore(state => state.getSummaryInformation())
    
    
    useEffect(() => {
        setloaded(true)
}, [])   
    useEffect(() => {
       if(itemInCart === 0 && loaded === true){
        router.replace('empty')
       
       }
}, [itemInCart, loaded, router])   
    
    
    if(!loaded) return <div> Cargando... </div>
  return (
    <>
           <div className="grid grid-cols-2">
               <span>No.Productos</span>
               <span className="text-right"> {itemInCart === 1 ? " 1 artículo": `${itemInCart} artículos`}</span>
            
               <span>Subtotal</span>
               <span className="text-right">  {currencyFormater(subtotal)}</span>
           
               <span>Impuestos 21%</span>
               <span className="text-right">  {currencyFormater(tax)}</span>
          
               <span className="mt-5 text-2xl">Total</span>
               <span className="text-right mt-5 text-2xl">  {currencyFormater(total)}</span>
              </div> 
    </>
  )
}
