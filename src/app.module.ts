import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configurations } from './config/common';
import { typeormConfig } from './config/database';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { BillModule } from './modules/bill/bill.module';
import { CategoryModule } from './modules/category/category.module';
import { ColorModule } from './modules/color/color.module';
import { DetailBillModule } from './modules/detail_bill/detailbill.module';
import { ImageModule } from './modules/image/image.module';
import { MenuModule } from './modules/menu/menu.module';
import { ProductModule } from './modules/product/product.module';
import { SizeModule } from './modules/size/size.module';
import { WareHouseModule } from './modules/warehouse/warehouse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => configurations.toObject()],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmConfig()),
    AccountModule,
    AuthModule,
    MenuModule,
    CategoryModule,
    ProductModule,
    ColorModule,
    ImageModule,
    SizeModule,
    WareHouseModule,
    DetailBillModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
