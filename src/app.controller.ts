import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './modules/product/services/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private ProductService: ProductService,
  ) {}

  @Get()
  async getHello() {
    return await this.ProductService.getHomeProduct();
  }
}
