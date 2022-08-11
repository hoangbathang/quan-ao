import { CategoryEntiy } from '../entities/category.entity';
import { pick } from 'lodash';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
export class CategoryDto {
  id: number;
  name: string;

  menu: MenuEntity;

  menu_id: number;

  product: ProductEntity[];
  menu_url: string;
  constructor(init?: CategoryEntiy) {
    if (init) {
      Object.assign(this, pick(init, ['id', 'name']));
      this.menu_url = init.menu.url;
    }
  }
}
