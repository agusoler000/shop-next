import { initialData } from './seed';
import prisma from '../lib/prisma';
import { countries } from './seed-countries';

async function main() {
	// 1 BORRAR DATOS
	await prisma.orderAddress.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();

	log('borrando users countries', true);
	await prisma.country.deleteMany();
	log('borrando users ddbb', true);
	await prisma.user.deleteMany();
	log('borrando imagenes ddbb', true);
	await prisma.productImage.deleteMany();
	log('borrando productos ddbb', true);
	await prisma.product.deleteMany();
	log('borrando categorias ddbb', true);
	await prisma.category.deleteMany();

	log('Datos Borrados correctamente ☑ ');

	await prisma.country.createMany({data:countries})

	const { categories, products, users } = initialData;
	//ADD users
	log('Agregando users ', true);


	await prisma.user.createMany({ data: users });
	log('Users agregados ☑ ');
	//ADD CATEGORIES
	log('Agregando categorias Categorias', true);

	const categoriesData = categories.map(category => ({
		name: category,
	}));
	await prisma.category.createMany({ data: categoriesData });
	log('Categorias agregadas ☑ ');

	log('Cargando categorias desde la DB', true);
	const categoriesDb = await prisma.category.findMany();
	log('Categorias cargadas ☑ ');

	log('Mapeando categorias para los productos', true);
	const categoriesMap = categoriesDb.reduce((map, category) => {
		map[category.name.toLowerCase()] = category.id;
		return map;
	}, {} as Record<string, string>); //<string= categoryText, string=categoryId>
	log('productos mapeados ☑ ');

	log('comenzando la carga de productos');
	products.forEach(async product => {
		const { type, images, ...rest } = product;
		const mensajeInicial = `Creacion de producto ${product.title} en db`;
		log(mensajeInicial, true);
		const dbProduct = await prisma.product.create({
			data: { ...rest, categoryId: categoriesMap[type] },
		});
		// Insertar imagenes
		log(
			`producto ${product.title} se le asigno el id ${dbProduct.id}, añadido correctamente ☑`
		);

		log('Añadiendo imagenes al producto', true);
		const imagesData = images.map(image => ({
			url: image,
			productId: dbProduct.id,
		}));
		await prisma.productImage.createMany({
			data: imagesData,
		});
		log(`se añadieron las imagenes al producto ${dbProduct.id} ☑`);
		log(`se creo correctamente el producto ${dbProduct.id} ☑`);
	});

    setTimeout(() => {
        console.log('Seed Ejecutado Correctamente');
        console.log('---------------------------------------');
        console.warn('Muchas gracias por contratar nuestros servicios - Agustin Soler S.A.')
        
    }, 5000);
}

(() => {
	main();
})();

function log(message: string, loading = false) {
	console.log('---------------------------------------');
	if (loading) {
		console.log('[           0%]');
		console.log('[==        15%]');
		console.log('[====      45%]');
		console.log('[======    70%]');
		console.log('[======== 100%]');
	}
	console.log(message);
	console.log('---------------------------------------');
}
