import { Either } from '@/either';
import { City } from '@/types/city';
import { Store } from '@/types/store';
import { FindMany, ListOf } from '@/utils';

export type IStoreRepository = {
  findMany(page: number): Promise<Either<Error, FindMany<ListOf<Store & { city: City }>>>>;
};
