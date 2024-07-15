import { NextRequest, NextResponse } from "next/server";

import { Category, Product } from "@prisma/client";

import { prisma } from "@/services/prisma";
import { cloudinary } from "@/services/cloudinary";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const product = await prisma.product.findFirst({
    where: {
      id: id!
    },
    include: {
      files: true,
      category: true
    }
  });

  return NextResponse.json(product);
};

export async function POST(request: NextRequest) {
  const body = await request.json() as Product & { category: Array<Category> };

  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      category: {
        connect: body.category.map(({ id }) => ({ id }))
      },
    }
  });

  if (!product) {
    throw new Error('Product Server Error');
  };

  return NextResponse.json(product);
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const body = await request.json() as Product & { category: Array<Category> };

  const productCategory = await prisma.product.findFirst({
    where: {
      id: `${id}`
    },
    include: {
      category: true,
      files: true
    }
  });

  const product = await prisma.product.update({
    where: {
      id: `${id}`
    },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      category: {
        disconnect: productCategory?.category.map(({ id }) => ({ id })),
        connect: body.category.map(({ id }) => ({ id })),
      },
    }
  });

  if (!product) {
    throw new Error('Product Server Error');
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
    include: {
      files: true
    }
  });

  if (!data) {
    throw new Error('Register failed');
  };

  for (const key in data.files) {
    if (Object.prototype.hasOwnProperty.call(data.files, key)) {
      const element = data.files[key];
      await cloudinary.uploader.destroy(element.cloudinary_id)
    }
  };

  return NextResponse.json(`Product [${id}] has been deleted`);
};