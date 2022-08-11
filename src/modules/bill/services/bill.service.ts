import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { GetBillDetailDto } from 'src/modules/detail_bill/dtos/detail_bill.dto';
import { DetailBillEntity } from 'src/modules/detail_bill/entities/detailbill.entity';
import { AddDetailBillPayload } from 'src/modules/detail_bill/payloads/adddetailbill.payload';
import { WareHouseService } from 'src/modules/warehouse/services/warehouse.service';
import { Repository } from 'typeorm';
import { GetBillDto } from '../dtos/getBill.dto';

import { BillEntity } from '../entities/bill.entity';
import { AddBillPayload } from '../payloads/addbill.payload';
import { Addbillandetail } from '../payloads/addbillandetail.payload';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(BillEntity)
    private BillRepository: Repository<BillEntity>,
    @InjectRepository(DetailBillEntity)
    private DetailBillRepository: Repository<DetailBillEntity>,
    private warehouseService: WareHouseService,
  ) {}
  async addBill(user: AccountEntity, payload: Addbillandetail) {
    const new_bill = new BillEntity();
    Object.assign(new_bill, payload.payloadbill);
    new_bill.user = user;
    const create_bill = await this.BillRepository.save(new_bill);
    if (create_bill) {
      for (let i = 0; i < payload.payloadDetailbill.length; i++) {
        const warehouse = await this.warehouseService.getdetailwarehouse(
          payload.payloadDetailbill[i].warehouse,
        );
        if (warehouse) {
          const new_detailbill = new DetailBillEntity();
          new_detailbill.warehouse = warehouse;
          new_detailbill.bill = create_bill;
          new_detailbill.amount = payload.payloadDetailbill[i].amount;
          new_detailbill.price = payload.payloadDetailbill[i].price;
          await this.DetailBillRepository.save(new_detailbill);
        } else {
          await this.BillRepository.remove(new_bill);
          throw new HttpException('Lỗi Giỏ hàng', 400);
        }
      }
      return new GetBillDto(create_bill);
    }
    throw new HttpException('Đơn hàng bị lỗi', 400);
  }
  async getBillByUser(id: number) {
    const bill = await this.BillRepository.find({
      where: {
        id_user: id,
      },
      order: {
        id: 'DESC',
      },
    });
    return bill.map((item) => new GetBillDto(item));
  }
  async getDetailBill(id: number, id_user: number) {
    const detail_bill = await this.BillRepository.createQueryBuilder('bill')
      .leftJoinAndSelect('bill.user', 'user')
      .leftJoinAndSelect('bill.detailBill', 'detailbill')
      .leftJoinAndSelect('detailbill.warehouse', 'warehouse')
      .leftJoinAndSelect('warehouse.color', 'color')
      .leftJoinAndSelect('warehouse.size', 'size')
      .leftJoinAndSelect('warehouse.product', 'product')
      .leftJoinAndSelect('product.image', 'image')
      .where('user.id =:id_user and bill.id = :id_bill', {
        id_user,
        id_bill: id,
      })
      .getOne();
    return detail_bill.detailBill.map((item) => new GetBillDetailDto(item));
  }
}
