
import Image from 'next/image';


interface Props{
    src?:string;
    alt:string;
    className?:React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width: number;
    height: number;
    style?:React.StyleHTMLAttributes<HTMLImageElement>['style'];
}

export const ProductImage = ({alt,height,width,className,src,style}:Props) => {

const fixedSrc = (src) ? 
src.startsWith('http') ? src :
 `/products/${src}` : '/imgs/placeholder.jpg'; 
  return (
    <Image 
    src={fixedSrc}
    width={width}
    height={height}
    alt={alt}
    className={className}
    style={style}
    />
  )
}
