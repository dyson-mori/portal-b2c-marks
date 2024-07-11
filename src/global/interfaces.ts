export type ProductsProps = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  files: {
    url: string;
    width: number;
    height: number;
  }[];
};