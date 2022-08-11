import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ColorEntity } from '../color/entitis/color.entity';
import { DetailBillEntity } from '../detail_bill/entities/detailbill.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { SizeEntity } from '../size/entities/size.entity';
import { WareHouseEntity } from '../warehouse/entities/warehouse.entity';
import { WareHouseService } from '../warehouse/services/warehouse.service';
import { BillController } from './controllers/bill.controller';
import { BillEntity } from './entities/bill.entity';
import { BillService } from './services/bill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BillEntity,
      DetailBillEntity,
      WareHouseEntity,
      ProductEntity,
      ColorEntity,
      SizeEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [BillService, WareHouseService],
  controllers: [BillController],
  exports: [BillService],
})
export class BillModule {}
