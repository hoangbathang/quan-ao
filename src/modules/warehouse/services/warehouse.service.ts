import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from 'src/modules/color/entitis/color.entity';
import { messageReponse } from 'src/modules/messageReponse/Message';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { SizeEntity } from 'src/modules/size/entities/size.entity';
import { Repository } from 'typeorm';
import { WareHouseEntity } from '../entities/warehouse.entity';
import { AddWareHousePayload } from '../payloads/addwarehouse.payload';
import { GetDetailWarehousePayload } from '../payloads/getDetailwarehouse.payload';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectRepository(WareHouseEntity)
    private WareHouseRepository: Repository<WareHouseEntity>,
    @InjectRepository(ProductEntity)
    private ProductRepository: Repository<ProductEntity>,
    @InjectRepository(ColorEntity)
    private ColorRepository: Repository<ColorEntity>,
    @InjectRepository(SizeEntity)
    private SizeRepository: Repository<SizeEntity>,
  ) {}
  async getdetailwarehouse(payload: GetDetailWarehousePayload) {
    const size = await this.WareHouseRepository.createQueryBuilder('warehouse')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('warehouse.product', 'product')
      .where(
        'size.id= :id_size and color.id= :id_color and product.id = :product_id',
        {
          id_size: payload.id_size,
          id_color: payload.id_color,
          product_id: payload.id_product,
        },
      )
      .getOne();
    return size;
  }
  async addWareHouse(payload: AddWareHousePayload) {
    const product = await this.ProductRepository.createQueryBuilder('product')
      .where('id= :id_product', {
        id_product: payload.id_product,
      })
      .getOne();
    if (!product) {
      return messageReponse('Không tồn tại thông tin sản phẩm');
    }
    const color = await this.ColorRepository.createQueryBuilder('color')
      .where('id= :id_color', {
        id_color: payload.id_color,
      })
      .getOne();
    if (!color) {
      return messageReponse('Không tồn tại thông tin màu sắc');
    }
    const size = await this.SizeRepository.createQueryBuilder('size')
      .where('id= :id_size', {
        id_size: payload.id_size,
      })
      .getOne();
    if (!size) {
      return messageReponse('Không tồn tại thông tin kích thước');
    }
    const newarehouse = new WareHouseEntity();
    Object.assign(newarehouse, {
      product,
      color,
      size,
      amount: payload.amount,
    });
    await this.WareHouseRepository.save(newarehouse);
    return messageReponse('Thêm thông tin kho hàng thành công');
  }
}
