// console.log(process.env.VITE_SERGIO_ENVIRONMENT_VARIABLE);
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/services/prisma";

export async function GET() {
  // const product = await prisma.category.findMany({
  //   include: {
  //     product: true
  //   }
  // });

  const aside = [
    {
      "title": "Conjunto",
      "maxHeight": 50 + 40 * 5,
      "options": []
    },
    {
      "title": "Pulseiras",
      "maxHeight": 50 + 40 * 5,
      "options": []
    },
    {
      "title": "Solitários",
      "maxHeight": 50 + 40 * 3,
      "options": []
    }
  ];

  if (!aside) {
    throw new Error('Category Server Error')
  };

  return NextResponse.json(aside);
};