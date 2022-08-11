import { ColorEntity } from 'src/modules/color/entitis/color.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import { WareHouseEntity } from '../entities/warehouse.entity';
import { pick } from 'lodash';

export class WareHouseDto {
  id: number;
  id_product: number;
  product: ProductEntity;
  id_size: number;
  size: SizeEntity;
  id_color: number;
  color: ColorEntity;
  amount: number;
  constructor(init?: WareHouseEntity) {
    if (init) {
      Object.assign(this, pick(init, ['size', 'color', 'amount']));
    }
  }
}
