'use server';
import prisma from '@/lib/prisma';

export const getStockBySlug = async (slug: string): Promise<number> => {
	try {
		const stock = (
			await prisma.product.findFirst({
				where: { slug },
				select: { inStock: true },
			})
		)?.inStock;
		if (!stock || isNaN(stock)) return 0;
		return stock;
	} catch (error) {
		console.log(error);
		return 0;
	}
};
