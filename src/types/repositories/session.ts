import { Either } from '@/either';
import { User } from '@/types/user';

export type ISessionRepository = {
  findOne(token: string): Promise<Either<Error, User>>;
  create(email: string, password: string): Promise<Either<Error, User>>;
};
