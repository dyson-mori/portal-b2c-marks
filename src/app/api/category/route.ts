import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

export async function GET() {
  const product = await prisma.category.findMany({
    include: {
      product: true
    }
  });

  if (!product) {
    throw new Error('Category Server Error')
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
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};