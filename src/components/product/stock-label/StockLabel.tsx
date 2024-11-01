'use client';
import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
	slug: string;
}

export const StockLabel = ({ slug }: Props) => {
	const [stock, setstock] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	useEffect(() => {
		const getStock = async () => {
			try {
				const stock = await getStockBySlug(slug);
				setstock(stock);
				console.log(stock);
				setIsLoading(false);
				return stock;
			} catch (error) {
				console.log(error);
			}
		};
		getStock();
	}, [slug]);



	return (
		<>
			{isLoading ? (
				<h1
					className={`${titleFont.className} antialiased font-bold text-xl animate-pulse bg-gray-200`}
				>   
                    Cargando...
					&nbsp;
				</h1>
			) : (
				<h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
					Stock: {stock}
					&nbsp;
				</h1>
			)}
		</>
	);
};
