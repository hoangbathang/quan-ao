import { CategoryEntiy } from 'src/modules/category/entities/category.entity';
import { ImageEntity } from 'src/modules/image/entitis/image.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;
  @Column({ type: 'int', nullable: true })
  category_id?: number;
  @ManyToOne(() => CategoryEntiy, (category) => category.product)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntiy;
  @Column({ nullable: true })
  create_at?: string;
  @OneToMany(() => ImageEntity, (img) => img.product)
  image: ImageEntity[];
  @OneToMany(() => WareHouseEntity, (warehouse) => warehouse.product)
  warehouse: WareHouseEntity[];
  @BeforeInsert()
  async beforeInsert() {
    const date = new Date();
    this.create_at = date.toISOString().substring(0, 10);
  }
}
