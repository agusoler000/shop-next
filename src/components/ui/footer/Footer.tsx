import { titleFont } from "@/config/fonts"
import Link from "next/link"


export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10  bottom-0 mt-5">
    <Link href={'/'}>
    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
    <span> | shop </span>
    <span> Agustín Soler</span>
    </Link>
    <Link className="mr-5" href={'/'}>About Us</Link>
    <Link className="mr-5" href={'/'}>Privacidad & Legal</Link>
    <Link className="mr-5" href={'/'}>Contacto</Link>

    </div>
  )
}
