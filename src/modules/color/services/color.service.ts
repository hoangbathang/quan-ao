import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ColorEntity } from '../entitis/color.entity';
import { AddColorPayload } from '../payloads/addColor.payload';
import { AddColorProductPayload } from '../payloads/addColorProduct.payload';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
    @InjectRepository(ColorEntity)
    private ColorRepository: Repository<ColorEntity>,
  ) {}
  async addColor(body: AddColorPayload, url: string) {
    const newColor = new ColorEntity();
    newColor.name = body.name;
    newColor.url = url;
    return await this.ColorRepository.save(newColor);
  }
}
