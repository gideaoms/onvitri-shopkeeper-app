import { Store } from '@/types/store';

export function StoreModel() {
  function empty() {
    const store: Store = {
      id: '',
      fantasyName: '',
      neighborhood: '',
      number: '',
      street: '',
    };
    return store;
  }

  return {
    empty: empty,
  };
}
