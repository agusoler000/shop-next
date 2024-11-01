"use client"

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"

import { useState } from "react"


interface Props{
    product: Product
}

export const AddToCart = ({product}:Props) => {

const addProductToCart = useCartStore(state => state.addProductToCart)  

const [size, setSize] = useState<Size | undefined>()
const [quantity, setQuantity] = useState<number>(1)
const [posted, setposted] = useState(false)


const addToCart = () => {
    setposted(true)
    if(! size )return;
    const cartProduct:CartProduct = {
        id: product.id,
        slug: product.slug,
        title: product.title,
        image: product.images[0],
        price: product.price,
        quantity,
        size
    }
    addProductToCart(cartProduct)
    setposted(false)
    setSize(undefined)
    setQuantity(1)
    console.log({product, size, quantity})
 }

  return (
    <>  
    
   {
   posted && !size &&
       <span className="mt-2 text-red-600 fade-in"> Seleccione una talla* </span>}
        {/* Selector de talla */}
        <SizeSelector avaiableSizes={product.sizes} selectedSize={size } onSizeChange={setSize}/>
          {/* Selector de cantidad */}
          <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
          {/* Boton de añadir al carrito */}
          <button onClick={addToCart} className="btn-primary my-5">Añadir al carrito</button>
    </>
  )
}
