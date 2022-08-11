import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailBillEntity } from '../entities/detailbill.entity';
import { AddDetailBillPayload } from '../payloads/adddetailbill.payload';

@Injectable()
export class DetailBillService {
  constructor(
    @InjectRepository(DetailBillEntity)
    private DetailBillRepository: Repository<DetailBillEntity>,
  ) {}
}
