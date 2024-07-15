const brazilianPhoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})[- ]?(\d{4})$/;

export const formats = {
  money: (evt: string) => {
    const price = evt.replace(/\D/g, '');

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(String(Number(price) / 100)));
  },
  cpf: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 11) {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    return e;
  },

  cep: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 8) {
      return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    return e;
  },

  phoneNumber: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    let result = e;

    if (digits.length === 2) {
      result = digits.replace(/(\d{2})/, '($1)');
    } else if (digits.length === 10) {
      result = digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 11) {
      result = digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };
  
    return result;
	},

  document_number: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 16) {
      return digits.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    };

    return e;
  }
};

/*
  fetch(`https://api.postmon.com.br/v1/cep/${evt.target.value}`)
    .then(jsn => jsn.json())
    .then((success: any) => setCep({ ...cep, ...success }))
  }}
*/