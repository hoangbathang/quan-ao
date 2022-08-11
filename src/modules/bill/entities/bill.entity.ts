import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { DetailBillEntity } from 'src/modules/detail_bill/entities/detailbill.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusTypes } from '../bill.contants';

@Entity('bill')
export class BillEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  total: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  phone: string;
  @Column()
  address: string;
  @OneToMany(() => DetailBillEntity, (detailBill) => detailBill.bill)
  detailBill: DetailBillEntity[];
  @Column({ nullable: true })
  id_user: number;
  @ManyToOne(() => AccountEntity, (account) => account.bill)
  @JoinColumn({ name: 'id_user' })
  user: AccountEntity;
  @Column({
    nullable: true,
    type: 'enum',
    enum: StatusTypes,
    enumName: 'typeEnum',
    default: StatusTypes.processing,
  })
  status?: StatusTypes;
}
