import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DetailBillService } from '../services/detailbill.service';

@Controller('detailbill')
@ApiTags('DetailBill')
export class DetailBillController {
  constructor(private detailBillService: DetailBillService) {}
}
