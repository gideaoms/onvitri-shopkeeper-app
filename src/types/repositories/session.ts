import { Either } from '@/either';
import { User } from '@/types/user';

export type ISessionRepository = {
  findOne(token: string): Promise<Either<Error, User>>;
  create(email: string): Promise<Either<Error, void>>;
  activate(email: string, validationCode: string): Promise<Either<Error, User>>;
};
