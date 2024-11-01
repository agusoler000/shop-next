export const currencyFormater = (val: number) => {
	return new Intl.NumberFormat('es-Es', {
		currency: 'EUR',
        style:'currency',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(val);
};
