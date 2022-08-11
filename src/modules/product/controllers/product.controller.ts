import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from '../services/product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}
  @Get('/:id')
  async GetDetailProduct(@Param('id') id: number) {
    return await this.ProductService.getDetailProduct(id);
  }
  @Get('/search/:value')
  async SearchProduct(@Param('value') value: string) {
    return await this.ProductService.searchProduct(value);
  }
}
