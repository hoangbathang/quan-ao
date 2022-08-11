import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('size')
export class SizeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => WareHouseEntity, (warehouse) => warehouse.size)
  warehouse: WareHouseEntity[];
}
