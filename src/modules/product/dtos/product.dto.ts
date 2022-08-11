import { CategoryDto } from 'src/modules/category/dtos/category.dto';
import { ProductEntity } from '../entities/product.entity';
import { pick } from 'lodash';
import { ImageEntity } from 'src/modules/image/entitis/image.entity';
import { ImageDto } from 'src/modules/image/dtos/image.dto';
import { ColorDto } from 'src/modules/color/dtos/color.dto';
import { CategoryEntiy } from 'src/modules/category/entities/category.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import { WareHouseDto } from 'src/modules/warehouse/dtos/warehouse.dto';
import { ColorEntity } from 'src/modules/color/entitis/color.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
export class ListProductDto {
  id: number;
  name: string;
  price: number;
  category_id: number;
  category: CategoryEntiy;
  create_at: Date;
  image: ImageEntity[];
  warehouse: WareHouseEntity[];
  colors: ColorEntity[];
  sizes: SizeEntity[];
  menu: MenuEntity;
  constructor(init?: ProductEntity) {
    if (init) {
      Object.assign(
        this,
        pick(init, ['id', 'name', 'price', 'category_id', 'warehouse']),
      );
      const images = init.image.map((image) => {
        return new ImageDto(image);
      });
      this.image = images;
      this.category = new CategoryDto(init.category);
      // const warehouses = init.warehouse.map(
      //   (warehouse) => new WareHouseDto(warehouse),
      // );
      const colors = init.warehouse.map((warehouse) => warehouse.color);
      const sizes = init.warehouse.map((warehouse) => warehouse.size);
      this.sizes = [
        ...new Map(sizes.map((item) => [item['id'], item])).values(),
      ];
      this.colors = [
        ...new Map(colors.map((item) => [item['id'], item])).values(),
      ];
      this.menu = init.category.menu;
    }
  }
}
