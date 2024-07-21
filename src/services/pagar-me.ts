import pagarme from 'pagarme/browser';

interface Props {
	paramUrl: string;
};

export const pagarme = ({ paramUrl }: Props) => {
  const res = fetch(`https://api.pagar.me/core/v5${paramUrl}`, {
		method: 'POST',
	})
};