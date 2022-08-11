import { ProductEntity } from 'src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  url: string;
  @Column({ type: 'number', nullable: true })
  id_product?: number;
  @ManyToOne(() => ProductEntity, (product) => product.image)
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;
}
