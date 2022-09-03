import zustand from 'zustand';
import immer from 'immer';
import { Product } from '@/types/product';
import { Store } from '@/types/store';
import { City } from '@/types/city';
import { ListOf } from '@/utils';

export const useProduct = zustand<{
  products: ListOf<Product & { store: Store & { city: City } }>;
  setProducts(products: ListOf<Product & { store: Store & { city: City } }>): void;
}>((set) => ({
  products: [],
  setProducts: (products) =>
    set((context) =>
      immer(context, (draft) => {
        draft.products = products;
      }),
    ),
}));
