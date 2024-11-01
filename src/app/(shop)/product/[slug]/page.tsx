export const revalidate = 604800 // 7 days
/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { getProductBySlug } from "@/actions";
import { ProductSlideShow, ProductSMobilelideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
 
export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title || 'Product not found',
    description: product?.description || 'Product not found',
    openGraph: {
      title: product?.title || 'Product not found',
      description: product?.description || 'Product not found',
      images: ["/procuts/"+product?.images[1]],
    },
  }
}
 



interface Props {
  params:{
    slug: string;
  }
}



export default async function({params}:Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if(!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
          {/* Mobile */}
          <ProductSMobilelideShow className="block md:hidden" images={product.images} title={product.title}/>
          {/* Escritorio */}
        <ProductSlideShow className="hidden md:block" images={product.images} title={product.title}/>
        </div>
      {/* detalles */}

      <div className="col-span-1 px-5">
          <StockLabel slug={product.slug}/>
          <h1 className={`${titleFont.className} antialiased font-bold text-xl`}> 
            {product.title}
          </h1>
          <p className="text-lg mb-5"> ${product.price} </p>
          <AddToCart product={product} />

          {/* descripcion */}
          <h3 className="font-bol text-sm">Descripcion</h3>
          <p className="font-light">
            {product.description}
          </p>
      </div>

    </div>
  );
}