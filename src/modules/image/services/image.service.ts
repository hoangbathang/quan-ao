import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { Repository } from 'typeorm';
import { ImageEntity } from '../entitis/image.entity';
import { AddImagePayload } from '../payloads/addimage.payload';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
    @InjectRepository(ImageEntity)
    private ImageRepository: Repository<ImageEntity>,
  ) {}
  async addImage(id_product: number, url: string[]) {
    const product = await this.ProductRepository.createQueryBuilder('product')
      .where('id= :id_product', {
        id_product: id_product,
      })
      .getOne();
    if (product) {
      for (let i = 0; i < url.length; i++) {
        const newImage = new ImageEntity();
        Object.assign(newImage, { url: url[i], product: product });
        await this.ImageRepository.save(newImage);
      }
      return {
        massage: 'Thêm hình ảnh thành công',
      };
    }
    return {
      massage: 'Không tìm thấy thông tin sản phẩm',
    };
  }
}
