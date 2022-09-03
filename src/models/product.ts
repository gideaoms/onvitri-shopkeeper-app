import { Product } from '@/types/product';
import { Picture } from '@/types/picture';

export function ProductModel() {
  function isActive(product: Product) {
    return product.status === 'active';
  }

  function removePicture(product: Product, pictureToRemove: Picture) {
    const newProduct: Product = {
      ...product,
      pictures: product.pictures.filter((picture) => picture.id !== pictureToRemove.id),
    };
    return newProduct;
  }

  function hasPicture(product: Product) {
    return product.pictures.length > 0;
  }

  function addPicture(product: Product, picture: Picture) {
    const newProduct: Product = {
      ...product,
      pictures: [...product.pictures, picture],
    };
    return newProduct;
  }

  function canAddMorePictures(product: Product) {
    const MAX_PICTURES = 6;
    return product.pictures.length < MAX_PICTURES;
  }

  function isValidPrice(product: Product) {
    return product.price.cents >= 1;
  }

  function empty() {
    const product: Product = {
      id: '',
      storeId: '',
      title: '',
      description: '',
      price: { cents: 0, formatted: '' },
      status: 'inactive',
      pictures: [],
    };
    return product;
  }

  return {
    isActive: isActive,
    removePicture: removePicture,
    hasPicture: hasPicture,
    addPicture: addPicture,
    canAddMorePictures: canAddMorePictures,
    isValidPrice: isValidPrice,
    empty: empty,
  };
}
