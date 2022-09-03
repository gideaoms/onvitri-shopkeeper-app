import { Picture } from '@/types/picture';

export declare namespace Product {
  type Status = 'active' | 'inactive';
  type Price = {
    cents: number;
    formatted: string;
  };
}

export type Product = {
  id: string;
  storeId: string;
  title: string;
  description: string;
  price: Product.Price;
  status: Product.Status;
  pictures: Picture[];
};
