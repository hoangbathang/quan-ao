import { UserTypes } from '../account.contant';
import { AccountEntity } from '../entities/account.entity';
import { pick } from 'lodash';

export class GetUserDetailDto {
  firstName: string;

  lastName: string;

  phone: string;

  address: string;
  id: number;

  email: string;

  password: string;

  type?: UserTypes;
  constructor(init?: AccountEntity) {
    if (init) {
      Object.assign(
        this,
        pick(init, [
          'id',
          'email',
          'type',
          'phone',
          'lastName',
          'address',
          'firstName',
        ]),
      );
    }
  }
}
