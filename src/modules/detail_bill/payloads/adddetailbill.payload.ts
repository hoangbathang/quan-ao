import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BillEntity } from 'src/modules/bill/entities/bill.entity';
import { WareHouseEntity } from 'src/modules/warehouse/entities/warehouse.entity';
import { GetDetailWarehousePayload } from 'src/modules/warehouse/payloads/getDetailwarehouse.payload';

export class AddDetailBillPayload {
  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  amount: number;
  @ApiProperty({ type: 'number', required: false })
  @IsNotEmpty()
  price: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  warehouse: GetDetailWarehousePayload;
}
