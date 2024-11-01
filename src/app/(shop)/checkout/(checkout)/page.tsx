/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */


import { Title } from "@/components";
import Link from "next/link";
import { PlaceOrder } from "./ui/PlaceOrder";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function() {

  return (
    <div className="flex justify-center items-centermb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-2">
          <span className="text-xl"> Revisar la orden</span>
              <Link  href={'/cart'}> Editar Carrito </Link>
        
          {/* Items */}
         <ProductsInCart />
        </div>
          {/* checkout - Resumen */}
           <PlaceOrder />

        </div>
        
      </div>
    </div>
  );
}