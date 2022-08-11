import { pick } from 'lodash';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { DetailBillEntity } from 'src/modules/detail_bill/entities/detailbill.entity';
import { StatusTypes } from '../bill.contants';
import { BillEntity } from '../entities/bill.entity';

export class GetBillDto {
  id: number;

  total: number;

  price: number;

  firstName: string;

  lastName: string;

  phone: string;

  address: string;

  detailBill: DetailBillEntity[];

  id_user: number;

  user: AccountEntity;

  status?: StatusTypes;
  constructor(init?: BillEntity) {
    if (init) {
      Object.assign(
        this,
        pick(init, ['total', 'id', 'price', 'phone', 'address', 'status']),
      );
    }
  }
}
