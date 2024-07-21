import { prisma } from "@/services/prisma";
import { Address, Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const data: any = [];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  return NextResponse.json([]);
};

export async function POST(request: NextRequest) {
  const body = await request.json() as Address & Product & { products: any[] };

  const address = await prisma.address.create({
    data: {
      cep: body.cep,
      city: body.city,
      neighborhood: body.neighborhood,
      state: body.state,
      street: body.street,
      description: body.description,
      phone: body.phone,
      number: body.address,
      firstname: '',
      lastname: '',
      code_address: `${Math.random() * 100}-${Math.random() * 100}-${Math.random() * 100}-${Math.random() * 100}`
    }
  });

  if (!address) {
    throw new Error('Product Server Error');
  };

  console.log(body.products);

  const purchase = await prisma.purchase.create({
    data: {
      address_id: address.id,
      product: {
        connect: body.products.map(fk => ({ id: fk.id }))
      }
    }
  });

  if (!purchase) {
    throw new Error('Product Server Error');
  };

  return NextResponse.json(true);
};