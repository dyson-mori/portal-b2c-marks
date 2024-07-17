import * as yup from 'yup';

const brazilianPhoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})[- ]?(\d{4})$/;

const schema = yup.object().shape({
  full_name: yup.string().required('Field Required').min(6, 'Too short'),
  phone: yup.string().matches(brazilianPhoneRegExp, 'Phone number is not valid'),
  cpf: yup.string().required('Field Required'),
  cep: yup
    .string()
    .required('Field Required')
    // .transform((value) => {
    //   console.log({ value });
    // })
    .test('address', 'address not found', async (value) => {
      // const res = await fetch(`https://api.postmon.com.br/v1/cep/${value}`, { method: 'GET' });
      // const success = await res.json();
      return true
    }),
  address: yup.string().required('Field Required'),
  description: yup.string().required('Field Required'),
  credit_card_name: yup.string().required('Field Required'),
  expiration_date: yup.string().required('Field Required'),
  document_number: yup.string().required('Field Required').max(16, 'Must be exactly 16 characters').test('len', 'Must be exactly 16 characters', val => val.length === 16),
});

type schemaProps = yup.InferType<typeof schema>;

export {
  schema,
  type schemaProps
}