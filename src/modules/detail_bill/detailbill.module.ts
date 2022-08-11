import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DetailBillController } from './controllers/detailbill.controller';
import { DetailBillEntity } from './entities/detailbill.entity';
import { DetailBillService } from './services/detailbill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailBillEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [DetailBillService],
  controllers: [DetailBillController],
  exports: [DetailBillService],
})
export class DetailBillModule {}
