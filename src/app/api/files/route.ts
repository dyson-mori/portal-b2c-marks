import { NextRequest, NextResponse } from "next/server";
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import { cloudinary } from "@/services/cloudinary";
import { Files } from "@prisma/client";
import { prisma } from "@/services/prisma";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = (fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: `community/upload-test`, // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      // .catch((error) => {
      //   reject({ success: false, error });
      // });
  });
};

export async function GET(request: NextRequest) {
  const product = await prisma.files.findMany();

  if (!product) {
    throw new Error('Product Server Error')
  };

  return NextResponse.json(product);
};


export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData) as unknown as Files;

  const formDataEntryValues = Array.from(formData.values());

  for (const formDataEntryValue of formDataEntryValues) {
    if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
      const fil = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await fil.arrayBuffer());
      const base64Data = Buffer.from(buffer).toString("base64");

      const image = await uploadToCloudinary(
        `data:${fil.type};base64,${base64Data}`,
        fil.name,
      );

      await prisma.files.create({
        data: {
          url: image.result.secure_url,
          width: `${image.result.width}`,
          height: `${image.result.height}`,
          code: body.code,
          product_id: body.product_id,
        }
      })
    }
  };

  return NextResponse.json(true);
};

// {
//   success: true,
//   result: {
//   result: {
//     asset_id: '8466bbd81822f3bfcdbdf15e16388f25',
//     public_id: 'community/upload-test/7lWKNS6B_vzkeep',
//     version: 1720751387,
//     version_id: 'c485bdf9fd2b22bd2c3def7616d1038f',
//     signature: '450297dfa6e051cf5197ed7ad220eb5caa0e79bf',
//     width: 1080,
//     height: 1346,
//     format: 'jpg',
//     signature: '450297dfa6e051cf5197ed7ad220eb5caa0e79bf',
//     width: 1080,
//     height: 1346,
//     format: 'jpg',
//     resource_type: 'image',
//     created_at: '2024-07-12T02:29:47Z',
//     tags: [],
//     signature: '450297dfa6e051cf5197ed7ad220eb5caa0e79bf',
//     width: 1080,
//     height: 1346,
//     format: 'jpg',
//     width: 1080,
//     height: 1346,
//     format: 'jpg',
//     height: 1346,
//     format: 'jpg',
//     format: 'jpg',
//     resource_type: 'image',
//     created_at: '2024-07-12T02:29:47Z',
//     tags: [],
//     bytes: 239023,
//     type: 'upload',
//     etag: '14c7cdf4fdecd056fe8b919ac9e91e67',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/dyrtdrnky/image/upload/v1720751387/community/upload-test/7lWKNS6B_vzkeep.jpg',
//     secure_url: 'https://res.cloudinary.com/dyrtdrnky/image/upload/v1720751387/community/upload-test/7lWKNS6B_vzkeep.jpg',
//     folder: 'community/upload-test',
//     original_filename: '7lWKNS6B',
//     original_extension: 'jpeg',
//     api_key: '612131724343469'
//   }
// }