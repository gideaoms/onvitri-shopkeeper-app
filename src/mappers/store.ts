import { StoreObject } from '@/types/objects/store';
import { Store } from '@/types/store';

export function StoreMapper() {
  function fromObject(object: StoreObject) {
    const store: Store = {
      id: object.id,
      fantasyName: object.fantasy_name,
      neighborhood: object.neighborhood,
      number: object.number,
      street: object.street,
    };
    return store;
  }

  return {
    fromObject: fromObject,
  };
}
