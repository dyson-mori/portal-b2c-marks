import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 'clyi4fh020011jkddtbumvcfz',
    address_id: 'clyi4fib70013jkddedcjr4az',
    address: {
      first_name: 'Sergio',
      middle_name: 'Junio',
      last_name: 'Leal',
      phone: '31975564133',
      cpf: '14243099642',
      cep: '32310370',
      address: '920',
      description: 'testing description',
      credit_card_name: 'sergio',
      expiration_date: '123',
      document_number: '0000000000000000'
    },
    products: [
      'c379a7d5-738e-4dff-9031-422c62eea430',
      'b2805aa1-0178-4af9-bd4c-7274ed76f9cc',
      '95926e9d-3f3c-43d2-9be2-e88837fbaf10'
    ],
  }
]

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const product = await prisma.product.findMany({
    where: {
      OR: data[0].products.map(id => ({ id }))
    },
    include: {
      files: {
        select: {
          url: true,
          width: true,
          height: true
        }
      }
    }
  })

  return NextResponse.json(product);
};