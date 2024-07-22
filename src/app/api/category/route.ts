import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";
import { Category } from "@prisma/client";

export async function GET() {
  const product = await prisma.category.findMany({
    orderBy: {
      title: 'asc'
    },
    include: {
      _count: true
    }
  });

  if (!product) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(product);
};

export async function POST(request: NextRequest) {
  const body = await request.json() as { title: string };
  
  const category = await prisma.category.create({
    data: {
      title: body.title,
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;
  const body = await request.json() as Category;
  
  const category = await prisma.category.update({
    where: {
      id
    },
    data: {
      title: body.title,
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") as string;

  const category = await prisma.category.delete({
    where: {
      id
    },
  });

  if (!category) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(true);
};