import { CategoryEntiy } from 'src/modules/category/entities/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column({ unique: true })
  url: string;
  @OneToMany(() => CategoryEntiy, (category) => category.menu)
  categorys: CategoryEntiy[];
}
