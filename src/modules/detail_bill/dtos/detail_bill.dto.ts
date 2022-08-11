import { pick } from 'lodash';
import { BillEntity } from 'src/modules/bill/entities/bill.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import { DetailBillEntity } from '../entities/detailbill.entity';

export class GetBillDetailDto {
  id: number;

  amount: number;

  price: number;

  id_bill: number;

  id_warehouse: number;
  bill: BillEntity;
  warehouse: WareHouseEntity;
  url_color: string;
  name_size: string;
  price_product: number;
  name_product: string;
  id_product: number;
  url_product: string;
  constructor(init?: DetailBillEntity) {
    if (init) {
      Object.assign(this, pick(init, ['amount', 'price']));
      this.url_color = init.warehouse.color.url;
      this.name_size = init.warehouse.size.name;
      this.price_product = init.warehouse.product.price;
      this.name_product = init.warehouse.product.name;
      this.id_product = init.warehouse.product.id;
      this.url_product = init.warehouse.product.image[0].url;
    }
  }
}
