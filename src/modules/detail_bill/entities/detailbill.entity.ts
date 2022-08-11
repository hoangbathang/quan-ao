import { BillEntity } from 'src/modules/bill/entities/bill.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detail_bill')
export class DetailBillEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;
  @Column({ nullable: true })
  id_bill: number;
  @Column({ nullable: true })
  id_warehouse: number;
  @ManyToOne(() => BillEntity, (bill) => bill.detailBill)
  @JoinColumn({ name: 'id_bill' })
  bill: BillEntity;
  @ManyToOne(() => WareHouseEntity, (warehouse) => warehouse.detailbill)
  @JoinColumn({ name: 'id_warehouse' })
  warehouse: WareHouseEntity;
}
