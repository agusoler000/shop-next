/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */import { Title } from "@/components";
import Link from "next/link";
import { OrderSummary } from "./ui/OrderSummary";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function() {



  // if(){
    // redirect('/empty')
  // }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-2">
          <span className="text-xl"> Agregar mas items</span>
              <Link  href={'/'}> Continua comprando </Link>
        <ProductsInCart />
         
        </div>
          {/* checkout - Resumen */}
            <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

              <h2 className="text-2xl mb-2">Resumen</h2>
              <OrderSummary />
            <div className="mt-5 mb-2 w-full">

            <Link className="flex btn-primary justify-center"  href={'/checkout/address'}> Checkout </Link>
            </div>
            </div>

        </div>
        
      </div>
    </div>
  );
}