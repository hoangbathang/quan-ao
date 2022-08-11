import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../menu/entities/menu.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { ProductService } from '../product/services/product.service';
import { WareHouseEntity } from '../warehouse/entities/warehouse.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryEntiy } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntiy, MenuEntity, ProductEntity]),
  ],
  providers: [CategoryService, ProductService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
