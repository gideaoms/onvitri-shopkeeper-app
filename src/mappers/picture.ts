import { PictureObject } from '@/types/objects/picture';
import { Picture } from '@/types/picture';

export function PictureMapper() {
  function fromObject(object: PictureObject) {
    const picture: Picture = {
      id: object.id,
      isUploading: false,
      variants: object.variants.map((variant) => ({
        url: variant.url,
        name: variant.name,
        ext: variant.ext,
        width: variant.width,
        height: variant.height,
        size: variant.size,
      })),
    };
    return picture;
  }

  function toObject(picture: Picture) {
    const object: PictureObject = {
      id: picture.id,
      variants: picture.variants.map((variant) => ({
        url: variant.url,
        name: variant.name,
        ext: variant.ext,
        width: variant.width,
        height: variant.height,
        size: variant.size,
      })),
    };
    return object;
  }

  return {
    fromObject: fromObject,
    toObject: toObject,
  };
}
