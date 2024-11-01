import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
	address: {
		firstName: string;
		lastName: string;
		address: string;
		address2?: string;
		phone: string;
		postalCode: string;
		country: string;
		city: string;
	};
	setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
	persist(
		(set) => ({
			address: {
				firstName: '',
				lastName: '',
				address: '',
				address2: '',
				phone: '',
				postalCode: '',
				country: '',
				city: '',
			},
			setAddress: address => {
				set({ address });
			},
		}),
		{ name: 'address-storage' }
	)
);
