import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetProductbyCategoryandMenuPayload } from 'src/modules/product/payloads/ListProduct.payload';
import { ProductService } from 'src/modules/product/services/product.service';
import { GetCategorybyMenuPayload } from '../payloads/listcategory.payload';
import { CategoryService } from '../services/category.service';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}
  @Get(':url')
  async getAllByMenu(@Param() pram: GetCategorybyMenuPayload) {
    const menu = await this.categoryService.getAllByMenu(pram.url);
    const product = await this.productService.getAllProductByMenu(pram.url);
    return {
      menu,
      product,
    };
  }
  @Get(':url/:id_category')
  async GetProductByCategory(
    @Param() pram: GetProductbyCategoryandMenuPayload,
  ) {
    const menu = await this.categoryService.getAllByMenu(pram.url);
    const product = await this.productService.getAllByIdCategory(pram);
    return {
      menu,
      product,
    };
  }
}
