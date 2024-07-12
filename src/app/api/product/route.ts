import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const product = await prisma.product.findFirst({
    where: {
      id: id!
    },
    include: {
      files: true
    }
  });

  return NextResponse.json(product);
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      category_id: body.category_id
    }
  });

  if (!product) {
    throw new Error('Product Server Error')
  };

  return NextResponse.json(product);
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const data = await prisma.product.delete({
    where: {
      id: `${id}`,
    },
  });

  if (!data) {
    throw new Error('Register failed');
  };

  return NextResponse.json(`Question [${data.name}] has been deleted`);
};