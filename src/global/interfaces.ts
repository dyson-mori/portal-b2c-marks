import { Aside, Category, Product, Files, Purchase } from "@prisma/client";

export type ProductsProps = Product & {
  files: FilesProps[];
  categories: CategoryProps[];
};
export interface CategoryProps extends Category {
  product?: ProductsProps[];
  _count: {
    product: number;
    aside: number;
  };
};

export interface AsideProps extends Aside {
  categories: CategoryProps[];
};

export interface FilesProps extends Files {};

export interface PurchaseProps extends Purchase {};