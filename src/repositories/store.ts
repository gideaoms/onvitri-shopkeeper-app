import { AxiosError } from 'axios';
import { failure, success } from '@/either';
import { BadRequestError } from '@/errors/bad-request';
import { http } from '@/libs/axios';
import { CityMapper } from '@/mappers/city';
import { StoreMapper } from '@/mappers/store';
import { CityObject } from '@/types/objects/city';
import { StoreObject } from '@/types/objects/store';
import { IStoreRepository } from '@/types/repositories/store';
import { ListOf } from '@/utils';

export function StoreRepository(): IStoreRepository {
  const storeMapper = StoreMapper();
  const cityMapper = CityMapper();

  async function findMany(page: number) {
    try {
      const result = await http.get<ListOf<StoreObject & { city: CityObject }>>('stores', {
        params: { page: page },
      });
      return success({
        hasMore: Boolean(result.headers['x-has-more'] === 'true'),
        items: result.data.map((store) => ({
          ...storeMapper.fromObject(store),
          city: cityMapper.fromObject(store.city),
        })),
      });
    } catch (err) {
      // TODO: o backend pode retornar um 401, 400, 500, etc
      // tenho q verificar qual o código do erro e mostrar a msg adequada
      // ex: se for 401 eu faço log out, se for 400 eu mostro a msg q veio na response
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  return {
    findMany: findMany,
  };
}
