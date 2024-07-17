import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";
// import data from '../../../services/mock.json';

export async function GET(request: NextRequest) {
  const product = await prisma.product.findMany({
    include: {
      files: true
    }
  });

  if (!product) {
    throw new Error('Product Server Error');
  };

  return NextResponse.json(product);
};