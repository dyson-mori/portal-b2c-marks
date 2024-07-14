import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import { ProductsProps } from '@/global/interfaces';
import { Button, Input } from '@/components';
import { Delivery, Ellipse, Routing, Text, User, TextAlignLeft, Mobile } from '@/assets/svg/icons';
import { formats } from '@/helpers/format';

import { Container, Row } from './styles';

interface Props {
  data: ProductsProps;
  setCard: (s: boolean) => void;
};

const phoneRegExp = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/;

const phoneSchema = yup.string()
  .matches(phoneRegExp, 'Phone number is not valid')
  .transform(function (value, originalValue) {
    // Remove all non-digit characters
    const digits = originalValue.replace(/\D/g, '');

    // Format the phone number, e.g., (123) 456-7890
    if (digits.length === 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    return originalValue;
  });

const schema = yup.object().shape({
  first_name: yup.string().required('Nome é obrigatório'),
  middle_name: yup.string().required('Nome é obrigatório'),
  last_name: yup.string().required('Nome é obrigatório'),
  // sector: yup.string(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .transform(function (value, originalValue) {
      const digits = originalValue.replace(/\D/g, '');
      if (digits.length >= 10) {
        return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }
      return originalValue;
    }),

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

  const { control, handleSubmit, setValue } = useForm<SchemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: ''
    }
  });

  const onSubmit = (form) => {
    console.log(form);
    
    // route.push(`/success?id=${data.id}`);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
          <Input.Input placeholder='First Name' onChange={evt => setValue('first_name', evt.target.value)}/>
        </Input.Root>
        &nbsp;
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
          <Input.Input placeholder='Middle Name' onChange={evt => setValue('middle_name', evt.target.value)}/>
        </Input.Root>
        &nbsp;
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
          <Input.Input placeholder='Last Name' onChange={evt => setValue('last_name', evt.target.value)} />
        </Input.Root>
      </Row>

      <div style={{ height: 5 }} />
      <Row>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input.Root>
              <Mobile width={15} height={20} stroke="#47C747" strokeWidth={2} />
              <Input.Input
                id='phone'
                name='phone'
                type='text'
                value={phoneSchema.cast(value)}
                placeholder='(00) 0 0000 0000'
                // placeholder='(00) 0 0000 0000'
                onBlur={onBlur}
                onChange={e => {
                  const formattedPhone = phoneSchema.cast(e.target.value);
                  setValue('phone', formattedPhone);
                  onChange(e);
                }}
              />
            </Input.Root>
          )}
        />
        &nbsp;
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" strokeWidth={2} />
          <Input.Input placeholder='000.000.000-00' />
        </Input.Root>
      </Row>

      <div style={{ height: 5 }} />
      <Input.Root>
        <Delivery width={20} height={20} fill="#47C747" />
        <Input.Input placeholder='000000-000' name='zipcode' />
      </Input.Root>

      <div style={{ height: 5 }} />
      <Input.Root>
        <Routing width={20} height={20} stroke="#47C747" strokeWidth={2} />
        <Input.Input placeholder='MG - Belo Horizonte - Nova Lima - Rua das Acácias - ' />
      </Input.Root>

      <div style={{ height: 5 }} />
      <Input.Root>
        <TextAlignLeft width={20} height={20} stroke="#47C747" strokeWidth={2} />
        <Input.Input placeholder='Description' />
      </Input.Root>

      <div style={{ textAlign: 'center', marginTop: 5 }}>
        <Ellipse width={40} height={10} />
      </div>

      <Row>
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" />
          <Input.Input placeholder='Name on the card' name='credit_card_name' />
        </Input.Root>
        &nbsp;
        <Input.Root>
          <User width={20} height={20} stroke="#47C747" />
          <Input.Input placeholder='CVC' name='expiration_date' />
        </Input.Root>
      </Row>

      <div style={{ height: 5 }} />
      <Input.Root>
        <User width={20} height={20} stroke="#47C747" />
        <Input.Input placeholder='0000-0000-0000-0000' name='document_number' />
      </Input.Root>

      <div style={{ height: 5 }} />
      <Button type='submit' value='submit'>Buy now</Button>
      <div style={{ height: 5 }} />
      <Button secondary onClick={() => setCard(false)}>back</Button>
    </Container>
  )
};

export { FormScreen };