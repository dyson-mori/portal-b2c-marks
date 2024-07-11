import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";
import { Product } from "@prisma/client";

import data from '../../../services/mock.json';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  
  const find = data.find(t => t.id === id);
  
  return NextResponse.json(find);
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData) as unknown as Product;

  const file = formData.get("file") as File;

  // const product = await prisma.product.create({
  //   data: {
  //     name: body.name,
  //     description: body.name,
  //     price: body.price,
  //     category_id: body.category_id
  //   }
  // });

  // if (!product) {
  //   throw new Error('Product Server Error')
  // };

  console.log(file);

  return NextResponse.json(body);
};