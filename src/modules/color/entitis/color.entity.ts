import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('color')
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  url: string;
  @Column({ nullable: true })
  name: string;
  @OneToMany(() => WareHouseEntity, (warehouse) => warehouse.color)
  warehouse: WareHouseEntity[];
}
