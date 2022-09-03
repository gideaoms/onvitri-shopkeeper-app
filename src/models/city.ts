import { City } from '@/types/city';

export function CityModel() {
  function empty() {
    const city: City = {
      id: '',
      name: '',
      initials: '',
    };
    return city;
  }

  return {
    empty: empty,
  };
}
