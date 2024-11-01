/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { getOrderById } from '@/actions';
import { PaypalButton, Title } from '@/components';
import { OrderStatus } from '@/components/orders/OrderStatus';
import { currencyFormater } from '@/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';


interface Props {
	params: {
		id: string;
	};
}
export default async function ({ params }: Props) {
	const { id } = params;

	// TODO VERIFICAR ID
	const { ok, order } = await getOrderById(id);

	console.log(JSON.stringify(order));
	if (!ok) {
		redirect('/');
	}

	const address = order!.OrderAddress;
	return (
		<div className='flex justify-center items-centermb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title={`Orden #${id.split('-').at(-1)}`} />
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					{/* Carrito */}
					<div className='flex flex-col mt-2'>
						
					<OrderStatus isPaid={order!.isPaid} />

						{/* Items */}
						{order!.OrderItem.map(item => (
							<div
								key={item.product.slug + item.size}
								className='flex mb-5'
							>
								<Image
									className='rounded mr-5'
									src={`/products/${item.product.ProductImage[0].url}`}
									width={100}
									height={100}
									alt={item.product.title}
									style={{
										width: '100px',
										height: '100px',
									}}
								/>
								<div>
									<p> {item.product.title}</p>
									<p> ${item.price} x 3 </p>
									<p className='font-bold'>Subtotal: ${item.price * 3} </p>

									<button className='underline mt-3'> Remover </button>
								</div>
							</div>
						))}
					</div>
					{/* checkout - Resumen */}
					<div className='bg-white rounded-xl shadow-xl p-7'>
						<h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
						<div className='mb-10'>
							<p className='text-xl '>
								{address!.firstName} {address!.lastName}
							</p>
							<p>{address!.address}</p>
							<p>{address!.address2}</p>
							<p>{address!.postalCode}</p>
							<p>
								{address!.city}, {address?.countryId}
							</p>
							<p>{address!.phone}</p>
						</div>

						{/* divider */}
						<div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

						<h2 className='text-2xl mb-2'>Resumen</h2>
						<div className='grid grid-cols-2'>
						<span>No.Productos</span>
				<span className='text-right'>
					{' '}
					{order?.itemsInOrder === 1 ? ' 1 artículo' : `${order?.itemsInOrder} artículos`}
				</span>

				<span>Subtotal</span>
				<span className='text-right'> {currencyFormater(order!.subtotal)}</span>

				<span>Impuestos 21%</span>
				<span className='text-right'> {currencyFormater(order!.tax)}</span>

				<span className='mt-5 text-2xl'>Total</span>
				<span className='text-right mt-5 text-2xl'>
					{' '}
					{currencyFormater(order!.total)}
				</span>
						</div>
						<div className='mt-5 mb-2 w-full'>
						{order?.isPaid ? 		<OrderStatus isPaid={order!.isPaid} />: <PaypalButton amount={order!.total} orderId={order!.id} />}
							{/* <div
								className={clsx(
									'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
									{
										'bg-red-500': false,
										'bg-green-700': true,
									}
								)}
							>
								<IoCardOutline size={30} />
								
								<span className='mx-2'> 			{order!.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
