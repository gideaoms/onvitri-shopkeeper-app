import zustand from 'zustand';
import immer from 'immer';
import { Store } from '@/types/store';
import { StoreModel } from '@/models/store';

const storeModel = StoreModel();

export const useStore = zustand<{
  store: Store;
  setStore(store: Store): void;
}>((set) => ({
  store: storeModel.empty(),
  setStore: (store) =>
    set((context) =>
      immer(context, (draft) => {
        draft.store = store;
      }),
    ),
}));
