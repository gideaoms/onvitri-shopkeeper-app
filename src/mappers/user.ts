import { UserObject } from '@/types/objects/user';
import { User } from '@/types/user';

export function UserMapper() {
  function fromObject(object: UserObject) {
    const user: User = {
      id: object.id,
      name: object.name,
      email: object.email,
      roles: object.roles,
      status: object.status,
      token: object.token,
    };
    return user;
  }

  return {
    fromObject: fromObject,
  };
}
