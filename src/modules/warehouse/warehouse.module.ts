import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntiy } from '../category/entities/category.entity';
import { ColorEntity } from '../color/entitis/color.entity';
import { MenuEntity } from '../menu/entities/menu.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { SizeEntity } from '../size/entities/size.entity';
import { WareHouseController } from './controllers/warehouse.controller';
import { WareHouseEntity } from './entities/warehouse.entity';
import { WareHouseService } from './services/warehouse.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WareHouseEntity,
      ProductEntity,
      ColorEntity,
      SizeEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [WareHouseService],
  controllers: [WareHouseController],
  exports: [WareHouseService],
})
export class WareHouseModule {}
