import { prisma } from "@/services/prisma";
import { Address, Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const data: any = [];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  const purchase = await prisma.purchase.findFirst({
    where: { id },
    include: {
      product: {
        include: {
          files: true
        }
      }
    }
  });

  if (!purchase) {
    throw new Error('Product Server Error');
  };

  return NextResponse.json(purchase);
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
    }
  });

  if (!address) {
    throw new Error('Product Server Error');
  };

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

  return NextResponse.json(purchase);
};