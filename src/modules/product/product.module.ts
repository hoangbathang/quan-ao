import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntiy } from '../category/entities/category.entity';
import { ColorEntity } from '../color/entitis/color.entity';
import { SizeEntity } from '../size/entities/size.entity';
import { WareHouseEntity } from '../warehouse/entities/warehouse.entity';
import { ProductController } from './controllers/product.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
