import { ISessionRepository } from '@/types/repositories/session';
import { http } from '@/libs/axios';
import { UserMapper } from '@/mappers/user';
import { failure, success } from '@/either';
import { UserObject } from '@/types/objects/user';
import { AxiosError } from 'axios';
import { BadRequestError } from '@/errors/bad-request';

export function SessionRepository(): ISessionRepository {
  const userMapper = UserMapper();

  async function findOne(token: string) {
    try {
      const result = await http.get<UserObject>('sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return success(userMapper.fromObject(result.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  async function create(email: string) {
    try {
      await http.post<UserObject>('sessions', { email: email });
      return success(undefined);
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  async function activate(email: string, validationCode: string) {
    try {
      const result = await http.put<UserObject>('sessions/activate', {
        email: email,
        validation_code: validationCode,
      });
      return success(userMapper.fromObject(result.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        return failure(new BadRequestError(err.response?.data.message));
      }
      throw err;
    }
  }

  return {
    findOne: findOne,
    create: create,
    activate: activate,
  };
}
