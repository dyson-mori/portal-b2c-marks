import { CategoryProps, ProductsProps } from '@/global/interfaces';
import * as yup from 'yup';

export const schema = yup.object().shape({
  isLoading: yup.boolean().notRequired(),
  haveNewFile: yup.boolean().notRequired(),

  id: yup.string(),

  title: yup.string().required('Required fields'),

  price: yup.number()
    .test('is-decimal','invalid decimal', value => !!String(value).includes('.'))
    .required('Required fields'),

  description: yup.string().required('Required fields'),

  category: yup.array().required('Required fields'),

  files: yup.array().of(
    yup.object({
      id: yup.string(),
      file: yup.mixed(),
      url: yup.string().required()
    })
  ).required('Required fields')
});

export type SchemaProps = yup.InferType<typeof schema>;
export type RegisterEditProps = {
  isUpdate: boolean;
  product: ProductsProps | null;
  categories: CategoryProps[];
};