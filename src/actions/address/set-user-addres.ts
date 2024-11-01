'use server';

import { Address } from '@/interfaces/address.interface';
import prisma from '@/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
	try {
        const newaddress = await createOrReplaceAddres(address,userId)
        return {
            ok:true,
            address:newaddress
        }
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Error 400- Frankito Request',
		};
	}
};

const createOrReplaceAddres = async (address: Address, userId: string) => {
	try {
		const storeAddress = await prisma.userAddress.findUnique({
			where: { userId },
		});
        const addressToSave = {
            address:address.address,
            address2:address.address2,
            countryId:address.country,
            firstName:address.firstName,
            lastName:address.lastName,
            phone:address.phone,
            postalCode:address.postalCode,
            userId: userId,
            city:address.city
        }
		if (!storeAddress) {
			const newAddress = await prisma.userAddress.create({
				data: addressToSave,
			});
            return newAddress;
		}

        const updatedAddress = await prisma.userAddress.update({
            where:{
                userId:userId
            },
            data:addressToSave
        })
        return updatedAddress
	} catch (error) {
		console.log(error);
		throw new Error("address couldn't be saved");
	}
};
