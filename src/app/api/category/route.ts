import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

export async function GET(request: NextRequest) {
  const product = await prisma.category.findMany();

  if (!product) {
    throw new Error('Product Server Error')
  };

  return NextResponse.json(product);
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const product = await prisma.category.create({
    data: {
      name: body.name,
    }
  });

  if (!product) {
    throw new Error('Product Server Error')
  };

  return NextResponse.json(true);
};