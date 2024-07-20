import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";
import { Aside, Category } from "@prisma/client";

export async function GET() {
  const product = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      _count: true
    }
    // include: {
    //   product: true,
    // }
  });

  if (!product) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(product);
};

export async function POST(request: NextRequest) {
  const body = await request.json() as { category: string };

  const category = await prisma.category.create({
    data: {
      name: body.category,
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};