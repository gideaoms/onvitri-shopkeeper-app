import { Either } from '@/either';
import { Picture } from '@/types/picture';

export type IProductRepository = {
  create(variant: Picture.Variant): Promise<Either<Error, Picture>>;
};
