"use server"

import { revalidateTag } from "next/cache";

import { AsideProps, CategoryProps, ProductsProps } from "@/global/interfaces";

export async function getProductById(id: string): Promise<ProductsProps | null> {
  if (!id) return null;

  const res = await fetch(`${process.env.NEXT_URL}/api/product?id=${id}`, {
    method: 'GET',
    next: {
      tags: ['panel-product']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product by Id');
  };

  return await res.json();
};

export async function getProducts(): Promise<ProductsProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/product`, {
    method: 'GET',
    cache: 'no-store',
    next: {
      tags: ['products']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product Panel')
  };

  return await res.json();
};

export async function getCategories(): Promise<CategoryProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/category`, {
    method: 'GET',
    next: {
      tags: ['categories']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Product by Id')
  };

  return await res.json();
};

export async function getAside(): Promise<AsideProps[]> {
  const res = await fetch(`${process.env.NEXT_URL}/api/aside`, {
    method: 'GET',
    cache: 'no-store',
    next: {
      tags: ['aside']
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Get Aside Error');
  };

  return await res.json();
};

export async function revalidatePanelProduct() {
  await getProducts();
  revalidateTag('products');
};

export async function revalidatePanelCategory() {
  await getCategories();
  revalidateTag('categories');
};

export async function revalidatePanelAside() {
  await getAside()
  revalidateTag('aside')
};