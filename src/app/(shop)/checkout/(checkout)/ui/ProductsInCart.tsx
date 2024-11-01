"use client"
import Image from "next/image"

import { useCartStore } from "@/store"
import { useEffect, useState } from "react"
import { currencyFormater } from '../../../../../utils/currencyFormatter'

export const ProductsInCart = () => {
    const productsInCart = useCartStore(state => state.cart)
    const [lodaded, setlodaded] = useState(false)

    useEffect(() => {
        setlodaded(true)
    }
    , [])
    if(!lodaded) return <div> Cargando... </div>
  return (
    <>

     {/* Items */}
     {
            productsInCart.map((product) => (
              <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                <Image 
                className="rounded mr-5" 
                src={`/products/${product.image}`} 
                width={100} 
                height={100} alt={product.title}
                style={{
                  width: '100px',
                  height: '100px',
                }}
                />
                <div>
                <span
               
               >
                  <p>{product.size} -{product.title} ({product.quantity})</p>
                </span>
                  <p className="font-bold"> {currencyFormater(product.price *product.quantity)}</p>
               
                 
                </div>

              </div>
            ))
          }
    </>
  )
}
