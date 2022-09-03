import { PictureObject } from '@/types/objects/picture';

export declare module ProductObject {
  type Status = 'active' | 'inactive';
}

export type ProductObject = {
  id: string;
  store_id: string;
  title: string;
  description: string;
  price: number;
  pictures: PictureObject[];
  status: ProductObject.Status;
};
