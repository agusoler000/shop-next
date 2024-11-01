import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
	cart: CartProduct[];

	getTotalItems: () => number;
    getSummaryInformation:() =>  {
        subtotal: number;
        tax: number;
        total: number;
        itemInCart: number;
    };
	addProductToCart: (product: CartProduct) => void;
	updateProductQuantity: (Product: CartProduct, quantity: number) => void;
	// addProductToCart
	removeProduct: (product: CartProduct) => void;
	clearCart: () => void;
	// removeProduct
}

export const useCartStore = create<State>()(
	persist(
		(set, get) => ({
			cart: [],
			getTotalItems: () => {
				const { cart } = get();
				return cart.reduce((total, item) => total + item.quantity, 0);
			},
            getSummaryInformation: ()=>{
                const {cart} = get()
                const subtotal = cart.reduce((subtotal,item)=> subtotal + (item.quantity * item.price) , 0);
                const tax = subtotal * 0.21;
                const total = subtotal + tax;
                const itemInCart = cart.reduce((total, item) => total + item.quantity, 0);
                return {
                    subtotal,
                    tax,
                    total,
                    itemInCart}

            },
			addProductToCart: (product: CartProduct) => {
				const { cart } = get();
				//Verificar si el producto existe en el carrito con la talla seleccioanda
				const productInCart = cart.some(
					e => e.id === product.id && e.size === product.size
				);
				if (!productInCart) {
					return set({ cart: [...cart, product] });
				}
				// Se que el producto exite por talla;
				const updatedCartProducts = cart.map(item => {
					if (item.id === product.id && product.size === item.size) {
						return { ...item, quantity: item.quantity + product.quantity };
					}
					return item;
				});
				return set({ cart: updatedCartProducts });
			},

			updateProductQuantity: (product: CartProduct, quantity: number) => {
				console.log({ product, quantity });

				const { cart } = get();
				const updatedCart = cart.map(p => {
					if (p.id === product.id && p.size === product.size) {
						return { ...p, quantity };
					}
					return p;
				});

				return set({ cart: updatedCart });
			},
			removeProduct: (product: CartProduct) => {	
				const { cart } = get();
				const updatedCart = cart.filter(p => (p.id !== product.id || p.size !== product.size));

				return set({ cart: updatedCart });
			},
			clearCart:()=>{
				set({cart:[]})
			}
		}),
		{
			name: 'shopping-cart',
		}
	)
);
