'use client';

import { placeOrder } from '@/actions';
import { useCartStore } from '@/store';
import { useAddressStore } from '@/store/address/address-store';
import { currencyFormater } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
	const router = useRouter();
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [error, setError] = useState('');
    

	const address = useAddressStore(state => state.address);
	const { itemInCart, subtotal, tax, total } = useCartStore(state =>
		state.getSummaryInformation()
	);
    const cart = useCartStore(state =>state.cart)
    const clearCart = useCartStore(state =>state.clearCart)

	useEffect(() => {
		setLoaded(true);
	}, []);

   async function onPlaceOrder(){
        setIsPlacingOrder(true)
        const productsInOrder = cart.map((product) => 
            ({productId:product.id,quantity:product.quantity, size:product.size}))
        console.log({productsInOrder})
        console.log({address})
		const resp = await placeOrder(productsInOrder,address)
		console.log(resp);
		if(!resp.ok){
			setIsPlacingOrder(false)	
			setError(resp.message)
			return;
		}

		
        clearCart()
		router.replace(`/orders/${resp.order!.id}`)

    }

	if (!loaded) return <p>Cargando...</p>;
	return (
		<div className='bg-white rounded-xl shadow-xl p-7'>
			<h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
			<div className='mb-10'>
				<p className='text-xl '>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city}, {address.country}
				</p>
				<p>{address.phone}</p>
				{/* <p>{address}</p> */}
			</div>

			{/* divider */}
			<div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

			<h2 className='text-2xl mb-2'>Resumen</h2>
			<div className='grid grid-cols-2'>
				<span>No.Productos</span>
				<span className='text-right'>
					{' '}
					{itemInCart === 1 ? ' 1 artículo' : `${itemInCart} artículos`}
				</span>

				<span>Subtotal</span>
				<span className='text-right'> {currencyFormater(subtotal)}</span>

				<span>Impuestos 21%</span>
				<span className='text-right'> {currencyFormater(tax)}</span>

				<span className='mt-5 text-2xl'>Total</span>
				<span className='text-right mt-5 text-2xl'>
					{' '}
					{currencyFormater(total)}
				</span>
			</div>
			<div className='mt-5 mb-2 w-full'>
                 <p className='text-red-500'>{error}</p> 
				<button
                    disabled={isPlacingOrder}
					className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-primary-disabled': isPlacingOrder,

                        })
                    }
                    onClick={onPlaceOrder}
					//   href={'/orders/123'}
				>
					{' '}
					Confirmar orden{' '}
				</button>
			</div>
		</div>
	);
};
