import { Picture } from '@/types/picture';
import { NoPictureVariantError } from '@/errors/picture';

export function PictureModel() {
  function findVariant(variants: Picture.Variant[], size: Picture.Size) {
    const variant = variants.find((v) => v.size === size);
    if (!variant) throw new NoPictureVariantError();
    return variant;
  }

  return {
    findVariant: findVariant,
  };
}
