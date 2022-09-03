import { City } from '@/types/city';
import { CityObject } from '@/types/objects/city';

export function CityMapper() {
  function fromObject(object: CityObject) {
    const city: City = {
      id: object.id,
      name: object.name,
      initials: object.initials,
    };
    return city;
  }

  return {
    fromObject: fromObject,
  };
}
