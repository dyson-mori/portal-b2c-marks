const brazilianPhoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})[- ]?(\d{4})$/;

export const formats = {
  money: (value: number) => {
    const verify = String(value).split('.')[1]?.length === 1;
    let v = String(value);

    if (Number.isInteger(value)) v = Number(v).toFixed(2);

    v = v.replace(/\D/g, '') + `${verify ? '0' : ''}`;
    v = String((Number(v) / 100).toFixed(2));
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');

    return `R$ ${v}`;
  },

  cpf: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  cep: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 8) {
      return digits.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    return e;
  },

  formatDecimal(value: string){
    let v = value.replace(/\D/g, '');
    v = `${(Number(v) / 100).toFixed(2)}`;
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2');
    return v;
  },

  phoneNumber: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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