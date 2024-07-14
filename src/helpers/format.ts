export const formats = {
  cpf: () => {},
  phoneNumber: (e: string) => {
		// const regex = /(\d{2})(\d{1})(\d{4})(\d{4})/;

		// if (!regex.test(e)) {
		// 	return;
		// };

		// const value = e.replace(/(\d{2})(\d{2})(\d{1})(\d{4})(\d{5})/, "$1 ($2) $3 $4 $5");

		// console.log(value);

		// return value;
		const cleaned = ('' + e).replace(/\D/g, '');
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			return '(' + match[1] + ') ' + match[2] + '-' + match[3];
		}
		return null;
	},
};