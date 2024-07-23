import * as yup from 'yup';

export const schema = yup.object().shape({
  loading: yup.boolean().notRequired(),

  method: yup.string().required(),
  price: yup.number().required(),
  products: yup.array().of(
    yup.object({
      id: yup.string()
    })
  ).required(),
  full_name: yup.string().required('Field Required').min(6, 'Too short'),
  phone: yup.string().required(),
  cpf: yup.string().required('Field Required'),
  cep: yup
    .string()
    .required('Field Required')
    .test('address', 'address not found', async (value) => {
      return true
    }),

  neighborhood: yup.string(),
  city: yup.string(),
  street: yup.string(),
  state: yup.string(),
  
  address: yup.string().required('Field Required'),
  description: yup.string().required('Field Required'),

  credit_card_name: yup.string().required('Field Required'),
  expiration_date: yup.string().required('Field Required'),
  document_number: yup.string().required('Field Required')
    // .max(16, 'Must be exactly 16 characters').test('len', 'Must be exactly 16 characters', val => val.length === 16),
});

export type schemaProps = yup.InferType<typeof schema>;

export const methodsPayments = [
  {
    id: 'clyp6mut5000ay4iw0rcg2vve',
    title: 'Credit Cart'
  },
  {
    id: 'clyrlct24000ka4h0qjmxm39i',
    title: 'Pix'
  }
];

export const steps = [
  {
    id: 'clyp5g9v30000y4iwb6dw4wfn',
    name: 'Payment Method',
    fields: [
      'method',
      'price'
    ]
  },
  {
    id: 'clyp5wne60009y4iwjkfeobj5',
    name: 'Address',
    fields: [
      'full_name',
      'phone',
      'cpf',
      'cep',
      'address',
      'description'
    ]
  },
  {
    id: 'clyrlct24000ka4h0qjmxm39i',
    name: 'Pix',
    fields: []
  },
  {
    id: 'clyp6mut5000ay4iw0rcg2vve',
    name: 'Credit Cart',
    fields: [
      'credit_card_name',
      'expiration_date',
      'document_number',
    ]
  }
];