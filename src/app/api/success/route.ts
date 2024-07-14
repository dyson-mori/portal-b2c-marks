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