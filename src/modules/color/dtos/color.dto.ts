import { pick } from 'lodash';
import { ColorEntity } from '../entitis/color.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
export class ColorDto {
  id: number;
  id_color: number;
  id_product: number;
  color: ColorEntity;

  product: ProductEntity;
  constructor(init?: ColorEntity) {
    if (init) {
    }
  }
}
