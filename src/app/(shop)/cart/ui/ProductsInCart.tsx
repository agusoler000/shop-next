"use client"

import { ProductImage, QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"

export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProduct)
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
                <ProductImage 
                className="rounded mr-5" 
                src={product.image} 
                width={100} 
                height={100} alt={product.title}
                style={{
                  width: '100px',
                  height: '100px',
                }}
                />
                <div>
                <Link
                className="hover:underline cursor-pointer"
                href={`/product/${product.slug}`}>
                  <p>{product.size} -{product.title}</p>
                </Link>
                  <p> ${product.price}</p>
                  <QuantitySelector quantity={product.quantity}  onQuantityChanged={value => updateProductQuantity(product,value)}/>
                  <button className="underline mt-3" onClick={()=>removeProduct(product)}> Remover </button>
                </div>

              </div>
            ))
          }
    </>
  )
}
