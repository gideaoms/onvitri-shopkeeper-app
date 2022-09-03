import { Either } from '@/either';
import { City } from '@/types/city';
import { Product } from '@/types/product';
import { Store } from '@/types/store';
import { FindMany, ListOf } from '@/utils';

export type IProductRepository = {
  findMany(page: number): Promise<Either<Error, FindMany<ListOf<Product & { store: Store & { city: City } }>>>>;
  findOne(productId: string): Promise<Either<Error, Product & { store: Store & { city: City } }>>;
  create(product: Product): Promise<Either<Error, Product & { store: Store & { city: City } }>>;
  update(product: Product): Promise<Either<Error, Product & { store: Store & { city: City } }>>;
};
