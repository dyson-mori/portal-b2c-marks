import { prisma } from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

const data = [
  {
    id: 'clyi4fh020011jkddtbumvcfz',
    address_id: 'clyi4fib70013jkddedcjr4az',
    address: {
      first_name: 'Sergio',
      middle_name: 'Junio',
      last_name: 'Leal',
      phone: '31975564133',
      cpf: '14243099642',
      cep: '32310370',
      address: '920',
      description: 'testing description',
      credit_card_name: 'sergio',
      expiration_date: '123',
      document_number: '0000000000000000'
    },
    product_id: 'edc99f5b-ba98-472c-860b-6375ecbada94',
    product: {
      "id": "edc99f5b-ba98-472c-860b-6375ecbada94",
      "name": "Alina Becker",
      "description": "Hi, I’m Alina and here you’ll find all my spicy photos and videos (ღ˘⌣˘ღ)  hottest content in my ੈ♡PPVs✩‧₊˚ so make sure to DM me ;)  You can tip me for a faster reply (❤ω❤)",
      "price": "350.25",
      "created_at": "2024-07-13T19:23:57.179Z",
      "files": [
        {
          "id": "clykim9bv0001x9due7pxdb8o",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/2-alina_becker.png_vuusdn",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898640/community/upload-test/2-alina_becker.png_vuusdn.png",
          "width": "806",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimauq0003x9ducsicaybg",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/1-alina_becker_etehha",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898642/community/upload-test/1-alina_becker_etehha.png",
          "width": "863",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimcfh0005x9duse04g0b4",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/3-alina_becker.png_dwugke",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898644/community/upload-test/3-alina_becker.png_dwugke.png",
          "width": "809",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimdxf0007x9dubrc1ochs",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/4-alina_becker.png_rznq9m",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898646/community/upload-test/4-alina_becker.png_rznq9m.png",
          "width": "807",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimfew0009x9dus0nhjncy",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/5-alina_becker.png_nxiwvg",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898648/community/upload-test/5-alina_becker.png_nxiwvg.png",
          "width": "815",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimgsz000bx9duq32hq8s5",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/6-alina_becker.png_yz3bbz",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898650/community/upload-test/6-alina_becker.png_yz3bbz.png",
          "width": "814",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimic6000dx9duwcqqeq6a",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/7-alina_becker.png_ankisz",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898652/community/upload-test/7-alina_becker.png_ankisz.png",
          "width": "814",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimk16000fx9dukufvuavy",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/8-alina_becker.png_lgifjv",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898654/community/upload-test/8-alina_becker.png_lgifjv.png",
          "width": "801",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        },
        {
          "id": "clykimlj0000hx9dus4m7227a",
          "product_id": "edc99f5b-ba98-472c-860b-6375ecbada94",
          "cloudinary_id": "community/upload-test/9-alina_becker.png_bdoixz",
          "url": "https://res.cloudinary.com/dyrtdrnky/image/upload/v1720898656/community/upload-test/9-alina_becker.png_bdoixz.png",
          "width": "813",
          "height": "1080",
          "code": "Alina Becker_0.4710328486453179"
        }
      ]
    },
  }
];

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const product = data.find(product => product.id === id);

  return NextResponse.json(product);
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