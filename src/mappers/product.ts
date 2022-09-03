import { PictureMapper } from '@/mappers/picture';
import { ProductObject } from '@/types/objects/product';
import { Product } from '@/types/product';
import { toCurrency } from '@/utils';

export function ProductMapper() {
  const pictureMapper = PictureMapper();

  function fromObject(object: ProductObject) {
    const product: Product = {
      id: object.id,
      storeId: object.store_id,
      title: object.title,
      description: object.description,
      price: {
        cents: object.price,
        formatted: toCurrency(object.price),
      },
      pictures: object.pictures.map(pictureMapper.fromObject),
      status: object.status,
    };
    return product;
  }

  function toObject(product: Product) {
    const object: ProductObject = {
      id: product.id,
      store_id: product.storeId,
      title: product.title,
      description: product.description,
      price: product.price.cents,
      pictures: product.pictures.map(pictureMapper.toObject),
      status: product.status,
    };
    return object;
  }

  return {
    fromObject: fromObject,
    toObject: toObject,
  };
}
