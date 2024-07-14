export type ProductsProps = {
  id: string;
  name: string;
  description: string;
  price: string;
  files: FilesProps[];
  category: [];
  // category?: CategoryProps[];
  created_at?: Date
};
export interface CategoryProps {
  id: string;
  name: string;
  product?: ProductsProps[]
};
export interface FilesProps {
  id: string;
  product_id: string;
  cloudinary_id: string;
  url: string;
  width: string;
  height: string;
  code: string;
};