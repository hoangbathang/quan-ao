import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntiy } from 'src/modules/category/entities/category.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ListProductDto } from '../dtos/product.dto';
import { ProductEntity } from '../entities/product.entity';
import { GetProductbyCategoryandMenuPayload } from '../payloads/ListProduct.payload';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
  ) {}
  async getAllByIdCategory(param: GetProductbyCategoryandMenuPayload) {
    const products = await this.ProductRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('category.menu', 'menu')
      // .orderBy({ 'product.creat_at': 'DESC' })
      .where('category.id = :idcategory and menu.url = :url', {
        idcategory: param.id_category,
        url: param.url,
      })
      .getMany();
    return products.map((product) => new ListProductDto(product));
  }
  async getAllProductByMenu(url: string) {
    const products = await this.ProductRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('category.menu', 'menu')
      .where('menu.url = :url', {
        url,
      })
      .getMany();
    return products.map((product) => new ListProductDto(product));
  }
  async getDetailProduct(id: number) {
    const product = await this.ProductRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('category.menu', 'menu')
      .where('warehouse.amount > 0 and product.id = :id', {
        id,
      })
      .getOne();
    if (!product) {
      throw new HttpException('Không tìm thấy thông tin sản phẩm', 400);
    }
    return new ListProductDto(product);
  }
  async getHomeProduct() {
    const products_new = await this.ProductRepository.createQueryBuilder(
      'product',
    )
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('category.menu', 'menu')
      // .orderBy({ 'product.creat_at': 'DESC' })
      .where('warehouse.amount > 0')
      .orderBy({ 'product.id': 'DESC' })
      .take(8)
      .skip(0)
      .getMany();
    const toppick_product = await this.ProductRepository.createQueryBuilder(
      'product',
    )
      .leftJoin('product.warehouse', 'warehouse')
      .leftJoin('product.category', 'category')
      .leftJoin('warehouse.size', 'size')
      .leftJoin('warehouse.color', 'color')
      .leftJoin('product.image', 'image')
      .leftJoin('category.menu', 'menu')
      .leftJoin('warehouse.detailbill', 'detailbill')
      .select(
        'warehouse.id_product, warehouse.id_color, warehouse.id_size, SUM(detailbill.amount), menu.name as name_menu,product.name,product.price,color.url as color_url, image.url as img_url, size.name as name_size ',
      )
      .groupBy(
        'warehouse.id_product, warehouse.id_color, warehouse.id_size, category.name,product.name,product.price,color.url, image.url ',
      )
      .having('SUM(detailbill.amount) > 0')
      .orderBy('SUM(detailbill.amount)', 'DESC')
      .limit(8)
      .getRawMany();
    return {
      products_new: products_new.map((product) => new ListProductDto(product)),
      toppick_product,
    };
  }
  async searchProduct(value: string) {
    const products = await this.ProductRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('category.menu', 'menu')
      .where('product.name like :name', {
        name: `%${value}%`,
      })
      .getMany();
    return products.map((product) => new ListProductDto(product));
  }
}
