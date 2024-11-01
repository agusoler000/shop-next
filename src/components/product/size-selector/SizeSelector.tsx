
import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    avaiableSizes: Size[];
    selectedSize?: Size;  
    onSizeChange: (size: Size) => void;  
 }
export const SizeSelector = ({avaiableSizes,selectedSize,onSizeChange}:Props) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4"> Tallas disponibles </h3>
        <div className="flex">
            {avaiableSizes.map((size) => (
                <button key={size} 
                onClick={() => onSizeChange(size)}
                className={clsx('mx-2 hover:underline text-lg', {
                    'underline': size === selectedSize
                })}>
                {size}
                </button>
            ))}
        </div>
    </div>
  )
}
