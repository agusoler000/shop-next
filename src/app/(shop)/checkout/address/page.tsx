/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import { getCountries } from '@/actions';
import { getUserAddress } from '@/actions/address/get-user-address';
import { auth } from '@/auth';
import { Title } from '@/components';
import { Country } from '@/interfaces';
import { AddressForm } from './ui/AddressForm';


export default async function AddressPage() {
  const session = await auth()
  
  const countries: Country[] = await getCountries();

  if(!session || !session.user){
    return(
    <h3 className='text-5xl'> 500- No hay sesión de usuario</h3>)
  }
  const userAddres   = await getUserAddress(session!.user.id!) 

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoreAddress={userAddres as any} />

      </div>




    </div>
  );
}