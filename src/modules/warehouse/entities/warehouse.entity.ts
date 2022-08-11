import { ColorEntity } from 'src/modules/color/entitis/color.entity';
import { DetailBillEntity } from 'src/modules/detail_bill/entities/detailbill.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('warehouse')
export class WareHouseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  id_product: number;
  @ManyToOne(() => ProductEntity, (product) => product.warehouse)
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;
  @Column()
  id_size: number;
  @ManyToOne(() => SizeEntity, (size) => size.warehouse)
  @JoinColumn({ name: 'id_size' })
  size: SizeEntity;
  @Column()
  id_color: number;
  @ManyToOne(() => ColorEntity, (color) => color.warehouse)
  @JoinColumn({ name: 'id_color' })
  color: ColorEntity;
  @Column({ nullable: true })
  amount: number;
  @OneToMany(() => DetailBillEntity, (detailbill) => detailbill.warehouse)
  detailbill: DetailBillEntity;
}
