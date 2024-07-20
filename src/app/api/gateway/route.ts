import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

const data: any = [];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  return NextResponse.json([]);
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const product = await prisma.product.findFirst({
    where: {
      id: body.product_id!
    },
    include: {
      files: true,
      category: true
    }
  });

  const result = {
    ...data[0],
    product_id: body.product_id,
    product,
    created_at: '2024-07-13T15:08:09.545Z'
  };

  return NextResponse.json(result);
};