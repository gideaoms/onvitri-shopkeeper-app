import zustand from 'zustand';
import immer from 'immer';
import { ListOf } from '@/utils';
import { Store } from '@/types/store';
import { City } from '@/types/city';

export const useStore = zustand<{
  stores: ListOf<Store & { city: City }>;
  setStores(stores: ListOf<Store & { city: City }>): void;
}>((set) => ({
  stores: [],
  setStores: (stores) =>
    set((context) =>
      immer(context, (draft) => {
        draft.stores = stores;
      }),
    ),
}));
