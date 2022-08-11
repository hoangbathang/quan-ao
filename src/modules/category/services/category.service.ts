import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/modules/menu/entities/menu.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../dtos/category.dto';
import { CategoryEntiy } from '../entities/category.entity';
import { GetCategorybyMenuPayload } from '../payloads/listcategory.payload';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntiy)
    private CategoryRepository: Repository<CategoryEntiy>,
    @InjectRepository(MenuEntity)
    private MenuRepository: Repository<MenuEntity>,
  ) {}
  async getAllByMenu(url: string) {
    const categorys = await this.CategoryRepository.createQueryBuilder(
      'category',
    )
      .leftJoinAndSelect('category.menu', 'menu')
      .where('menu.url = :url', { url })
      .getMany();
    return categorys.map((item) => new CategoryDto(item));
  }
}
