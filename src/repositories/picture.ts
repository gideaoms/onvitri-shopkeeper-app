import { AxiosError } from 'axios';
import { failure, success } from '@/either';
import { BadRequestError } from '@/errors/bad-request';
import { PictureMapper } from '@/mappers/picture';
import { Picture } from '@/types/picture';
import { IProductRepository } from '@/types/repositories/picture';
import { http } from '@/libs/axios';
import { PictureObject } from '@/types/objects/picture';

export function PictureRepository(): IProductRepository {
  const pictureMapper = PictureMapper();

  async function create(variant: Picture.Variant) {
    try {
      const form = new FormData();
      form.append('picture', {
        uri: variant.url,
        name: variant.name,
        type: `image/${variant.ext}`,
      } as any);
      const result = await http.post<PictureObject>('pictures', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return success(pictureMapper.fromObject(result.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  return {
    create: create,
  };
}
