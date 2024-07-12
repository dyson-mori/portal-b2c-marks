import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ProductsProps } from '@/global/interfaces';

import { Button, Input } from '@/components';

import { Container, Row } from './styles';

import { Delivery, Ellipse, Routing, Text, User } from '@/assets/svg/icons';

interface Props {
  data: ProductsProps;
  setCard: (s: boolean) => void;
};

const schema = yup.object().shape({
  first_name: yup.string().required('Nome é obrigatório'),
  last_name: yup.string().required('Nome é obrigatório'),
  // sector: yup.string(),
  // phone: yup
  //   .string()
  //   .nullable()
  //   .min(10, 'Campo deve conter ao menos 10 dígitos')
  //   .max(11, 'Campo deve conter no máximo 11 dígitos')
  //   .test({
  //     message: 'Número inválido',
  //     test: (value) =>
  //       value ? phoneValidate.isValid(maskHelper.number(value)) : true,
  //   }),
  // whatsapp: yup
  //   .string()
  //   .required('WhatsApp é obrigatório')
  //   .min(11, 'Campo deve conter ao menos 11 dígitos')
  //   .test({
  //     message: 'Número inválido',
  //     test: (value) =>
  //       value ? phoneValidate.isValid(maskHelper.number(value)) : false,
  //   }),
  // email: yup
  //   .string()
  //   .email('E-mail inválido')
  //   .required('E-mail é obrigatório'),
});

type SchemaProps = yup.InferType<typeof schema>;

const FormScreen: React.FC<Props> = ({ data, setCard }) => {
  const route = useRouter();

  const { handleSubmit, setValue } = useForm<SchemaProps>({
    // resolver: yupResolver(schema)
  });

  const onSubmit = (form) => {
    route.push(`/success?id=${data.id}`);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input.Root>
          <Input.Icon icon={User} />
          {/* <Input.Input placeholder='First Name' /> */}
          <Input.Input placeholder='First Name' name='first_name'  onChange={evt => setValue('first_name', evt.target.value)}/>
        </Input.Root>
        &nbsp;
        <Input.Root>
          <Input.Icon icon={User} />
          <Input.Input placeholder='Last Name' name='last_name' onChange={evt => setValue('last_name', evt.target.value)} />
        </Input.Root>
      </Row>

      <div style={{ height: 10 }} />
      <Input.Root>
        <Input.Icon icon={Delivery} />
        <Input.Input placeholder='(xx)-x-xxxx-xxxx' />
      </Input.Root>

      <div style={{ height: 10 }} />
      <Input.Root>
        <Input.Icon icon={Delivery} />
        <Input.Input placeholder='000000-000' name='zipcode' />
      </Input.Root>

      <div style={{ height: 10 }} />
      <Input.Root>
        <Input.Icon icon={Routing} />
        <Input.Input placeholder='MG - Belo Horizonte - Nova Lima - Rua das Acácias - ' />
      </Input.Root>

      <div style={{ height: 10 }} />
      <Input.Root>
        <Input.Icon icon={Text} />
        <Input.Input placeholder='Description' />
      </Input.Root>

      <div style={{ textAlign: 'center', marginTop: 5 }}>
        <Image src={Ellipse} width={20} height={20} alt='ellipse' />
      </div>

      <Row>
        <Input.Root>
          <Input.Icon icon={User} />
          <Input.Input placeholder='Credit Card Name' name='credit_card_name' />
        </Input.Root>
        &nbsp;
        <Input.Root>
          <Input.Icon icon={User} />
          <Input.Input placeholder='Expiration Date' name='expiration_date' />
        </Input.Root>
      </Row>

      <div style={{ height: 10 }} />
      <Input.Root>
        <Input.Icon icon={User} />
        <Input.Input placeholder='0000-0000-0000-0000' name='document_number' />
      </Input.Root>

      <div style={{ height: 10 }} />
      <Button type='submit' value='submit'>Buy now</Button>
      <div style={{ height: 10 }} />
      <Button secondary onClick={() => setCard(false)}>back</Button>
    </Container>
  )
};

export { FormScreen };