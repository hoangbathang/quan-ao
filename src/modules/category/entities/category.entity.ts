import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ProductEntity } from 'src/modules/product/entities/product.entity';

@Entity('category')
export class CategoryEntiy {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => MenuEntity, (menu) => menu.categorys)
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;
  @Column({ type: 'int' })
  @AutoMap()
  menu_id: number;
  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity[];
}
