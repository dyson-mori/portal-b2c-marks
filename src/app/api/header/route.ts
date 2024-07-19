// console.log(process.env.VITE_SERGIO_ENVIRONMENT_VARIABLE);
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

export async function GET() {
  // const product = await prisma.category.findMany({
  //   include: {
  //     product: true
  //   }
  // });

  const header = [
    {
      href: '/products',
      label: 'Products',
      public: true
    },
    {
      href: '/panel',
      label: 'Panel',
      public: false
    },
    {
      href: '/tracking',
      label: 'Rastreamento',
      public: true
    }
  ];

  if (!header) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(header);
};