import { AxiosError } from 'axios';
import { failure, success } from '@/either';
import { BadRequestError } from '@/errors/bad-request';
import { http } from '@/libs/axios';
import { CityMapper } from '@/mappers/city';
import { StoreMapper } from '@/mappers/store';
import { CityObject } from '@/types/objects/city';
import { StoreObject } from '@/types/objects/store';
import { IProductRepository } from '@/types/repositories/product';
import { ListOf } from '@/utils';
import { ProductMapper } from '@/mappers/product';
import { ProductObject } from '@/types/objects/product';
import { Product } from '@/types/product';

export function ProductRepository(): IProductRepository {
  const productMapper = ProductMapper();
  const storeMapper = StoreMapper();
  const cityMapper = CityMapper();

  async function findMany(page: number, storeId: string) {
    try {
      const result = await http.get<ListOf<ProductObject & { store: StoreObject & { city: CityObject } }>>(
        'products',
        { params: { page: page, store_id: storeId } },
      );
      return success({
        hasMore: Boolean(result.headers['x-has-more'] === 'true'),
        items: result.data.map((product) => ({
          ...productMapper.fromObject(product),
          store: {
            ...storeMapper.fromObject(product.store),
            city: cityMapper.fromObject(product.store.city),
          },
        })),
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  async function findOne(productId: string) {
    try {
      const result = await http.get<ProductObject & { store: StoreObject & { city: CityObject } }>(
        `products/${productId}`,
      );
      return success({
        ...productMapper.fromObject(result.data),
        store: {
          ...storeMapper.fromObject(result.data.store),
          city: cityMapper.fromObject(result.data.store.city),
        },
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  async function create(product: Product) {
    try {
      const result = await http.post<ProductObject & { store: StoreObject & { city: CityObject } }>(
        'products',
        productMapper.toObject(product),
      );
      return success({
        ...productMapper.fromObject(result.data),
        store: {
          ...storeMapper.fromObject(result.data.store),
          city: cityMapper.fromObject(result.data.store.city),
        },
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  async function update(product: Product) {
    try {
      const result = await http.put<ProductObject & { store: StoreObject & { city: CityObject } }>(
        `products/${product.id}`,
        productMapper.toObject(product),
      );
      return success({
        ...productMapper.fromObject(result.data),
        store: {
          ...storeMapper.fromObject(result.data.store),
          city: cityMapper.fromObject(result.data.store.city),
        },
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  return {
    findMany: findMany,
    findOne: findOne,
    create: create,
    update: update,
  };
}
