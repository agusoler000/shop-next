export const revalidate = 60; // SEGUNDOS
/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ProductGender } from "@/interfaces";
import { Gender } from '@prisma/client';
import { redirect } from "next/navigation";




interface Props {
  params: {
     gender?:string;
  },
  searchParams: {
    page?:string;
 }
}


const categories:Record<ProductGender, string> ={
  "men": "Hombres",
  "women": "Mujeres",
  "kid": "Niños",
  "unisex": "Unisex"
}

export default async function({searchParams,params}:Props) {  
  const {gender} = params ;
  console.log({params});
   const page = searchParams.page ? parseInt(searchParams.page) : 1;  
   const {products,currentPage,totalPages} = await getPaginatedProductsWithImages({page,gender:gender as Gender})
   console.log(currentPage,totalPages);
   
   if(products.length === 0){
      
         redirect('/gender/' + gender)
      }
  return (
    <div>
      <Title 
     title={`Articulos de ${categories[gender as ProductGender]}`}
      subtitle="Todos los productos"
      className="text-4xl font-semibold my-10"
     /> 
     <ProductGrid products={products} />
     <Pagination totalPages={totalPages}/>
    </div>
  );
}