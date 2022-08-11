import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { ImageEntity } from '../entitis/image.entity';
import { pick } from 'lodash';
export class ImageDto {
  id: number;
  url: string;
  id_product: number;
  product: ProductEntity;
  constructor(init?: ImageEntity) {
    if (init) {
      Object.assign(this, pick(init, ['url']));
    }
  }
}
