import { BillEntity } from 'src/modules/bill/entities/bill.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypes } from '../account.contant';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  address: string;
  @Column({
    nullable: true,
    type: 'enum',
    enum: UserTypes,
    enumName: 'typeEnum',
    default: UserTypes.user,
  })
  type?: UserTypes;
  @OneToMany(() => BillEntity, (bill) => bill.user)
  bill: BillEntity[];
}
